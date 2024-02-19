import UmiRequest from '@du/umi-request';
import duTrack from '@du/track';
import { config } from '@/defaultSettings';
import type { PromiseType } from './types';

const { proxyFix } = config;

// 接口请求的相关定义和方法

/** 接口空参数定义 */
export interface BaseRequest {
  _?: unknown;
}

/** 接口空返回定义 */
export interface BaseResponse {
  _?: unknown;
}

/** 修改 */
export type Modify<T, R> = Omit<T, keyof R> & R;

/**
 * 返回接口的入参类型
 *
 * @example
 * const apiGetUser = (params: {userid: number}) => requestApi('/api/getuser', params)
 * // return {userid: number}
 * type GetUserParams = InterfaceRequest<typeof apiGetUser>
 */
export type InterfaceRequest<T extends (...args: any) => Promise<unknown>> = Parameters<T>[0];

/**
 * 返回接口的返回类型
 *
 * @example
 * const apiGetUser = (params: {userid: number}) => requestApi<{nickname: string}>('/api/getuser', params)
 * // return {nickname: string}
 * type GetUserParams = InterfaceReply<typeof apiGetUser>
 */
export type InterfaceReply<T extends (...args: any) => Promise<unknown>> = PromiseType<
  ReturnType<T>
>;

/**
 * 请求接口
 * @param url 接口
 * @param params 参数
 * @returns T
 *
 * @example
 * // 返回某个用户的信息
 * const apiGetUser = (params: {userid: number}) => request<{nickname: string}>('/api/getuser', params)
 */
export const proRequest = <T>(
  url: string,
  params?: unknown,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
) => {
  return request<{ data: T }>(url, {
    method,
    params: params as URLSearchParams,
  }).then(({ data }) => data);
};

/** 返回api接口地址的完整路径 */
export const getApiUrl = (url: string): string => {
  return `${config.proxyFix}${url}`;
};

/**
 * 请求接口
 * @param url 接口
 * @param params 参数
 * @returns T
 *
 * @example
 * // 返回某个用户的信息
 * const apiGetUser = (params: {userid: number}) => requestApi<{nickname: string}>('/api/getuser', params)
 */
export const requestApi = <T>(
  url: string,
  params?: unknown,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST',
  successMsg?: string,
  headers?: Headers,
) => {
  return UmiRequest.request<{ data: T }>({
    url,
    method,
    params: params as URLSearchParams,
    successText: successMsg,
    // @ts-ignore
    headers: {
      ...headers,
      backstageCode: 'crm',
    },
    prefix: proxyFix,
  })
    .then(({ data }) => {
      if (duTrack && typeof duTrack !== 'undefined') {
        duTrack.injectData(url, data);
      }

      return data;
    })
    .catch((error) => error);
};

interface optionsProps {
  method?: string;
  params: URLSearchParams;
  successText?: string;
  headers?: Headers;
}

const newRequestApi = <T>(url: string, options: optionsProps) => {
  return UmiRequest.request<{ data: T }>({
    url,
    prefix: proxyFix,
    // @ts-ignore
    headers: {
      backstageCode: 'crm',
      ...options?.headers,
    },
    ...options,
  })
    .then((res) => res)
    .catch((error) => error);
};

const request = (url: string, options: optionsProps) => {
  options['params'] = {...(options['params'] || {}), noSign:true}
  return newRequestApi(url, options);
};

export default request;
