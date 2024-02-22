import { getIntegrationEnv } from "./getIntegrationEnv";

export const initEEIntegration = (_userId: string, _userName: string) => {
  const env = getIntegrationEnv();
  window?.DuEEIntegration?.init?.({
    env, // 选填，默认prd （dev，test, pre，prd）
    userId: _userId, // 需要业务方传入
    userName: _userName,
    product: '商家招商系统',
    productName: '商家招商系统',
    appKey: 'd838252505f54ec572b48a717fb5eba5c9e08fd8',
  });
};

export const enum platformEventsEnums {
  collect_questionaires = 'crm_collect_questionaires',
}

export const relativeQuestionairePages = [
  '/leadManagement/publicSea',
  '/leadManagement/privateSea',
  '/settleIn/applyManagement',
];
