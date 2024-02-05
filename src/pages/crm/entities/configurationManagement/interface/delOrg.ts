/**
 * Result<Void> :Result
 */
export interface OrgDelOrgRes {
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
 * OrgIdentityRequest :OrgIdentityRequest
 */
export interface OrgDelOrgReq {
  orgId: number;
}
