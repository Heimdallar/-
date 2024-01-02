import { useRequest } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';
import { InterfaceReply } from '@/utils/request';
import { IEntityProvince } from '@/pages/module-forms/page-step-form/entity';
import { getProvinceList } from '@/pages/module-forms/page-step-form/service/api';

type DataReply = InterfaceReply<typeof getProvinceList>;
type DateEntity = IEntityProvince;

/*
 * 清洗数据
 */
const provinceNormalizer = (data: DataReply): DateEntity => {
  return data.map((i) => ({
    label: i.chineseAbbreviation,
    value: i.areaCode,
  }));
};

export const useProvinceData = () => {
  const [provinceList, setProvinceList] = useState<DateEntity>([] as DateEntity);
  const { data, loading, error, run } = useRequest(getProvinceList, {
    manual: true,
    staleTime: 10000,
  });

  useEffect(() => {
    run();
  }, [run]);

  useMemo(() => {
    if (data) {
      setProvinceList(provinceNormalizer(data));
    }
  }, [data]);

  return {
    provinceList,
    loading,
    error,
    run,
  };
};
