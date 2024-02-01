import { request } from '@@/plugin-request';
import { config } from '@/defaultSettings';
import type { PromiseType } from './types';

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
 * const apiGetUser = (params: {userid: number}) => request('/api/getuser', params)
 * // return {userid: number}
 * type GetUserParams = InterfaceRequest<typeof apiGetUser>
 */
export type InterfaceRequest<T extends (...args: any) => Promise<unknown>> = Parameters<T>[0];

/**
 * 返回接口的返回类型
 *
 * @example
 * const apiGetUser = (params: {userid: number}) => request<{nickname: string}>('/api/getuser', params)
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