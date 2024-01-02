const getEnv = () => {
  const domain = window.location.origin;
  if (process.env.NODE_ENV === 'development') {
    return 't1';
  }
  const path = domain.split('//')[1];
  const env = path.split('-')[0];
  const dev = ['d1', 'd2', 't0', 't1', 't2', 't99', 't4', 'pre', 't620'];
  if (dev.includes(env)) {
    if (env === 't620') return 't1';
    return env;
  }
  return 'prod';
};

export function getToken() {
  return (window as any)?.multisso?.getTokenValue(getEnv());
}

export function removeToken() {
  return (window as any)?.multisso?.removeToken(getEnv());
}

// export const getSSOUrl = () => {
//   const hostArr = window.location.hostname.split('.');
//   const ssoHost = `sso.${hostArr[hostArr.length - 2]}.${hostArr[hostArr.length - 1]}`;

//   let ssoUrl = `https://${ssoHost}`;
//   const domain = getEnv();
//   if (domain !== 'prod') {
//     ssoUrl = `https://${domain}-${ssoHost}`;
//   }
//   return ssoUrl;
// };

export async function jumpCommonLogin() {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { ssoUrl } = (window as any)?.multisso?.getToken(getEnv());

  window.location.href = `${ssoUrl}?returnUrl=${encodeURIComponent(window.location.href)}`;
}
