// query params

export interface ListCategoryReq {
  spId: string;
}


/**
 * Result<List<CategoryResponse>>
 */
export interface ListCategoryRes {
  code?:   number;
  data?:   Datum[];
  domain?: string;
  errors?: Error[];
  msg?:    string;
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
  name?:    string;
}