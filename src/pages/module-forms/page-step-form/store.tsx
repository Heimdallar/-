import { useState, useEffect, FunctionComponent, PropsWithChildren } from 'react';
import { createContainer } from '@umijs/max';
import { useRequest } from 'ahooks';
import { InterfaceReply } from '@/utils/request';
import { EnumsInterface } from '@/pages/module-tables/service/api';

/** 定义 Hooks - 这里例子是 fetch 远程枚举并给到 Page 全局使用 */
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

/** 暴露提供 Context */
export const PageStoreContext = createContainer(useRemoteEnums);

/** 暴露提供包裹组件 */
export const PageStore: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <PageStoreContext.Provider>{children}</PageStoreContext.Provider>;
};
