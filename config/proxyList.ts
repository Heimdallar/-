const env = 'auth'
export const proxyEnvs =  {
  d1:`https://d1-${env}.shizhuang-inc.net`,
  d2: `https://d2-${env}.shizhuang-inc.net`,
  t0:`https://t0-${env}.shizhuang-inc.net`,
  t1:`https://t1-${env}.shizhuang-inc.net`,
  t2:`https://t2-${env}.shizhuang-inc.net`,
  t3:`https://t3-${env}.shizhuang-inc.net`,
  t4:`https://t4-${env}.shizhuang-inc.net`,
  t5:`https://t5-${env}.shizhuang-inc.net`,
  t99:`https://t99-${env}.shizhuang-inc.net`,
  t620:`https://t1-${env}.shizhuang-inc.net`,
  txx:`https://t1-${env}.shizhuang-inc.net`,
  mf1:`https://t1-${env}.shizhuang-inc.net`,
  mf2:`https://t1-${env}.shizhuang-inc.net`,
  mf3:`https://t1-${env}.shizhuang-inc.net`,
  mf4:`https://t1-${env}.shizhuang-inc.net`,
  mf5:`https://t1-${env}.shizhuang-inc.net`,
  mf6:`https://t1-${env}.shizhuang-inc.net`,
  mf7:`https://t1-${env}.shizhuang-inc.net`,
  mf8:`https://t1-${env}.shizhuang-inc.net`,
  mf9:`https://t1-${env}.shizhuang-inc.net`,
  mf10:`https://t1-${env}.shizhuang-inc.net`,
  imf1:`https://t1-${env}.shizhuang-inc.net`,
  imf2:`https://t1-${env}.shizhuang-inc.net`,
  imf3:`https://t1-${env}.shizhuang-inc.net`,
  id1:`https://t1-${env}.shizhuang-inc.net`,
  'msha-t-sh':`https://t1-${env}.shizhuang-inc.net`,
  'msha-t-hz':`https://t1-${env}.shizhuang-inc.net`,
  'msha-t':`https://t1-${env}.shizhuang-inc.net`,
  shft:`https://shft-asia-${env}.shizhuang-inc.net`,
  shft1:`https://shft1-asia-${env}.shizhuang-inc.net`,
  itxx:`https://i-txx-asia-${env}.shizhuang-inc.net`,
  pre:`https://pre-${env}.shizhuang-inc.com`,
  'pre-asia':`https://pre-asia-${env}.shizhuang-inc.com`,
  prod:`https://${env}.shizhuang-inc.com`,
  asia:`https://asia-${env}.shizhuang-inc.com`,
}

const keyList = Object.keys(proxyEnvs)

const getProxyList = () => {
  const proxyList:any = {}
  keyList.forEach(item => {
    proxyList[`/${item}/api`] = {
      // @ts-ignore
      target: proxyEnvs[item],
      changeOrigin: true,
      pathRewrite: {
        [`^/${item}`]: '',
      },
    }
  })
  return proxyList
}
export const proxyList = getProxyList()

