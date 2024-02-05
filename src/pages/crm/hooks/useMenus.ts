import { useRequest } from 'ahooks';
import { config } from '@/defaultSettings';
import { getMenuListInterface } from '@/service/api';
import { InterfaceReply } from '@/utils/request';

const { backstageCode, globalInfoCacheMillisecond } = config;

/** 全局菜单 */
export const useMenus = () => {
  const { data: rawMenuList, runAsync: dispatchRawMenuList } = useRequest(
    () => {
      return getMenuListInterface({
        tenantId: 1,
        backstageCode,
      }).then(handleResult);
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

// eslint-disable-next-line import/no-unused-modules
export const handleResult = (menuListResult: InterfaceReply<typeof getMenuListInterface>) => {
  if (menuListResult && Array.isArray(menuListResult)) {
    menuListResult.forEach((m) => {
      if (m.children) {
        m.children = m.children
          .filter((c) => c.menuUrl?.includes('crm'))
          .map((d) => {
            d.menuUrl = d.menuUrl ? d.menuUrl.replace('/crm', '') : '';
            return d;
          });
      }
    });
  }
  const res = (menuListResult ?? []).filter(
    (r) => (r.children && r.children.length > 0) || r.menuUrl === '/',
  );
  return res || [];
};
