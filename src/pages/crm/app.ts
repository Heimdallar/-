import React, { ReactNode, useEffect } from 'react';
import { notification } from 'poizon-design';
import { config } from '@/defaultSettings';
import { createGlobalContainer } from '@/globalStore';
import { useMenus, useUserInfo } from '@/hooks';
import { platformEventsEnums, relativeQuestionairePages } from './utils/duEEIntegration';

const { backstageCode, isDev, proxyFix } = config;

// # ProRequest 配置
export const proRequest = {
  prefix: proxyFix,
  envConfig: {
    isDev,
    devEnv: 't1',
  },
  headers: {
    backstageCode,
  },
  // 接口返回的错误信息
  notificationCB: (val: {
    message: string;
    description: string;
    type: 'success' | 'info' | 'warning' | 'error';
  }) => {
    const { message, description, type } = val;
    notification[type]({
      message,
      description,
    });
  },
};

// # 应用初始化逻辑代替 globalState 与 umi initialstate
const useAppInitialHooks = () => {
  const { rawMenuList, dispatchRawMenuList } = useMenus();
  const { userInfo, dispatchUserInfo } = useUserInfo();

  useEffect(() => {
    dispatchRawMenuList();
    dispatchUserInfo();
  }, [dispatchRawMenuList, dispatchUserInfo]);

  return { rawMenuList, userInfo };
};

const initQuestionaire = () => {
  try {
    window?.DuEEIntegration?.clickBusinessTransmit?.(platformEventsEnums.collect_questionaires);
  } catch (error) {}
};

// # 用于做埋点统计/设置标题
export function onRouteChange() {
  const isInQuesList = relativeQuestionairePages.includes(location?.pathname);
  if (!isInQuesList) return;
  initQuestionaire();
}

// # 覆写 render
export function render(oldRender: any) {
  oldRender();
}

// # Context 包裹
export function rootContainer(container: ReactNode) {
  return React.createElement(createGlobalContainer(useAppInitialHooks).Provider, null, container);
}
