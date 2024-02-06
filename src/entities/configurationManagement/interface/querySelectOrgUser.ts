/**
 * Result<OrgUserInfoResponse> :Result
 */
export interface OrgSelectOrgUserRes {
  code?: number;
  /**
   * OrgUserInfoResponse
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
 * OrgUserInfoResponse
 */
export interface Data {
  /**
   * 组织ID
   */
  orgId?: number;
  /**
   * 关联用户 ,OrgUser
   */
  orgUsers?: OrgUser[];
  /**
   * 岗位 ,Integer
   */
  roleIds?: number[];
}

/**
 * 关联用户 ,OrgUser
 */
export interface OrgUser {
  /**
   * 用户ID
   */
  userId?: number;
  /**
   * 用户名称
   */
  userName?: string;
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
export interface OrgSelectOrgUserReq {
  orgId: number;
}
