import { useState, useEffect, FunctionComponent, PropsWithChildren } from 'react';
import { createContainer } from '@umijs/max';
import { useRequest } from 'ahooks';
import { EnumsInterface } from '@/pages/module-tables/service/api';

/** 定义 Hooks1 - 这里例子是 fetch 远程枚举并给到 Page 全局使用 */
const useRemoteEnum = (initialEnums) => {
  const [enums, setEnums] = useState(initialEnums);
  const { data } = useRequest(() => {
    return EnumsInterface({});
  });

  useEffect(() => {
    setEnums(data || {});
  }, [data]);

  return { enums };
};

export const PageStoreContext = createContainer(useRemoteEnum);

export const PageStore: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <PageStoreContext.Provider>{children}</PageStoreContext.Provider>;
};
