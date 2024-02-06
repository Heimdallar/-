/**
 * Result<OrgInfoResponse> :Result
 */
export interface OrgSelectOrgInfoRes {
  code?: number;
  /**
   * OrgInfoResponse
   */
  data?: Data;
  domain?: string;
  /**
   * Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * OrgInfoResponse
 */
export interface Data {
  /**
   * 数据 ,Long
   */
  data?: number[];
  /**
   * 组织ID
   */
  orgId?: number;
  /**
   * 组织名称
   */
  orgName?: string;
  /**
   * 状态
   */
  orgStatus?: number;
  /**
   * 类型
   */
  orgType?: number;
  /**
   * 上一级组织ID
   */
  parentId?: number;
  /**
   * 岗位 ,Integer
   */
  roleIds?: number[];
  /**
   * 服务商ID
   */
  spId?: number;
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户名称
   */
  userName?: string;
  sort?: number;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * OrgIdentityRequest :OrgIdentityRequest
 */
export interface OrgSelectOrgInfoReq {
  orgId: number;
}
