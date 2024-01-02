import packageJSON from '../package.json';

/** process env define */
const pEnv = process.env || {};

/** 环境枚举 */
type RuntimeEnvTypes = 'dev' | 'd1' | 't0' | 't1' | 't2' | 'pre' | 'prod';

/** 返回业务环境 */
const getRuntimeEnv = (): RuntimeEnvTypes => {
  const hostname = window.location.hostname.toLowerCase();
  const port = Number(window.location.port);

  // 开发模式
  if (port && ![80, 443].includes(port)) {
    return 'dev';
  }

  const hostnameMatch = hostname.match(/(([a-z]+\d+)|(pre))-/);
  if (hostnameMatch) {
    return hostnameMatch[1] as RuntimeEnvTypes;
  }

  return 'prod';
};

/** 返回部署环境 */
const getBuildEnv = (): string => {
  return pEnv.BUILD_ENV || 'prod';
};

/** 应用版本号 */
const projectVersion = packageJSON.version;

const isDev = pEnv.NODE_ENV === 'development';
const backstageCode = pEnv.BACK_STAGE_CODE || '';
const envKey = `${backstageCode}_ENV`;
const ENV = localStorage.getItem(envKey) || 't1'; // 开发环境变量

/** 项目配置 */
export const config = {
  /** 环境配置项 */
  processEnv: pEnv,

  /** 是否开发模式 */
  isDev,

  /** 业务环境 */
  runtimeEnv: getRuntimeEnv(),

  /** 部署环境 */
  buildEnv: getBuildEnv(),

  /** 项目名称 */
  title: pEnv.TITLE || '标题',

  /** 天网权限名称 */
  backstageCode,

  /** 菜单与用户信息缓存时间 - 毫秒 */
  globalInfoCacheMillisecond: 1000 * 60 * 5,

  /** 应用版本号 */
  projectVersion,

  /** 当前环境 */
  devEnv: ENV,

  /** accessToken取值 */
  tokenKey: isDev ? `${ENV}_accessToken` : 'accessToken',

  /** 接口请求 Prefix */
  proxyFix: '',
};
