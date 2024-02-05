import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Button,
  message,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Checkbox,
  Modal,
  Tooltip,
  ConfigProvider,
} from 'poizon-design';
import zhCN from 'poizon-design/lib/locale/zh_CN';
import moment, { Moment } from 'moment';
import { useNavigate } from '@umijs/max';
import _ from 'lodash';
import { useRequest } from 'ahooks';
import fetchIeaSaveService from '@/services/fetchIeaSave/fetchIeaSave';
import fetchIeaAuditService from '@/services/fetchIeaAudit/fetchIeaAudit';
import fetchIeaDetailService from '@/services/fetchIeaDetail/fetchIeaDetail';
import { getCategoryList } from '@/pages/leadManagement/publicSea/api';
import { IeaSaveReq } from '@/entities/fetchIeaSave/interface/fetchIeaSave';
import { getRuntimeEnv } from '@/defaultSettings';
import fetchServiceProviderPageService from '@/services/serviceProvider/queryServiceProviderList';
import queryUserPermissionDataList from '@/services/serviceProvider/queryUserPermissionDataList';
import queryAllCategoryById from '@/services/serviceProvider/queryAllCategoryById';
import { StatusEnum } from '@/pages/serviceProvider/userList/constants';
import {
  needFill_options,
  NEEDFILL_TYPE,
  cateLevel_options,
  qualification_options,
  Discount_Type,
  StautsType,
} from '../enum';
import { getParamData, getDetailData } from './formatData';
import styles from './index.module.less';

const { RangePicker } = DatePicker;
interface Props {
  isReadOnly?: boolean;
  isEdit?: boolean;
}
const testHost = ['t1', 'dev'];
const isPre =
  getRuntimeEnv() === 'pre'
    ? 'https://pre-m.dewu.com/h5-deal/merchants-invitation'
    : 'https://m.dewu.com/h5-deal/merchants-invitation';
const host = testHost.includes(getRuntimeEnv())
  ? 'https://t1-m.dewu.net/h5-deal/merchants-invitation'
  : isPre;
const initialValue = [
  NEEDFILL_TYPE.公司名称,
  NEEDFILL_TYPE.主营品牌,
  NEEDFILL_TYPE.主营类目,
  NEEDFILL_TYPE.联系人,
  NEEDFILL_TYPE.联系电话,
  NEEDFILL_TYPE.品牌资质类型,
];
const isCanEditPage = [
  StautsType.WAIT_ADUIT,
  StautsType.WAIT_START,
  StautsType.RUNNING,
  StautsType.WAIT_START,
];
const helpStr = '该字段将展示在商家后台-招商会页面，请谨慎填写';
const holdStr = '举办时间不填写则当前活动不展示在商家后台-招商会页面，请谨慎填写';

export default function index({ isReadOnly = false, isEdit = false }: Props) {
  const searchParams = window.location.search;
  const queryParams = new URLSearchParams(searchParams);
  const activityId = Number(queryParams.get('id'));
  const [submitID, setSubmitID] = useState<undefined | number>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<IeaSaveReq>({});
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [invitationCodeTimeDisable, setIsinvitationCodeTimeDisable] = useState<boolean>(true);
  const [checkValue, setCheckValue] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [encodedId, setEncodedId] = useState('');
  const [personCategoryOptions, setPersonCategoryOptions] = useState([]); // 个人类目列表
  const [categoryOptions, setCategoryOptions] = useState([]); // 类目列表
  // 关联服务商 OPTIONS
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  // 服务商跟进用户OPTIONS
  const [userPermissionData, setUserPermissionData] = useState([]);

  const { run: queryAllCategoryByIdFn } = useRequest((p) => queryAllCategoryById(p), {
    manual: true,
    onSuccess: (res) => {
      setPersonCategoryOptions(res.data || []);
    },
  });

  const getData = async () => {
    const res = await form.validateFields();
    const isNoError = _.isEmpty(form.getFieldError('meetingTime'));
    if (res && isNoError) {
      return getParamData(res, checkValue);
    }
    return null;
  };

  const getCategoryListData = async () => {
    const res = await getCategoryList({
      pid: 0,
      queryType: 0,
      treeFlag: true,
      spuCountFlag: false,
    });
    if (res?.length) {
      setCategoryOptions(res);
    }
  };

  useEffect(() => {
    getCategoryListData();
  }, []);

  const validateTime = (value: Moment[]) => {
    const [startTime, endTime] = value;
    let errstr = '';
    if (moment().isAfter(startTime) || moment(endTime).diff(startTime, 'days') >= 100) {
      errstr = '活动开始时间大于当前时间，且活动时间间隔为100天之内';
    }
    form.setFields([
      {
        name: 'activityTime',
        value,
        errors: [errstr],
      },
    ]);
    return !errstr;
  };

  const handleChange = (value: Moment[]) => {
    const [startTime, endTime] = value;
    const isValideteSwitch = validateTime(value);
    if (isValideteSwitch) {
      setIsinvitationCodeTimeDisable(false);
      form.setFieldsValue({
        activityTime: value,
        invitationCodeTime: [startTime, undefined],
      });
    }
    const holdTime = form.getFieldValue('meetingTime');
    if (holdTime) {
      handleHoldTimeChange(holdTime);
    }
  };

  const onSave = async () => {
    const data = await handleSave();
    if (!data) {
      return;
    }
    setLoading(true);
    const res = await fetchIeaAuditService({
      activityId: data | submitID,
    });
    setLoading(false);
    if (res.success) {
      message.success('创建成功');
      handleBack();
    }
  };

  const handleSave = async () => {
    const data = await getData();
    if (!data) {
      return;
    }
    let params: IeaSaveReq = {
      ...data,
    };
    // 编辑
    if (activityId && isEdit) {
      params = {
        ...editInfo,
        ...params,
        id: activityId,
        discountPoundageInfo: {
          ...params.discountPoundageInfo,
          id: _.get(editInfo, 'discountPoundageInfo.id', null),
          activityId,
        },
      };
    }
    // 新建的时候再次保存的场景
    if (!isReadOnly && !isEdit && submitID) {
      params.id = submitID;
    }

    const res = await fetchIeaSaveService(params);
    if (res.success) {
      setSubmitID(res.data);
      message.success('保存成功');
      return res.data;
    }
    return null;
  };

  const handleBack = () => {
    navigate(
      {
        pathname: '/settleIn/investmentAttraction',
      },
      { replace: true },
    );
  };

  const getDetail = async () => {
    const res = await fetchIeaDetailService({
      activityId,
    });
    if (res.success) {
      const formObj = getDetailData(res);
      const { spId, spName, spUserId, spUserName } = formObj;
      if (spId) {
        setCompanyNameOptions([{ label: spName, value: spId }]);
      }
      if (spUserId) {
        setUserPermissionData([{ label: spUserName, value: spUserId }]);
        // 获取到服务商用户对应的类目列表
        queryAllCategoryByIdFn({ userId: spUserId });
      }
      setCheckValue(!!formObj.discount);
      if (isReadOnly) {
        setSubmitID(res.data.id);
        setEncodedId(res.data.encodedId);
      }
      setEditInfo(res.data);
      setIsinvitationCodeTimeDisable(false);
      form.setFieldsValue(formObj);
    }
  };

  useEffect(() => {
    if (activityId) {
      getDetail();
    }
  }, [activityId]);

  const disabledDate = (current: Moment) => {
    const activityTime = form.getFieldValue('activityTime');
    const [startTime, endTime] = activityTime;
    return current < moment(endTime).subtract(1, 'days');
  };

  const handlePreview = async () => {
    const res = await fetchIeaDetailService({
      activityId: submitID,
    });
    if (res.success) {
      setEncodedId(res.data.encodedId);
      setPreviewVisible(true);
    }
  };

  const isCanEditPageSwitch = useMemo(() => {
    return isCanEditPage.includes(editInfo.status) || isReadOnly;
  }, [editInfo, isReadOnly]);

  const handleCheck = (e) => {
    setCheckValue(e.target.checked);
    form.setFieldsValue({
      discount: undefined,
      cateLevel: undefined,
      qualification: [],
    });
  };

  const handleHoldTimeChange = (value: Moment[]) => {
    const activityTime = form.getFieldValue('activityTime');
    if (value && activityTime) {
      const [activityStartTime, activityEndTime] = activityTime;
      const [startTime, endTime] = value;
      const isHoldTimeValid =
        !(
          moment(moment(startTime).startOf('minute')).isBetween(
            activityStartTime,
            activityEndTime,
          ) &&
          moment(moment(endTime).startOf('minute')).isBetween(activityStartTime, activityEndTime)
        ) && !isCanEditPageSwitch;
      form.setFields([
        {
          name: 'meetingTime',
          value,
          errors: isHoldTimeValid ? ['举办时间应在活动时间内'] : [],
        },
      ]);
    } else {
      form.setFields([
        {
          name: 'meetingTime',
          value,
          errors: [],
        },
      ]);
    }
  };

  const { run: fetchServiceProvider } = useRequest((p) => fetchServiceProviderPageService(p), {
    manual: true,
    onSuccess: (res) => {
      setCompanyNameOptions(res.data || []);
    },
  });

  const { run: queryUserPermissionData } = useRequest((p) => queryUserPermissionDataList(p), {
    debounceWait: 300,
    manual: true,
    onSuccess: (res) => {
      setUserPermissionData(res.data || []);
    },
  });

  return (
    <div className={styles.formContainer}>
      <ConfigProvider locale={zhCN}>
        <Form
          layout="horizontal"
          form={form}
          labelCol={{
            span: 4,
          }}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="活动名称"
            rules={[{ required: true, message: '请输入活动名称' }]}
            extra={helpStr}
          >
            <Input
              placeholder="请输入活动名称"
              showCount
              maxLength={50}
              disabled={isCanEditPageSwitch}
            />
          </Form.Item>
          <Form.Item
            name="activityTime"
            label="活动时间段"
            rules={[
              { required: true, message: '请输入活动时间' },
              {
                required: true,
                validator: (rule, value, callback) => {
                  const [startTime, endTime] = value;
                  // 只可以编辑邀约页面配置时不需要时间校验
                  if (
                    (moment().isAfter(startTime) ||
                      moment(endTime).diff(startTime, 'days') >= 100) &&
                    !isCanEditPageSwitch
                  ) {
                    callback('活动开始时间大于当前时间，且活动时间间隔为100天之内');
                  }
                  callback();
                },
                message: '活动开始时间大于当前时间，且活动时间间隔为100天之内',
              },
            ]}
          >
            <RangePicker
              format={'YYYY-MM-DD HH:mm:ss'}
              showTime
              disabled={isCanEditPageSwitch}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            name="estimateUserCount"
            label="预估参与人数"
            rules={[{ required: true, message: '请输入预估参与人数' }]}
          >
            <Input showCount maxLength={20} disabled={isCanEditPageSwitch} />
          </Form.Item>
          <Form.Item name="meetingTime" label="举办时间" extra={holdStr}>
            <RangePicker
              format={'YYYY-MM-DD HH:mm'}
              showTime
              disabled={isCanEditPageSwitch}
              onChange={handleHoldTimeChange}
            />
          </Form.Item>
          <Form.Item name="meetingAddress" label="举办地点" extra={holdStr}>
            <Input
              placeholder="请输入举办地点"
              showCount
              maxLength={50}
              disabled={isCanEditPageSwitch}
            />
          </Form.Item>
          <Form.Item name="spId" label="关联服务商">
            <Select
              disabled={isCanEditPageSwitch}
              options={companyNameOptions}
              showSearch
              optionFilterProp="label"
              allowClear
              onChange={(e) => {
                setUserPermissionData([]);
                form.setFieldsValue({
                  spUserId: undefined,
                  mainCateIds: undefined,
                });
              }}
              onSearch={(value) => {
                if (!value) return;
                fetchServiceProvider({
                  spName: value,
                  spStatus: StatusEnum.启用,
                  page: 1,
                  pageSize: 100,
                });
              }}
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => {
              if (form.getFieldValue('spId')) {
                return (
                  <Form.Item
                    name="spUserId"
                    label="服务商跟进用户"
                    key={form.getFieldValue('spId')}
                    rules={[{ required: true, message: '请选择服务商跟进用户' }]}
                  >
                    <Select
                      disabled={isCanEditPageSwitch}
                      options={userPermissionData}
                      showSearch
                      allowClear
                      optionFilterProp="label"
                      onChange={(e, record) => {
                        if (e) {
                          setPersonCategoryOptions(record?.categoryList || []);
                        }
                        form.setFieldsValue({
                          mainCateIds: undefined,
                        });
                      }}
                      onSearch={(value) => {
                        if (!value) return;
                        queryUserPermissionData({
                          userName: value,
                          status: StatusEnum.启用,
                          spId: form.getFieldValue('spId'),
                          page: 1,
                          pageSize: 100,
                        });
                      }}
                    />
                  </Form.Item>
                );
              }
            }}
          </Form.Item>

          <Form.Item name="desc" label="活动描述">
            <Input.TextArea showCount maxLength={300} disabled={isCanEditPageSwitch} />
          </Form.Item>
          <Form.Item label="入驻优惠政策">
            <Form.Item
              label={
                <div>
                  <Checkbox
                    disabled={isCanEditPageSwitch}
                    checked={checkValue}
                    onChange={(e) => {
                      handleCheck(e);
                    }}
                  />
                </div>
              }
              colon={false}
            >
              {checkValue && (
                <>
                  <Form.Item
                    name="discount"
                    label="新商费率折扣"
                    rules={[{ required: true, message: '请填写新商费率折扣' }]}
                  >
                    <InputNumber
                      disabled={isCanEditPageSwitch}
                      addonAfter="折"
                      precision={1}
                      min={0.1}
                      max={9.9}
                      controls={false}
                    />
                  </Form.Item>
                  <Form.Item
                    name="cateLevel"
                    label="类目维度"
                    rules={[{ required: true, message: '请选择类目维度' }]}
                  >
                    <Select disabled={isCanEditPageSwitch} options={cateLevel_options} />
                  </Form.Item>
                  <Form.Item
                    name="qualification"
                    label="资质类型要求"
                    rules={[{ required: true, message: '请选择资质类型要求' }]}
                  >
                    <Select
                      disabled={isCanEditPageSwitch}
                      options={qualification_options}
                      mode="multiple"
                    />
                  </Form.Item>
                </>
              )}
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="invitationCodeTime"
            label="邀请码生效时间段"
            rules={[
              { required: true, message: '请输入邀请码生效时间' },
              {
                required: true,
                validator: (rule, value, callback) => {
                  const activityTime = form.getFieldValue('activityTime');
                  const [activityStartTime, activityEndTime] = activityTime;
                  const [startTime, endTime] = value;
                  if (
                    (moment(endTime).diff(startTime, 'days') >= 365 ||
                      moment(endTime).diff(activityEndTime, 'seconds') <= 0) &&
                    !isCanEditPageSwitch
                  ) {
                    callback('邀请码生效时间间隔为365天之内, 且大于活动结束时间');
                  }
                  callback();
                },
                message: '邀请码生效时间间隔为365天之内, 且大于活动结束时间',
              },
            ]}
          >
            <RangePicker
              disabledDate={disabledDate}
              format={'YYYY-MM-DD HH:mm:ss'}
              showTime
              disabled={isCanEditPageSwitch ? [true, true] : [true, !!invitationCodeTimeDisable]}
            />
          </Form.Item>

          <Form.Item label="招商邀约页面配置"></Form.Item>
          <Form.Item
            name="title"
            label="页面标题"
            rules={[{ required: true, message: '请输入页面标题' }]}
          >
            <Input showCount maxLength={50} disabled={isReadOnly} />
          </Form.Item>
          <Form.Item
            name="needFill"
            label="商家需填写内容"
            rules={[{ required: true, message: '请选择商家需填写内容' }]}
            initialValue={initialValue}
          >
            <Select options={needFill_options} mode="multiple" disabled={isReadOnly} />
          </Form.Item>

          <Form.Item shouldUpdate noStyle>
            {() => {
              return (
                <Form.Item
                  name="mainCateIds"
                  label="商家可选类目（招商类目）"
                  rules={[{ required: true, message: '请选择招商类目' }]}
                  extra={helpStr}
                >
                  <Select
                    showSearch
                    optionFilterProp="name"
                    disabled={isReadOnly}
                    mode="multiple"
                    options={
                      form.getFieldValue('spUserId') ? personCategoryOptions : categoryOptions
                    }
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item
            name="explain"
            label="招商说明"
            rules={[{ required: true, message: '请填写招商说明' }]}
            extra={helpStr}
          >
            <Input.TextArea showCount maxLength={300} disabled={isReadOnly} />
          </Form.Item>
        </Form>
      </ConfigProvider>
      <div className={styles.bottomBtn}>
        <Button onClick={handleSave} disabled={isReadOnly}>
          保存活动
        </Button>
        <Tooltip title={!submitID ? '请先保存活动' : null}>
          <Button
            type="primary"
            disabled={!isReadOnly && !submitID}
            style={{ marginLeft: 16 }}
            onClick={handlePreview}
          >
            预览邀约页面
          </Button>
        </Tooltip>
        <Button
          type="primary"
          style={{ margin: '0 16px' }}
          loading={loading}
          onClick={onSave}
          disabled={isCanEditPageSwitch}
        >
          提交审核
        </Button>
        <Button onClick={handleBack}>返回列表</Button>
      </div>
      {previewVisible && (
        <Modal
          title="招商活动邀约预览"
          visible={previewVisible}
          footer={false}
          onCancel={() => {
            setPreviewVisible(false);
          }}
        >
          <div style={{ height: 500 }}>
            <iframe
              width={'100%'}
              height={'100%'}
              src={`${host}?encodedId=${encodedId}&isPreview`}
              frameBorder="0"
            ></iframe>
          </div>
        </Modal>
      )}
    </div>
  );
}
