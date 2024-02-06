/**
 * Result<Void> :Result
 */
export interface OrgAddUpdateOrgUserRes {
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
 * AddOrgUserRequest :AddOrgUserRequest
 */
export interface OrgAddUpdateOrgUserReq {
  /**
   * 组织ID
   */
  orgId: number;
  /**
   * 用户岗位 ,Integer
   */
  roleIds: number[];
  /**
   * 关联用户 ,Long
   */
  userIds: number[];
}
