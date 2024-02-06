import ProForm from '@poizon-design/pro-form';
import type { FormInstance } from 'poizon-design';
import { AutoComplete, Input } from 'poizon-design';
import { useEffect, useState } from 'react';
import fetchIncludePredictService from '@/services/listIncludePredict/listIncludePredict';

interface Props {
  setBrandId: (val?: number) => void
}

export default function index({ setBrandId }: Props) {
  const [brandIdList, setBrandIdList] = useState<Array<{label: string, value: string, id: number}>>([]);

  useEffect(() => {
    getBrandIdList();
  }, []);

  const getBrandIdList = async (name = '') => {
    const res = await fetchIncludePredictService({
      name,
      pageNum: 1,
      pageSize: 999,
      isShow: 1,
    });
    if(!res.success) return
    const data = res.data.map((item) => ({
      label: item.label,
      value: item.label,
      id: item.value
    }));
    setBrandIdList(data || []);
  };
  const onSelect = (val: string) => {
    const current = brandIdList.find((item)=> (item.label === val))
    setBrandId(current ? current.id : undefined)
  }
  
  return (
    <ProForm.Item
      name="brandName"
      label="主营品牌"
      rules={[
        {
          required: true,
          message: '请选择主营品牌',
        },
      ]}
    >
      <AutoComplete options={brandIdList} onSearch={getBrandIdList} onSelect={onSelect} maxLength={20} onChange={() => setBrandId(undefined)}>
        <Input placeholder="请选择" style={{ width: 228 }} />
      </AutoComplete>
    </ProForm.Item>
  );
}
