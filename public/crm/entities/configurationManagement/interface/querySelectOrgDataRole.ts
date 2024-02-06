/**
 * Result<SelectOrgDataRoleResponse> :Result
 */
export interface OrgSelectOrgDataRoleRes {
  code?: number;
  /**
   * SelectOrgDataRoleResponse
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
 * SelectOrgDataRoleResponse
 */
export interface Data {
  /**
   * 数据 ,Long
   */
  data?: number[];
  /**
   * 岗位 ,Integer
   */
  roleIds?: number[];
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
export interface OrgSelectOrgDataRoleReq {
  orgId: number;
}
