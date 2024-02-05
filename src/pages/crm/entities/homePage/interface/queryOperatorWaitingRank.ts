/**
 * Result<PageResponse<QueryWaitingRankResponse>> :Result
 */
export interface ByOperatorQueryWaitingRankRes {
  code?: number;
  /**
   * PageResponse
   */
  data?: ByOperatorQueryWaitingRankResData;
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
export interface ByOperatorQueryWaitingRankResData {
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
   * 运营信息 ,SimpleOperatorInfoDto
   */
  operatorInfo?: OperatorInfo;
  /**
   * 排名数据 ,LeadsRankDataDto
   */
  rankData?: RankData;
  /**
   * 排名的名次，从1开始
   */
  rankIndex?: number;
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
 * 排名数据 ,LeadsRankDataDto
 */
export interface RankData {
  /**
   * 【待出价】数量
   */
  waitBiddingAmount?: number;
  /**
   * 【待出价，已超时】数量
   */
  waitBiddingTimeoutAmount?: number;
  /**
   * 【待认领】数量
   */
  waitClaimAmount?: number;
  /**
   * 【待认领，已超时】数量
   */
  waitClaimTimeoutAmount?: number;
  /**
   * 【待反馈洽谈结果】数量
   */
  waitCommunicatResultAmount?: number;
  /**
   * 【待反馈洽谈结果，已超时】数量
   */
  waitCommunicatResultTimeoutAmount?: number;
  /**
   * 【待提交入驻】数量
   */
  waitEntryAmount?: number;
  /**
   * 【待提交入驻，已超时】数量
   */
  waitEntryTimeoutAmount?: number;
  /**
   * 【待首次沟通】数量
   */
  waitFirstCommunicateAmount?: number;
  /**
   * 【待首次沟通，已超时】数量
   */
  waitFirstCommunicateTimeoutAmount?: number;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * QueryWaitingRankRequest :QueryWaitingRankRequest
 */
export interface ByOperatorQueryWaitingRankReq {
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
