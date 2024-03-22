import React, { useState, useEffect, useMemo } from 'react';
import { ProFieldStaticRequestData, RequestOptionsType, ProFieldRequestData } from '@/utils/types';
import ProSelect, { ProSelectProps } from '../../index';
import { fetchTitle } from '@/pages/leadManagement/style/service';

export type BusinessBasicSelectProps = ProSelectProps & {
  loadAllRequest?: ProFieldStaticRequestData;
  dynamicLoad?: boolean;
  dynamicLoadRequest?: ProFieldRequestData;
  [key: string]: any
};

const BusinessBasicSelect: React.FC<BusinessBasicSelectProps> = (props) => {
  const { loadAllRequest, dynamicLoad, again, dynamicLoadRequest, ...fieldProps } = props;
  const [businessList, setBusinessList] = useState<RequestOptionsType[] | undefined>(undefined);

  useEffect(() => {
    if (!dynamicLoad) {
      fetchData()
    }
  }, [dynamicLoad, again]);

  const fetchData = async () => {
    const value = await fetchTitle();
    const options=value?.map((option: { id: any; name: any; }) => (
        {
          label:name,
          value:option.name
        }
    ))
    setBusinessList(options)
      }
 
  const propsWithBusinessData = useMemo(() => {
    if (dynamicLoad) {
      return { request: dynamicLoadRequest, ...fieldProps };
    }
    return { options: businessList, ...fieldProps };
  }, [dynamicLoad, businessList, fieldProps, dynamicLoadRequest]);
  return (
    <>
      <ProSelect {...propsWithBusinessData} />
    </>
  );
};

export default BusinessBasicSelect;
