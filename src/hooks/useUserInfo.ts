import { useRequest } from 'ahooks';
import { config } from '@/defaultSettings';
import { getUserInfoInterface } from '@/service/api';

const { globalInfoCacheMillisecond } = config;

/** 全局当前登录的用户 */
export const useUserInfo = () => {
  const { data: userInfo = {}, runAsync: dispatchUserInfo } = useRequest(
    () => {
      return getUserInfoInterface().then((res) => res?.data || {});
    },
    {
      manual: true,
      cacheKey: 'user-info',
      staleTime: globalInfoCacheMillisecond,
      cacheTime: globalInfoCacheMillisecond,
    },
  );

  return {
    userInfo,
    dispatchUserInfo,
  };
};
