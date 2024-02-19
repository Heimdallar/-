import React, { useEffect, useState } from 'react'
import { Modal, Alert, Form, Input, Select, InputNumber, message } from 'poizon-design'
import useFormItems from './useFormItem'
import fetchIeaObtainIeaPageInfoService from '@/services/attractinvestment/obtainIeaPageInfo'
import { Data } from '@/entities/attractinvestment/interface/obtainIeaPageInfo'
import { Datum } from '@/entities/attractinvestment/interface/fetch-hot-brand'
import { Datum as CategoryDatum } from '@/entities/attractinvestment/interface/fetch-category-list'
import { IeaSubmitReq } from '@/entities/attractinvestment/interface/fetchSubmit'
import fetchSubmit from '@/services/attractinvestment/fetchSubmit'
import InvitationCodeDialog from './invitationCodeDialog/index'
import { SubmitFromType } from './constants'
import BrandIdSelect from './brandIdSelect'
import styles from './index.module.less'
import duTrack from "@du/track";
import _ from 'lodash'
import fetchPlanRiskCheckService from '@/services/attractinvestmentPc/riskCheck';
import fetchPlanObtainRiskCheckResultService from '@/services/attractinvestmentPc/obtainRiskCheckResult';


interface Props {
  encodedId: string;
  isHovered: boolean;
}

export default function index({ encodedId, isHovered }: Props) {
  const [visible, setVisible] = useState(false);
  const [infoData, setInfoData] = useState<Data>({});
  const [categoryArr, setCategoryArr] = useState([]);
  const [brandArr, setBrandArr] = useState<Datum[]>([]);
  const [btnLoading, setLoading] = useState(false)
  const [form] = Form.useForm();
  const formItems = useFormItems({ infoData, form, setCategoryArr });
  const isHaveTiktokFansNum = infoData?.needFill?.includes(12)
  const [invitationCodeData, setInvitationCodeData] = useState({
    invitationCode: '',
    invitationCodeStartTime: null,
    invitationCodeEndTime: null,
  });
  const [invitationCodeVisible, setInvitationCodeVisible] = useState(false);

  const getDetail = async () => {
    const res = await fetchIeaObtainIeaPageInfoService({
      encodedId,
    });
    if (res.success) {
      setInfoData(res.data);
      setVisible(true);
    }
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const {
      brandId = null,
      mainCategoryId = null,
      storeChannel = null,
      storeName = null,
      storeUrl = null,
      annualSales = null,
      tiktokFansNum = null,
      xiaohongshuPostsNum = null,
      ...rest
    } = values;
    const internetSaleInfoReqs = [
      {
        storeChannel,
        storeName,
        storeUrl,
        annualSales,
      },
    ];
    const brandIdNumber = brandArr.find((item) => {
      return item.value === brandId;
    })?.id;
    const finalParam = {
      internetSaleInfoReqs,
      tiktokFansNum,
      xiaohongshuPostsNum,
      ieaEncodedId: encodedId,
      ...rest,
      brandId: brandIdNumber || null,
      brandName: brandId,
      mainCategoryId,
      mainCategory: categoryArr.find((it: CategoryDatum) => it.id === mainCategoryId)?.name,
      submitFrom: SubmitFromType.stark
    };
    setLoading(true);
    // 风控校验第一步发送企业名称换取riskKey
    const riskKeyRes = await fetchPlanRiskCheckService({ enterpriseName: rest.enterpriseName });
    const riskKey = riskKeyRes?.data;
    if (!riskKey) {
      message.error('请重试！');
      setLoading(false);
      return;
    }
    pollRiskCheckResult({ maxAttempts: 5, parmas: finalParam, riskKey, startTime: new Date().getTime() });
  };

  const onSubmit = async (finalParam: IeaSubmitReq) => {
    setLoading(true)
    const res = await fetchSubmit({ ...finalParam, onSubmit });
    if (res.success) {
      setInvitationCodeData(res.data);
      setVisible(false);
      setLoading(false)
      setInvitationCodeVisible(true);
      duTrack.autoBury({
        nodeId: '1cd8065cf56d3673af05627788288ada',
        nodeName: '商家后台招商提交成功埋点',
        eventType: 'click', // 点击: click, 曝光: expose
      });
    } else {
      // 贵公司+品牌+类目信息已存在，不可重复提交！情况下不关闭弹窗
      if (res.error?.code !== 500) {
        setVisible(false);
      }
      setLoading(false)
    }
  };

  async function pollRiskCheckResult({ maxAttempts = 5, parmas, riskKey, startTime }) {
    // 超过最大轮询次数没有得到结果则直接当作通过提交或者超过3秒也直接提交
    if (maxAttempts <= 0 || new Date().getTime() - startTime > 3 * 1000) {
      onSubmit(parmas);
      setLoading(false);
      return;
    }
    try {
      const riskResult = await fetchPlanObtainRiskCheckResultService({ key: riskKey });
      if (riskResult?.data === true) {
        onSubmit(parmas);
        setLoading(false);
        return
      } else if (riskResult?.data === false) {
        message.error('您填写的企业名称不存在，请检查后重新提交！');
        setLoading(false);
        return
      }
      pollRiskCheckResult({ maxAttempts: maxAttempts - 1, parmas, riskKey, startTime });
    } catch (error) {
      setLoading(false);
    }
  }

  const renderForm = () => {
    return formItems.map((item) => {
      if (item.name === 'brandId') {
        return (
          <BrandIdSelect item={item} form={form} visible={visible} setBrandArr={setBrandArr} />
        );
      } else {
        if (item.type === 'select') {
          return (
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              <Select
                showSearch={item.name === 'mainCategoryId'}
                optionFilterProp="label"
                placeholder={item.placeholder}
                options={item.options}
              />
            </Form.Item>
          );
        }
        if (item.type === 'number') {
          return (
            <Form.Item name={item.name} label={item.label} rules={item.rules}>
              <InputNumber
                placeholder={item.placeholder}
                maxLength={item.maxLength}
                controls={false}
                style={{ width: 228 }}
              />
            </Form.Item>
          );
        }
        return (
          <Form.Item name={item.name} label={item.label} rules={item.rules}>
            <Input
              showCount
              placeholder={item.placeholder}
              style={{ width: item.name === 'contactName' && 228 }}
              maxLength={item.maxLength}
            />
          </Form.Item>
        );
      }
    });
  };

  return (
    <>
      <div
        className={isHovered ? styles.registerButtonEd : styles.registerButton}
        onClick={() => {
          getDetail();
        }}
      >
        立即报名
      </div>
      <Modal
        width={680}
        className={styles.registerDialog}
        title="填写报名信息"
        visible={visible}
        maskClosable={false}
        destroyOnClose
        cancelText="取消"
        centered
        okText="提交"
        okButtonProps={{
          loading: btnLoading
        }}
        onOk={() => {
          handleSubmit();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Alert
          message="提交成功后，得物运营人员将在 5-10 个工作日内联系您沟通入驻事项"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Form
          className={styles.registerForm}
          form={form}
          autoComplete="off"
          preserve={false}
          labelCol={{ span: isHaveTiktokFansNum ? 7 : 6 }}
        >
          {renderForm()}
        </Form>
      </Modal>
      <InvitationCodeDialog
        visible={invitationCodeVisible}
        setVisible={setInvitationCodeVisible}
        dataSource={invitationCodeData}
      />
    </>
  );
}
