/*
 * @Author: maoyuanjun maoyuanjun@shizhuang-inc.com
 * @Date: 2023-10-27 17:14:42
 * @LastEditors: maoyuanjun maoyuanjun@shizhuang-inc.com
 * @LastEditTime: 2023-10-27 19:57:32
 * @FilePath: /frontend-monorepo/apps/customer/poizon-design-pro/src/app.tsx
 * @Description: 首页
 */
import React, { ReactNode, useEffect } from 'react';
import { parseTokenDraft } from '@du/utils';
import { config } from '@/defaultSettings';
import { createGlobalContainer } from '@/globalStore';
import { useMenus, useUserInfo } from '@/hooks';
import { NotFound } from '@/pages/NotFound';
import { getToken } from '@/utils/auth';

const { backstageCode } = config;

/**
 * Axios: https://axios-http.com/
 */
export const request = {
  dataField: 'data',

  // 请求拦截器
  requestInterceptors: [
    (c) => {
      if (!c.params) {
        Object.assign(c, { params: {} });
      }
      Object.assign(c.params, {
        sign: parseTokenDraft(c.params),
      });

      Object.assign(c.headers, {
        accessToken: getToken(),
        backstageCode,
      });
      return c;
    },
  ],

  // 错误配置
  errorConfig: {
    errorHandler: () => {
      // 用户自定义配置错误处理逻辑
    },
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

// # 用于做埋点统计/设置标题，此处引入了效率工程的 SDK
// @ts-ignore
export function onRouteChange({ location }) {
  // 获取当前 route
  // const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
}
// # 404 逻辑
export function patchClientRoutes({ routes }: { routes: any }) {
  routes[0]?.children.push({
    path: '/*',
    element: <NotFound />,
  });
}

// # 覆写 render
export function render(oldRender: VoidFunction) {
  oldRender();
}

// # Context 包裹
export function rootContainer(container: ReactNode) {
  return React.createElement(createGlobalContainer(useAppInitialHooks).Provider, null, container);
}
