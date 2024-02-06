/**
 * Result<PageResponse<QueryAchievedRankByRateResponse>> :Result
 */
export interface ByAllCategoryQueryAchievedRankByRateRes {
  code?: number;
  /**
   * PageResponse
   */
  data?: ByAllCategoryQueryAchievedRankByRateResData;
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
export interface ByAllCategoryQueryAchievedRankByRateResData {
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
   * 类目信息 ,SimpleCategoryInfoDto
   */
  categoryInfo?: CategoryInfo;
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
 * 类目信息 ,SimpleCategoryInfoDto
 */
export interface CategoryInfo {
  /**
   * 类目Id
   */
  categoryId?: number;
  /**
   * 类目名称
   */
  categoryName?: string;
  /**
   * 类目等级
   */
  level?: number;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * QueryAchievedRankByRateRequest :QueryAchievedRankByRateRequest
 */
export interface ByAllCategoryQueryAchievedRankByRateReq {
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
