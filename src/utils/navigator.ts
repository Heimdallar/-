import { createSearchParams, history } from '@umijs/max';

/**
 * 项目内路由与参数显性注册
 */
export enum WebRouteNameEnum {
  INDEX = '/',
  DEMO_SENTRY = '/demo/sentry',
  DEMO_BUTTON_AUTH = '/demo/button-auth',
  STEP_FORM = '/module-forms/page-step-form',
  PAGE_DETAIL = '/module-details/page-detail',
}

interface WebRouteParams {
  empty?: string;
}

type WebRoute =
  | {
      name: WebRouteNameEnum.DEMO_SENTRY;
      params: {
        sentryToken: string;
      } & WebRouteParams;
    }
  | {
      name: WebRouteNameEnum.DEMO_BUTTON_AUTH;
      params?: {
        authCode?: number;
      } & WebRouteParams;
    }
  | {
      name: WebRouteNameEnum.STEP_FORM;
      params?: WebRouteParams;
    }
  | {
      name: WebRouteNameEnum.PAGE_DETAIL;
      params?: WebRouteParams;
    };

/**
 * 项目内路由跳转
 */
export const pushRoute = (route: WebRoute) => {
  history.push({
    pathname: route.name,
    search: createSearchParams(route.params as Record<string, string>).toString(),
  });
};
