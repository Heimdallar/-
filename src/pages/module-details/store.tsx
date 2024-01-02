import { useState, useEffect, FunctionComponent } from 'react';
import { createContainer } from '@umijs/max';
import { useRequest } from 'ahooks';
import { InterfaceReply } from '@/utils/request';
import { EnumsInterface } from '@/pages/module-details/service/api';

const useRemoteEnums = (initialEnums = {}) => {
  const [enums, setEnums] = useState<InterfaceReply<typeof EnumsInterface>>(initialEnums);
  const { data } = useRequest(() => {
    return EnumsInterface({});
  });

  useEffect(() => {
    setEnums(data || {});
  }, [data]);

  return { enums };
};

export const PageStoreContext = createContainer(useRemoteEnums);

export const PageStore: FunctionComponent = ({ children }) => {
  return <PageStoreContext.Provider>{children}</PageStoreContext.Provider>;
};
