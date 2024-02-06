/**
 * Result<String>
 */
export interface ClueBatchTransferRes {
  code?: number;
  data?: string;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Error {
  message?: string;
  name?: string;
}

export interface ClueBatchTransferReq {
  leadsIds: number[];
  /**
   * 操作人ID
   */
  operatorId?: number;
  /**
   * 操作人Name
   */
  operatorName?: string;
  /**
   * 跟进者ID
   */
  transfereeId?: number;
  /**
   * 跟进者Name
   */
  transfereeName?: string;
}
