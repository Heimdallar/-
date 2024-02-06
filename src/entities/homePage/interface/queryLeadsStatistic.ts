/**
 * Result<IndexResponse> :Result
 */
export interface StatisticIndexRes {
  code?: number;
  /**
   * IndexResponse
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
 * IndexResponse
 */
export interface Data {
  /**
   * 当前运营，有权限的类目列表 ,SimpleCategoryInfoDto
   */
  categoryInfoList?: CategoryInfoList[];
  /**
   * 查看的模式,,ViewModeEnum[NONE,SINGLE_CATEGORY,MULTI_CATEGORY,code,desc]
   */
  viewMode?: string;
}

/**
 * 当前运营，有权限的类目列表 ,SimpleCategoryInfoDto
 */
export interface CategoryInfoList {
  /**
   * 类目Id
   */
  categoryId?: number;
  /**
   * 类目名称
   */
  categoryName?: string;
  /**
   * 类目等级
   */
  level?: number;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * IndexRequest :IndexRequest
 */
export interface StatisticIndexReq {
  /**
   * 操作人Id
   */
  operatorId?: number;
  /**
   * 操作人名
   */
  operatorName?: string;
}
