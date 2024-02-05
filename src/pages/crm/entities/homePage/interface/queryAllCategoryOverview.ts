/**
 * Result<GetOverviewResponse> :Result
 */
export interface ByAllCategoryGetOverviewRes {
  code?: number;
  /**
   * GetOverviewResponse
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
 * GetOverviewResponse
 */
export interface Data {
  /**
   * 【待出价】数量
   */
  waitBiddingTotalAmount?: number;
  /**
   * 【待认领】数量
   */
  waitClaimTotalAmount?: number;
  /**
   * 【待反馈洽谈结果】数量
   */
  waitCommunicatResultTotalAmount?: number;
  /**
   * 【待提交入驻】数量
   */
  waitEntryTotalAmount?: number;
  /**
   * 【待首次沟通】数量
   */
  waitFirstCommunicateTotalAmount?: number;
}

export type OverviewType = Data;

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * GetOverviewRequest :GetOverviewRequest
 */
export interface ByAllCategoryGetOverviewReq {
  /**
   * 操作人Id
   */
  operatorId?: number;
  /**
   * 操作人名
   */
  operatorName?: string;
}
