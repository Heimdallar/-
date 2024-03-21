import ProForm from '@poizon-design/pro-form';
import type { FormInstance } from 'poizon-design';
import { AutoComplete, Input } from 'poizon-design';
import { useEffect, useState } from 'react';

interface Props {
  setBrandId: (val?: number) => void
}
interface Data{
    label: string, value: string, id: number
}
interface ApiResponse {
    data: Data[];
    success: boolean;
}

export default function index({ setBrandId }: Props) {
  const [brandIdList, setBrandIdList] = useState<Array<{label: string, value: string, id: number}>>([]);

  useEffect(() => {
    getBrandIdList();
  }, []);

  const getBrandIdList = async (name = '') => {
    const res:ApiResponse = {
        data:[
            {
                id:1,
                label:'test1',
                value:'1',
            }
        ],
        success:true
    }
    if(!res.success) return
    const data = res.data.map((item) => ({
      label: item.label,
      value: item.value,
      id: item.id
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
