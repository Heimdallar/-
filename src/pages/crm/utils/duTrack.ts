import duTrack from '@du/track';
import { getUserInfoInterface } from '@/service/api';
import { getEnv } from './common';

export const initMfDutrack = (userInfo: Partial<InterfaceReply<typeof getUserInfoInterface>>) => {
  // 登录态：获取用户信息
  const { id, username } = userInfo || {};
  const seesionId = `${new Date().getTime() * Math.floor(Math.random() * 100000)}anonymous`;
  const exactEnv = getEnv();
  const isDevelopmentEnv = exactEnv !== 'prod';
  try {
    if (!duTrack || typeof duTrack === undefined) return;
    duTrack.init({
      backstageCode: 'crm',
      userId: id ?? seesionId ?? '',
      userName: username,
      excludeEle: '.ant-pro-sider-layout-mix, .ant-pro-fixed-header-action',
      env: !isDevelopmentEnv ? 'production' : 'development',
      projectId: 9,
      exactEnv,
      extra: JSON.stringify({}),
    });
    duTrack.autoVClickTrack();
  } catch (error) {
    console.error('dutrack init', error);
    // 未登录状态：初始化用户信息为-1
    duTrack.init({
      backstageCode: 'crm',
      env: !isDevelopmentEnv ? 'production' : 'development',
      projectId: 9,
      excludeEle: '.ant-pro-sider-layout-mix, .ant-pro-fixed-header-action',
      exactEnv,
      userId: id ?? seesionId ?? '',
      userName: '用户未登录',
      extra: JSON.stringify({}),
    });
  }
};
