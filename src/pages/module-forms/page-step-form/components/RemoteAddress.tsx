import { ProFormCascader } from '@poizon-design/pro-form';
import { ComponentProps } from 'react';
import { useProvinceData } from '../hooks/useProvinceData';

type RemoteAddressProps = ComponentProps<typeof ProFormCascader>;

export const RemoteAddress = (props: RemoteAddressProps) => {
  const { provinceList } = useProvinceData();
  return <ProFormCascader {...props} fieldProps={{ options: provinceList }} />;
};
