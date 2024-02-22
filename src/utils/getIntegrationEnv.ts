export const getIntegrationEnv = () => {
  let env = 'prd';
  const { host } = window.location || {};
  if (/d\d./.test(host)) {
    env = 'dev';
  }
  if (/dev\./.test(host)) {
    env = 'dev';
  }
  if (/t\d./.test(host)) {
    env = 'test';
  }
  if (host.includes('pre')) {
    env = 'pre';
  }
  return env;
};
