/**
 * Result<PagingObject<EntryBrandResponse>> :Result
 */
export interface IncludePredictRes {
  code?: number;
  /**
   * PagingObject
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
 * PagingObject
 */
export interface Data {
  /**
   * T
   */
  contents?: Content[];
  /**
   * (该参数为map)
   */
  extra?: Extra;
  pageNum?: number;
  pages?: number;
  pageSize?: number;
  total?: number;
}

/**
 * T
 */
export interface Content {
  /**
   * 品牌id
   */
  value: number;
  /**
   * 品牌名称
   */
  label: string;
}

/**
 * (该参数为map)
 */
export interface Extra {
  /**
   * String
   */
  mapKey?: { [key: string]: any };
  /**
   * Object
   */
  mapValue?: { [key: string]: any };
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * BrandQueryRequest :BrandQueryRequest
 */
export interface IncludePredictReq {
  /**
   * "是否在交易中显示：0-不显示；1-显示；不传-全部"
   */
  isShow?: number;
  /**
   * 品牌名称，模糊搜索
   */
  name?: string;
  pageNum?: number;
  /**
   * 分页信息,默认查
   */
  pageSize?: number;
}
