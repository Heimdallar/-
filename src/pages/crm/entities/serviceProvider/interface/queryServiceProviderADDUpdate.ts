/**
 * AddOrUpdateServiceProviderRequest :AddOrUpdateServiceProviderRequest
 */
export interface AddOrUpdateReq {
  /**
   * 生效结束时间
   */
  endEffectiveTime: string;
  /**
   * 服务商数据 ,Long
   */
  spData: number[];
  /**
   * 服务商ID
   */
  spId?: number;
  /**
   * 企业名称
   */
  spName: string;
  /**
   * 服务商名称缩写
   */
  spNameAbbr: string;
  /**
   * 服务商类型：0全包型1资源型
   */
  spSubType: number;
  /**
   * 生效开始时间
   */
  startEffectiveTime: string;
}

/**
 * Result<Void> :Result
 */
export interface AddOrUpdateRes {
  code?: number;
  /**
   * Void
   */
  data?: { [key: string]: any };
  domain?: string;
  /**
   * Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}
