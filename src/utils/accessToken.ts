import Cookies from 'js-cookie';
import { config } from '@/defaultSettings';

const { tokenKey } = config;
/** 读取token */
export const getAccessToken = (): string => {
  return Cookies.get(tokenKey) || Cookies.get('accessToken') || '';
};

/** 清空token */
export const removeAccessToken = () => {
  Cookies.remove(tokenKey);
};
