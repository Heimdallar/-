/**
 * Result<PagingObject<UserPermissionDataResponse>>
 */
export interface PageRes {
  code?: number;
  data?: Data;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Data {
  contents?: Content[];
  extra?: Extra;
  pageNum?: number;
  pages?: number;
  pageSize?: number;
  total?: number;
}

export interface Content {
  /**
   * 类目列表
   */
  categoryList?: CategoryList[];
  /**
   * ID
   */
  id?: number;
  /**
   * 角色ID
   */
  roleId?: number;
  /**
   * 角色名称
   */
  roleName?: string;
  /**
   * 服务类型 0-全包型 1-资源型
   */
  serviceType?: number;
  /**
   * 服务商ID
   */
  spId?: number;
  /**
   * 服务商名称
   */
  spName?: string;
  /**
   * 状态 0-停用 1-启用
   */
  status?: number;
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户名称
   */
  userName?: string;
}

export interface CategoryList {
  /**
   * 类目ID
   */
  id?: number;
  /**
   * 类目名称
   */
  name?: string;
}

export interface Extra {
  KEY?: { [key: string]: any };
}

export interface Error {
  message?: string;
  name?: string;
}
