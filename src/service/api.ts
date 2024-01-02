import { request } from '@umijs/max';
import { BaseRequest } from '@/utils/request';

/** 获取用户信息 */
export const getUserInfoInterface = (params?: BaseRequest) =>
  request('/api/v1/h5/luna/user/getLoginUser', { params });

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

/** 获取菜单列表 */
export const getMenuListInterface = (params: { tenantId: number; backstageCode: string }) =>
  request<Menu[]>('/api/v1/h5/luna/menu/list', { params });

/** 获取菜单功能权限 */
export const getMenuAuthListInterface = (params: { menuId: number; backstageId: number }) =>
  request<
    {
      checked: boolean;
      elementName: string;
      elementUrl: string;
    }[]
  >('/api/v1/h5/luna/element/list', { params });
