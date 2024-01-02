import { AppstoreOutlined, AppstoreAddOutlined, AlipayCircleFilled } from '@ant-design/icons';
import { Detail } from '@poizon-design/icons';
import { MenuDataItem } from './Menu';

export const mock: MenuDataItem[] = [
  {
    icon: <AppstoreAddOutlined />,
    name: '功能演示',
    path: '/demo',
    key: '0',
    enable: true,
    routes: [
      {
        name: '异常上报',
        path: '/demo/sentry',
        key: '1',
        enable: true,
        routes: [],
      },
      {
        enable: true,
        name: '权限控制',
        path: '/demo/button-auth',
        key: '2',
        routes: [],
      },
    ],
  },
  {
    icon: <AppstoreOutlined />,
    name: '列表模块(版)',
    path: '/route',
    key: '3',
    enable: true,
    routes: [
      {
        name: '查询列表',
        path: '/module-tables/page-search-table',
        key: '4',
        enable: true,
        routes: [],
        new: true,
      },
      {
        enable: true,
        name: '卡片列表',
        path: '/module-tables/page-card-table',
        key: '5',
        routes: [],
      },
    ],
  },
  {
    icon: <AlipayCircleFilled />,
    name: '表单模块(版)',
    path: '/module-forms',
    key: '2',
    enable: true,
    routes: [
      {
        name: '分步表单',
        path: '/module-forms/page-step-form',
        key: '1',
        enable: true,
        routes: [],
      },
      {
        name: '弹窗表单',
        path: '/module-forms/page-modal-form',
        key: '1',
        enable: true,
        routes: [],
      },
    ],
  },
  {
    icon: <Detail />,
    name: '详情模块(版)',
    path: '/module-details',
    key: '30',
    enable: true,
    routes: [
      {
        name: '页面详情',
        path: '/module-details/page-detail',
        key: '31',
        enable: true,
        routes: [],
      },
      {
        enable: true,
        name: '弹窗详情',
        path: '/module-details/page-modal-detail',
        key: '32',
        routes: [],
      },
      {
        enable: true,
        name: '抽屉详情',
        path: '/module-details/page-drawer-detail',
        key: '33',
        routes: [],
      },
    ],
  },
];
