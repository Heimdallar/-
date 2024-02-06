/**
 * Result<Boolean>
 */
export interface ClueAllotRes {
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

export interface ClueAllotReq {
  /**
   * 跟进bd
   */
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  /**
   * 线索id
   */
  leadsId: number;
  /**
   * 操作人名
   */
  operator?: string;
  operatorId?: string;
  /**
   * 优先级
   */
  priority?: number;
  userId?: number;
}
