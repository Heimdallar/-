/**
 * CustomerServiceProviderRequest :CustomerServiceProviderRequest
 */
export interface PageReq {
  page?: number;
  pageSize?: number;
  /**
   * 服务商ID
   */
  spId?: number;
  /**
   * 服务商名称
   */
  spName?: string;
  /**
   * 状态：0已退出1经营中
   */
  spStatus?: number;
  /**
   * 服务商类型：0全包型1资源型
   */
  spSubType?: number;
}

/**
 * Result<PagingObject<CustomerServiceProviderResponse>> :Result
 */
export interface PageRes {
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
   * 数据Id集合 ,String
   */
  dataIds?: string[];
  /**
   * 数据名称集合 ,String
   */
  dataNames?: string[];
  /**
   * 生效结束时间
   */
  endEffectiveTime?: string;
  /**
   * 修改时间
   */
  modifyTime?: string;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 服务商ID
   */
  spId?: number;
  /**
   * 服务商名称
   */
  spName?: string;
  /**
   * 状态
   */
  spStatus?: number;
  /**
   * 状态描述
   */
  spStatusDesc?: string;
  /**
   * 类型：0全包型1资源型
   */
  spSubType?: number;
  /**
   * 类型
   */
  spSubTypeDesc?: string;
  /**
   * 生效开始时间
   */
  startEffectiveTime?: string;
  /**
   * 服务商缩写
   */
  spNameAbbr?: string;
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
