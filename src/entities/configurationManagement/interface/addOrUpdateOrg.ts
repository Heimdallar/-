/**
 * Result<Void> :Result
 */
export interface OrgAddOrUpdateRes {
  code?: number;
  /**
   * Void
   */
  data?: { [key: string]: any };
  domain?: string;
  /**
   * Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * AddOrUpdateOrgRequest :AddOrUpdateOrgRequest
 */
export interface OrgAddOrUpdateReq {
  /**
   * 组织数据 ,Long
   */
  data: number[];
  /**
   * 组织ID
   */
  orgId?: number;
  /**
   * 组织名称
   */
  orgName: string;
  /**
   * 部门类型
   */
  orgType: number;
  /**
   * 上一级组织ID
   */
  parentId: number;
  /**
   * 角色ID ,Integer
   */
  roleIds: number[];
  /**
   * 排序
   */
  sort?: number;
  /**
   * 用户ID
   */
  userId: number;
}
