import { ESMWebpackPlugin, getUmiPlugin } from '@monorepo/esm-plugin';
import path from 'path';
import dotenv from 'dotenv';
import { pick } from 'lodash';
import { defineConfig } from '@umijs/max';

const pEnv = process.env || {};

const rootPath = path.join(__dirname, '../');
dotenv.config({
  path: path.resolve(rootPath, `.env${pEnv.BUILD_ENV ? '.' + pEnv.BUILD_ENV : ''}`),
  override: true,
});

/**
 * umi配置项
 * 请参照：https://umijs.org/zh-CN/config
 */
export default defineConfig({
  devtool: 'eval',
  base: pEnv?.BASE || '/',
  deadCode: {},
  crossorigin: {},
  lessLoader: {
    modifyVars: {
      '@ant-prefix': 'pd',
    },
  },
  // 用于提供给代码中可用的变量
  define: {
    'process.env': pick(pEnv, [
      'BUILD_ENV',
      'NODE_ENV',
      'TITLE',
      'BACK_STAGE_CODE',
      'PROXY_API_URL',
    ]),
  },
  // babel插件
  extraBabelPlugins: [
    // xss
    'module:@dusec/babel-sec-plugin',
  ],
  favicons: ['/favicon.ico'],
  // 热更
  fastRefresh: true,
  hash: true,
  // 额外脚本
  headScripts: [
    // xss
    'https://dw-sec.oss-cn-shanghai.aliyuncs.com/xss/xss.config.js',
  ],
  ignoreMomentLocale: true,
  inlineLimit: 1000,
  mfsu: false,
  // mfsu: {
  //   exclude: [/^@monorepo\/.*/],
  // },
  proxy: {
    '/api': {
      target: 'https://t1-auth.shizhuang-inc.net',
      changeOrigin: true,
      onProxyRes: (proxyRes, req) => {
        const { protocol, port, host } = proxyRes.req;
        proxyRes.headers['x-real-url'] = `${protocol}${port ? `:${port}` : ''}//${host}${req.url}`;
      },
    },
  },
  title: pEnv.TITLE,
  presets: ['@umijs/preset-pro'],
  sso: {}, // 对外的站点可以用 false 关闭
  tailwindcss: {},
  model: {},
  pd: {
    disableBabelPluginImport: true,
    // configProvider: {
    //   prefixCls: 'pd',
    // },
  },
  theme: { '@ant-prefix': 'pd', '@page-header-tabs-tab-font-size': '14px' },
  conventionRoutes: {
    // 约定式路由配置：https://umijs.org/docs/api/config#conventionroutes
    exclude: [
      /\/components\//,
      /\/hooks\//,
      /\/service\//,
      /\/models\//,
      /constant/,
      /store/,
      /entity/,
    ],
  },
  request: {},
  plugins: ['@umijs/plugin-open-browser', '@umijs/plugin-pro-cacher', getUmiPlugin(), path.join(__dirname, '../generator/page')],
  chainWebpack(config) {
    // 这里引入 webpack 插件
    config.plugin('esm').use(new ESMWebpackPlugin({}));
  },
  open: {}
});
