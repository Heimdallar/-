/**
 * Result<String>
 */
export interface ClueBatchAllotRes {
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

export interface ClueBatchAllotReq {
  /**
   * 跟进bd
   */
  bindBusinessDeveloper?: string;
  /**
   * 跟进bd
   */
  bindBusinessDeveloperId?: number;
  /**
   * 线索id
   */
  leadsIds: number[];
  /**
   * 操作人名
   */
  operator?: string;
  operatorId?: string;
  /**
   * 优先级
   */
  priority: number;
}
