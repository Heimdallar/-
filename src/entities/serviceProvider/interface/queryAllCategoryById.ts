// query params

export interface ListAllCategoryReq {
  /**
   * 用户ID
   */
  userId?: string;
}

/**
 * Result<List<CategoryResp>>
 */
export interface ListAllCategoryRes {
  code?: number;
  data?: Datum[];
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Datum {
  /**
   * 类目ID
   */
  id?: number;
  /**
   * 类目名称
   */
  name?: string;
}

export interface Error {
  message?: string;
  name?: string;
}
