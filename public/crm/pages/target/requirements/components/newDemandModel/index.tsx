import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from '@poizon-design/pro-form';
import {
  IBrandItem,
  IModelBaseProps,
  TagItem,
  RequireEditItem,
  TargetLabel,
} from '../../interface';
import { AutoComplete, Button, Input, InputNumber, message } from 'poizon-design';
import { useRef, useState } from 'react';
import { debounce } from 'lodash';
import CategorySelect from '../CategorySelect';
import {
  PRIORITY_OPTIONS,
  STORE_CHANNELS,
  defaultItemCol,
  QUALIFICATION_TYPES,
} from '../../config';
import { putNewDemand } from '../../api';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import { fetchLabelList } from '../../../../leadManagement/labelManagement/api/index';
import { isEmpty } from 'lodash';
import { fetchIncludePredictApi } from '@/apis/listIncludePredict';
interface INewDemandProps extends IModelBaseProps {
  onNewDemand: () => void;
  setRow: React.Dispatch<React.SetStateAction<RequireEditItem | undefined>>;
  row?: RequireEditItem;
}
export default ({ visible, setVisible, onNewDemand, row, setRow }: INewDemandProps) => {
  const formRef = useRef<ProFormInstance>();
  const [brandOpts, setBrandOpts] = useState<IBrandItem[]>([]);
  const [brandRet, setBrandRet] = useState<IBrandItem>();
  const isEdit = !isEmpty(row);
  const handleSearch = debounce(async (keyWords = '') => {
    const resp = await fetchIncludePredictApi({
      name: keyWords,
      pageSize: 200,
      pageNum: 1,
    });
    const res = (resp.data?.contents || []).map((item: {name: string, id: number}) => {
      return {
        label: item.name,
        value: item.name,
        brandId: item.id,
      };
    });
    setBrandOpts(res || []);
    // 支持不选择填入品牌名称
    setBrandRet({
      brandId: 0,
      label: keyWords,
      value: keyWords,
    });
  }, 200);
  const handleSelect = (value: string) => {
    const res = brandOpts.filter((d) => d.value === value)?.[0] || {
      brandId: 0,
      label: value,
      value,
    };
    setBrandRet(res);
  };
  const handleBrandBlur = () => {
    let blurflag = brandOpts.find((item) => item.value === brandRet?.value);
    if (!blurflag) {
      formRef.current?.setFields([
        {
          name: 'brandInfo',
          value: undefined,
        },
      ]);
    }
  };

  const handlSubmit = async () => {
    let formValue;
    try {
      formValue = (await formRef.current?.validateFieldsReturnFormatValue?.()) || ({} as any);
    } catch {
      // 有未填项
      return;
    }
    const judgeTargetLabel = (num: undefined | []) => {
      if (!num || !num.length) return [];
      if (num.length) {
        return typeof num?.[0] == 'number' ? num : num.map((item: TargetLabel) => item.id);
      }
    };
    const priorityScore: number = formValue.priorityScore;
    const params = {
      priorityScore: priorityScore,
      priorityScoreDesc: PRIORITY_OPTIONS.find((item) => item.value === priorityScore)?.label,
      brandId: brandRet?.brandId || 0,
      leadsRequireNumber: formValue.leadsRequireNumber,
      brandName: brandRet?.label || formValue.brandInfo || '',
      mainCategoryId: formValue.mainCategoryInfo?.value || '',
      mainCategory: formValue.mainCategoryInfo?.label || '',
      enterpriseName: formValue.enterpriseName || '',
      brandType: formValue.brandType || [],
      storeChannel:
        typeof formValue.storeChannel === 'string'
          ? [formValue.storeChannel]
          : formValue.storeChannel || [],
      remark: formValue.remark,
      storeUrl: formValue.storeUrl || '',
      storeName: formValue.storeName || '',
      targetOpId: formValue.targetPerson?.key || 0,
      targetOpName: formValue.targetPerson?.label || '',
      targetLabel: judgeTargetLabel(formValue.targetLabel),
    };
    isEdit ? (params.id = row?.id) : '';
    const resp = await putNewDemand(params);
    if (resp.msg) return;
    message.success('新增成功');
    setVisible(false);
    setRow(undefined);
    formRef?.current?.resetFields();
    onNewDemand();
  };

  return (
    <ModalForm
      title={isEdit ? '编辑需求' : '新增需求'}
      width={800}
      formRef={formRef}
      visible={visible}
      {...defaultItemCol}
      modalProps={{
        destroyOnClose: true,
      }}
      request={async () => {
        if (!isEdit) {
          return {};
        }
        const rows = {
          ...row,
          targetPerson: { key: row.targetOpId, label: row.targetOpName },
          brandInfo: row.brandName,
          mainCategoryInfo: { label: row.mainCategory, value: row.mainCategoryId },
        };
        setBrandRet({
          brandId: row.brandId,
          label: row.brandName,
          value: row.brandName,
        });
        return rows;
      }}
      onVisibleChange={(val) => {
        if (!val) {
          setVisible(val);
          setRow(undefined);
        }
      }}
      layout="horizontal"
      submitter={{
        render: (props) => {
          return [
            <Button
              key="1"
              onClick={() => {
                props.reset();
                setVisible(false);
                setRow(undefined);
              }}
            >
              取消
            </Button>,
            <Button key="2" type="primary" onClick={handlSubmit}>
              提交
            </Button>,
          ];
        },
      }}
    >
      <ProForm.Item
        name="brandInfo"
        label="需求品牌名称"
        rules={[
          { required: true, message: '请输入需求品牌名称' },
          { max: 50, message: '最大50个字符' },
        ]}
      >
        <AutoComplete
          placeholder="请输入需求品牌名称"
          onSearch={handleSearch}
          onSelect={handleSelect}
          options={brandOpts}
          onBlur={handleBrandBlur}
        />
      </ProForm.Item>
      <ProForm.Item
        label="需求类目"
        name="mainCategoryInfo"
        rules={[{ required: true, message: '请选择需求类目' }]}
      >
        <CategorySelect />
      </ProForm.Item>
      <ProFormSelect
        name="priorityScore"
        label="优先级"
        rules={[{ required: true, message: '请选择优先级' }]}
        options={PRIORITY_OPTIONS}
      />
      <ProForm.Item
        label="需求数量"
        name="leadsRequireNumber"
        rules={[
          { required: true, message: '请输入需求数量' },
          { pattern: /^\d+$/, message: '请输入整数' },
        ]}
      >
        <InputNumber
          placeholder="请输入需求数量"
          style={{ width: '100%' }}
          min={1}
          max={5}
          maxLength={3}
        />
      </ProForm.Item>
      <ProFormSelect.SearchSelect
        name="targetLabel"
        label="需求标签"
        rules={[{ required: false, message: '请输入需求标签' }]}
        debounceTime={300}
        fieldProps={{
          labelInValue: true,
          fieldNames: { value: 'id', label: 'labelName' },
          style: {
            minWidth: 140,
          },
        }}
        request={async ({ keyWords = '' }) => {
          const res = await fetchLabelList({
            labelName: keyWords,
            pageSize: 200,
            pageNum: 1,
            status: 0,
          });
          return res.contents || [];
        }}
      ></ProFormSelect.SearchSelect>
      <ProForm.Item label="企业名称" name="enterpriseName" rules={[{ max: 200 }]}>
        <Input placeholder="请输入企业名称" maxLength={200} />
      </ProForm.Item>
      <ProFormSelect
        name="storeChannel"
        label="经营平台"
        fieldProps={{
          placeholder: '请选择经营平台',
        }}
        options={STORE_CHANNELS}
        rules={[{ required: true, message: '请选择经营平台' }]}
      />
      <ProForm.Item label="店铺链接" name="storeUrl" rules={[{ max: 200 }]}>
        <Input placeholder="请输入店铺链接" maxLength={200} />
      </ProForm.Item>
      <ProForm.Item label="店铺名称" name="storeName" rules={[{ max: 200 }]}>
        <Input placeholder="请输入店铺名称" maxLength={200} />
      </ProForm.Item>
      <ProFormSelect
        name="brandType"
        label="资质类型"
        fieldProps={{
          mode: 'multiple',
          placeholder: '请选择资质类型',
        }}
        options={QUALIFICATION_TYPES}
      />

      <ProForm.Item
        label="需求对接人"
        name="targetPerson"
        rules={[{ required: true, message: '请输入需求对接人' }]}
        extra="请填写后续外包处理后的线索跟进人邮箱前缀,默认自动进入对接人的私海
        "
      >
        <UserSelect labelInValue max={100} dynamicLoad placeholder="请输入需求对接人" />
      </ProForm.Item>
      <ProFormTextArea
        name="remark"
        label="备注"
        fieldProps={{
          showCount: true,
          maxLength: 200,
        }}
      />
    </ModalForm>
  );
};
