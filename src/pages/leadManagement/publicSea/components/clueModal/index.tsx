import { useRef, useState } from 'react';
import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  SubmitterProps,
} from '@poizon-design/pro-form';
import { AutoComplete, Button, Divider, FormInstance, message } from 'poizon-design';
import { debounce, isEmpty } from 'lodash';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import { addPublicSeaClue, fetchIncludePredictApi, getBrandByName, queryLabelList, updatePublicSeaClue } from '../../service';
import { QualificationOptions, applyIntentionOptions, categoryIOption, defaultItemCol, initFormState, initInternetSaleInfos } from '../../interface';
import ExternalSales from '../externalSales';
import BrandEnterprise from '../brandEnterprise';
import './index.less'
interface ClueItem {
  batchLeadId: number;
  clueShow: boolean;
  unchangeableValue?: { [key: string]: string | number };
  requiredColumns?: { [key: string]: boolean };
  setRow: any
  setClueShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: any;
  handleAdd?: (id: number, params: Object) => Promise<any>;
  handleUpdate?: (id: number, params: Object) => Promise<any>;
}

export default ({
  batchLeadId,
  clueShow,
  setClueShow,
  row,
  setRow,
  refreshList,
  unchangeableValue = {},
  requiredColumns,
  handleAdd,
  handleUpdate,
}: ClueItem) => {
  const isActivity = true
  const isEdit = !isEmpty(row);
  const defaultValue = isActivity ? { ...initFormState, ...row } : row;

  if (defaultValue?.brandType == -1) {
    defaultValue.brandType = undefined;
  }
  const initialValues = {
    ...(isEdit ? defaultValue : initFormState),
    ...unchangeableValue,
  };

  // 如果不存在外网销售情况信息则需要塞入空数据
  if (isEdit && !initialValues.internetSaleInfos?.length) {
    initialValues.internetSaleInfos = [initInternetSaleInfos];
  }

  const [brandOpts, setBrandOpts] = useState([]);
  const [brandRet, setBrandRet] = useState();
  const formRef = useRef<ProFormInstance>();
  const handleSearch = debounce(async (keyWords = '') => {
    setBrandRet({ brandId: 0, label: '', value: '' });
    const resp: any = await fetchIncludePredictApi({
      name: keyWords,
      pageSize: 200,
      pageNum: 1,
    });
    const res = (resp.data || []).map((item: { name: string; id: number }) => {
      return {
        label: item.name,
        value: item.name,
        brandId: item.id,
      };
    });
    setBrandOpts(res || []);
  }, 200);
  const handleSelect = (value: string) => {
    const res = brandOpts.filter((d) => d.value === value)?.[0] || {
      brandId: 0,
      label: value,
      value,
    };
    setBrandRet(res);
  };
  const convertsParams = (params: any) => {
    const param = params.internetSaleInfos.map((item:any) => {
      return {
        ...item,
        storeChannel: unchangeableValue?.storeChannel,
      };
    });
    return { ...params, internetSaleInfos: param };
  };


  const submit = async (props:any) => {
    await formRef?.current
      .validateFields()
      .then(
        async (values) => {
          console.log(values)
        await onSubmit({
          values,
          brandRet,
          initialValues,
          unchangeableValue,
          convertsParams,
          isEdit,
          handleAdd,
          addPublicSeaClue,
          handleUpdate,
          updatePublicSeaClue,
          batchLeadId,
        });
        props.reset();
        setClueShow(false);
        setRow(undefined);
        refreshList();
      })
      .catch(() => {
        // onFinishFailed(errorInfo);
        alert(`提交失败`)
      });
  };

  return (
    <ModalForm
      visible={clueShow}
      title={isEdit ? '编辑线索' : '新增线索'}
      width={800}
      formRef={formRef}
      className="modal-clue"
      submitter={{
        render: (props) => {
          return [
            <Button key="3" type="primary" 
            onClick={() => submit(props)}
            
            >
              {'提交'}
            </Button>,
            <Button
              key="1"
              onClick={() => {
                props.reset();
                setClueShow(false);
              }}
            >
              返回
            </Button>,
          ];
        },
      }}
      initialValues={initialValues}
      {...defaultItemCol}
      onVisibleChange={(val) => {
        if (!val) {
          setClueShow(false);
          setRow(undefined);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
    >
      <h4>基础信息</h4>

      <ProForm.Item
        name="brandInfo"
        label="品牌名称"
        rules={[{ required: true, message: '请输入品牌名称' }]}
      >
        {unchangeableValue?.brandInfo === undefined ? (
          <AutoComplete
            placeholder="请输入品牌名称"
            onSearch={handleSearch}
            onSelect={handleSelect}
            options={brandOpts}
            maxLength={50}
          />
        ) : (
          <div>{unchangeableValue.brandInfo}</div>
        )}
      </ProForm.Item>
      <ProFormSelect
        label="主营类目"
        name="mainCategoryInfo"
        rules={[{ required: true, message: '请选择主营类目' }]}
        options={categoryIOption}
        placeholder="请选择资质类型"
        fieldProps={{
          style: { display: 'block' },
        }}
      >
        {/* {unchangeableValue?.mainCategoryInfo === undefined ? (
          <CategorySelect  placeholder="请选择主营类目"  />
        ) : (
          <div>{(unchangeableValue.mainCategoryInfo as any).label}</div>
        )} */}
      </ProFormSelect>
      <ProFormText
        name="enterpriseName"
        label="企业名称"
        rules={[
          { required: true, message: '请输入企业名称' },
          { max: 100, message: '最多100个字符' },
        ]}
        placeholder="请输入企业名称"
        wrapperCol={{ span: 14 }}
      />
      <ProFormSelect
        name="qualificationType"
        label="资质类型"
        rules={[{ required: true, message: '请选择资质类型' }]}
        options={QualificationOptions}
        placeholder="请选择资质类型"
        fieldProps={{
          style: { display: 'block' },
        }}
      />
      <ProFormSelect
        name="entryWilling"
        label="入驻意愿"
        rules={[{ required: true, message: '请选择入驻意愿' }]}
        options={applyIntentionOptions}
        placeholder="请选择入驻意愿"
        fieldProps={{
          style: { display: 'block' },

        }}
      />
      <ProFormSelect
        name="labelIds"
        label="标签"
        fieldProps={{
          mode: 'multiple',
          placeholder: '请选择标签',
          style: { display: 'block' },
        }}
        request={async () => {
          const resp: any = await queryLabelList({ id: batchLeadId });
          const res = resp.map((item: any) => {
            return {
              label: item.title,
              value: item.value,
            };
          });
          return res || [];
        }}
      />
      <Divider />
      <h4>外网销售情况</h4>
      <ExternalSales unchangeableValue={unchangeableValue} />
      <Divider />
      <h4>联系人信息</h4>
      <BrandEnterprise></BrandEnterprise>
    </ModalForm>
  );
};

