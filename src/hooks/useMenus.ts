import { useRequest } from 'ahooks';
import { config } from '@/defaultSettings';
import { getMenuListInterface } from '@/service/api';

const { backstageCode, globalInfoCacheMillisecond } = config;

/** 全局菜单 */
export const useMenus = () => {
  const { data: rawMenuList, runAsync: dispatchRawMenuList } = useRequest(
    () => {
      return getMenuListInterface({
        tenantId: 1,
        backstageCode,
      }).then((res) => res?.data || []);
    },
    {
      manual: true,
      cacheKey: 'raw-menu-list',
      staleTime: globalInfoCacheMillisecond,
      cacheTime: globalInfoCacheMillisecond,
    },
  );

  return {
    rawMenuList,
    dispatchRawMenuList,
  };
};
