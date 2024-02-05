import { config } from '@/defaultSettings';

/** 返回开发代理api地址的业务环境 */
export const getProxyApiEnv = () => {
  let ret = 'd1';

  // 开发环境的token，跟着proxy target判断
  const apiProxy = config.processEnv.PROXY_API_URL?.toLowerCase() || '';

  const hostnameMatch = apiProxy.match(/(([a-z]+\d+)|(pre))-/);
  if (hostnameMatch) {
    [, ret] = hostnameMatch;
  }

  return ret;
};
