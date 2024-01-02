declare module '*.css';
declare module '*.less';
declare module '*.svg';
declare module '*.md';

interface Window {
  DuMonitor: any;
  __POWERED_BY_QIANKUN__: boolean;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any;
  __webpack_public_path__: any;
  multisso: {
    ssoLogout: () => void;
    [key: string]: any;
  };
}
