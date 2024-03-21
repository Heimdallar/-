import ProForm, {
    ModalForm,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
  } from '@poizon-design/pro-form';
  import { isEmpty } from 'lodash';
  import { Input, message } from 'poizon-design';
  import { useState, useEffect } from 'react';
  import { useRequest } from 'ahooks';
  import CategorySelect from '@/components/ProSelect/business/CategorySelect';
  import { saveBrand } from '../../service';
  import { IncentiveOptions, QualificationOptions } from '../../interface';
  import { OpportunityItem } from '../../interface';
  import BrandSelect from '../brandSelect';
  
  interface styleParam {
    opportunityShow: boolean;
    setRow: React.Dispatch<React.SetStateAction<OpportunityItem | undefined>>;
    SetOpportunityShow: React.Dispatch<React.SetStateAction<boolean>>;
    refreshList: () => void;
    row?: OpportunityItem;
  }
  
  export default ({ opportunityShow, SetOpportunityShow, row, setRow, refreshList }: styleParam) => {
    const isEdit = !isEmpty(row);
    const [brandId, setBrandId] = useState<number>();
    const initialValues = isEdit
      ? row
      : {
          status: 1,
          recommendAwardStatus: 1,
        };
  
    const [options, setOptions] = useState<any[]>([]); // 对接人下拉列表
    // const { run: fetchMerchantQueryManagerInfo } = useRequest(
    //   (userName) => fetchMerchantQueryManagerInfoService({ userName }),
    //   {
    //     debounceWait: 300,
    //     manual: true,
    //     onSuccess: (res) => {
    //       const { data = [] } = res;
    //       setOptions(data);
    //     },
    //   },
    // );
  
    useEffect(() => {
      if (isEdit && row?.contactPersonId && row?.contactPerson) {
        setOptions([{ label: row?.contactPerson, value: row?.contactPersonId }]);
      }
    }, [isEdit]);
    return (
      <ModalForm
        visible={opportunityShow}
        title={isEdit ? '编辑品牌' : '新增品牌'}
        width={520}
        initialValues={initialValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onVisibleChange={(val) => {
          if (!val) {
            SetOpportunityShow(false);
            setRow(undefined);
          }
        }}
        modalProps={{
          maskClosable: false,
          centered: true,
          destroyOnClose: false,
        }}
        layout="horizontal"
        onFinish={async (values) => {
          const { mainCategoryInfo, contactPersonId, ...rest } = values;
          const { label, value } = mainCategoryInfo;
          const params = {
            ...row,
            ...rest,
            mainCategoryId: value,
            mainCategory: label,
            brandId,
            contactPersonId,
          };
        //   if (contactPersonId) {
        //     params.contactPerson = options?.[0]?.username;
        //   } else {
        //     params.contactPerson = '';
        //   }
          const res = await saveBrand(params);
          if (res.code !== 200) return;
          if (res.data === true) {
            message.success('提交成功');
            SetOpportunityShow(false);
            setRow(undefined);
            refreshList();
            return true;
          }
        }}
      >
        <BrandSelect setBrandId={setBrandId} />
        <ProForm.Item label="品牌中文名" name="brandNameCn">
          <Input placeholder="品牌中文名" />
        </ProForm.Item>
        <ProForm.Item label="品牌英文名" name="brandNameEn" extra={'注：中文名和英文名至少填写一个'}>
          <Input placeholder="品牌英文名" />
        </ProForm.Item>
        <ProForm.Item
          label="主营类目"
          name="mainCategoryInfo"
          rules={[{ required: true, message: '请选择主营类目' }]}
        >
          <CategorySelect isIdValue labelInValue placeholder="请选择主营类目" disabled={isEdit} />
        </ProForm.Item>
        <ProFormSelect
          name="qualificationType"
          label="资质类型"
          options={QualificationOptions}
          fieldProps={{
            mode: 'multiple',
          }}
          style={{ width: '100%' }}
        />
        <ProFormRadio.Group
          name="incentive"
          label="是否激励"
          rules={[{ required: true, message: '请选择是否激励' }]}
          options={IncentiveOptions}
        />
        <ProFormRadio.Group
          name="status"
          label="招商状态"
          rules={[{ required: true, message: '请选择招商状态' }]}
          options={[
            {
              label: '招商',
              value: 1,
            },
            {
              label: '暂不招商',
              value: 0,
            },
          ]}
        />
        <ProFormRadio.Group
          name="recommendAwardStatus"
          label="是否推荐有奖"
          rules={[{ required: true, message: '请选择是否推荐有奖' }]}
          options={[
            {
              label: '是',
              value: 1,
            },
            {
              label: '否',
              value: 0,
            },
          ]}
        />
        <ProFormSelect
          name="contactPersonId"
          label="对接人"
          style={{ width: '100%' }}
          options={options}
          fieldProps={{
            showSearch: true,
            onSearch: (value) => {
              if (!value) return;
            //   fetchMerchantQueryManagerInfo(value);
            },
          }}
        />
      </ModalForm>
    );
  };
  