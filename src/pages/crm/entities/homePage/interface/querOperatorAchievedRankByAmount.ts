/**
 * Result<PageResponse<QueryAchievedRankByAmountResponse>> :Result
 */
export interface ByOperatorQueryAchievedRankByAmountRes {
  code?: number;
  /**
   * PageResponse
   */
  data?: ByOperatorQueryAchievedRankByAmountResData;
  domain?: string;
  /**
   * Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * PageResponse
 */
export interface ByOperatorQueryAchievedRankByAmountResData {
  /**
   * T
   */
  datas?: DataElement[];
  page?: number;
  pages?: number;
  pageSize?: number;
  total?: number;
}

/**
 * T
 */
export interface DataElement {
  /**
   * 完成情况 ,AchievedInfoDto
   */
  achievedInfo?: AchievedInfo;
  /**
   * 运营信息 ,SimpleOperatorInfoDto
   */
  operatorInfo?: OperatorInfo;
  /**
   * 排名的名次，从1开始
   */
  randIndex?: number;
}

/**
 * 完成情况 ,AchievedInfoDto
 */
export interface AchievedInfo {
  /**
   * 已完成数量
   */
  achievedAmount?: number;
  /**
   * 已完成比例
   */
  achievedRate?: string;
  /**
   * 目标数量
   */
  targetAmount?: number;
}

/**
 * 运营信息 ,SimpleOperatorInfoDto
 */
export interface OperatorInfo {
  /**
   * 操作人Id
   */
  operatorId?: number;
  /**
   * 操作人姓名
   */
  operatorName?: number;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * QueryAchievedRankByAmountRequest :QueryAchievedRankByAmountRequest
 */
export interface ByOperatorQueryAchievedRankByAmountReq {
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
  /**
   * 排序规则 ,OrderingRuleDto
   */
  orderingRule?: OrderingRule;
  /**
   * 页码，从1开始
   */
  page?: number;
  /**
   * 页大小
   */
  pageSize?: number;
}

/**
 * 排序规则 ,OrderingRuleDto
 */
export interface OrderingRule {
  /**
   * 是否按升序
   */
  asc?: boolean;
  /**
   * 排序字段名称
   */
  fieldName?: string;
}
