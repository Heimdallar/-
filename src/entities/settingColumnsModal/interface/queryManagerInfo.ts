// query params

export interface QueryManagerInfoReq {
  /**
   * 管理员用户名称
   */
  userName: string;
}

/**
 * Result<ManagerUserInfoResp>
 */
export interface QueryManagerInfoRes {
  code?: number;
  data?: Data;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Data {
  id?: number;
  nickname?: string;
  realname?: string;
  sex?: number;
  username?: string;
}

export interface Error {
  message?: string;
  name?: string;
}
