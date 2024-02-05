/**
 * Result<Boolean>
 */
export interface ClueTransferRes {
  code?: number;
  data?: boolean;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Error {
  message?: string;
  name?: string;
}

export interface ClueTransferReq {
  leadsId: number;
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
