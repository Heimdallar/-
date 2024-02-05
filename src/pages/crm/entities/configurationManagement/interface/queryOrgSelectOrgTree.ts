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
export interface Data {
  /**
   * 组织ID
   */
  orgId: number;

  orgName: string;
  spId: number[];
  parentId: number;
  orgType: number;
  sort: number;
  creator: string;
  operator: string;
  createTime: string;
  childrens?: Data[];
}
