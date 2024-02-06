/**
 * Result<GetRateResponse> :Result
 */
export interface ByOperatorGetRateRes {
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
export interface ByOperatorGetRateReq {
  /**
   * 指定的类目。可以不传，那么表示有权限的所有类目
   */
  categoryId?: number;
  /**
   * 操作人Id
   */
  operatorId?: number;
  /**
   * 操作人名
   */
  operatorName?: string;
}
