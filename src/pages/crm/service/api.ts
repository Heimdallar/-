import { IBrandListParams } from '@/entities/interface';
import { BaseRequest, BaseResponse, requestApi } from '@/utils/request';

interface IMenuInfo {
  checked: boolean;
  elementName: string;
  elementUrl: string;
}
/** 退出 */
export const logoutInterface = (params?: BaseRequest) =>
  requestApi<BaseResponse>('/cas/auth/logout', params);

/** 获取用户信息 */
export const getUserInfoInterface = (params?: BaseRequest) =>
  requestApi<{
    /** id */
    id: number;
    /** username */
    username: string;
    /** 手机号 */
    mobile: string;
    /** 真实姓名 */
    realname: string;
  }>('/luna/user/getLoginUser', params, 'GET');

/** 菜单 */
interface Menu {
  id: number;
  backstageId: number;
  /** 路径 */
  menuUrl: string;
  /** 菜单名称 */
  menuName: string;
  /** icon */
  menuLogo: string;
  /** 子菜单 */
  children: Menu[];
  /** 开启 */
  enable: boolean;
}

export const getMenuListInterface = (params: { tenantId: number; backstageCode: string }) =>
  requestApi<Menu[]>('/luna/menu/list', params, 'GET');

export const getMenuAuthListInterface = (params: { menuId: number; backstageId: number }) =>
  requestApi<IMenuInfo[]>('/luna/element/list', params, 'GET');

export const getBrandByName = (queryParams: IBrandListParams) => {
  return requestApi('/commodity-admin/admin/brand/page-list', { ...queryParams }, 'POST');
};
