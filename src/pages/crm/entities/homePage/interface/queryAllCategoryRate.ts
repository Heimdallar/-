/**
 * Result<GetRateResponse> :Result
 */
export interface ByAllCategoryGetRateRes {
  code?: number;
  /**
   * GetRateResponse
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
 * GetRateResponse
 */
export interface Data {
  /**
   * 已完成数量
   */
  achievedTotalAmount?: number;
  /**
   * 已完成比例
   */
  achievedTotalRate?: string;
  /**
   * 数据更新的时间
   */
  bizDate?: string;
  /**
   * 目标数量
   */
  targetTotalAmount?: number;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * GetRateRequest :GetRateRequest
 */
export interface ByAllCategoryGetRateReq {
  /**
   * 操作人Id
   */
  operatorId?: number;
  /**
   * 操作人名
   */
  operatorName?: string;
}
