import duTrack from '@du/track';
import { useRequest } from 'ahooks';
import { config } from '@/defaultSettings';
import { getUserInfoInterface } from '@/service/api';
import { InterfaceReply } from '@/utils/request';
import store from '@/store';
import { initMfDutrack } from '@/utils/duTrack';
import { initEEIntegration } from '@/utils/duEEIntegration';

const { globalInfoCacheMillisecond } = config;
/* istanbul ignore next */
export const useUserInfo = () => {
  const { userStore } = store.modules;
  const { data: userInfo = {}, runAsync: dispatchUserInfo } = useRequest(
    () => {
      return getUserInfoInterface({})
        .then((data: Partial<InterfaceReply<typeof getUserInfoInterface>>) => {
          userStore.setUserInfo(data);
          initMfDutrack(data);
          window.buryTrackParams = {
            userId: data.id,
            userName: data.username,
          };
          initEEIntegration(data.id, data.username);
          duTrack.sendExpose({
            nodeId: 'crm_index_page',
            nodeType: 'PAGE',
            nodeName: '首页',
          });
          return data || {};
        })
        .catch(() => {});
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
