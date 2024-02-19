
/**
 * PlanLeadsReq :PlanLeadsReq
 */
export interface PlanRiskCheckReq {
    /**
     * 企业名称
     */
    enterpriseName: string;
}



/**
 * Result<String> :Result
 */
export interface RiskCheckRes {
    code?: number;
    /**
     * data
     */
    data?:   string;
    domain?: string;
    /**
     * 错误信息 ,Error
     */
    errors?: Error[];
    msg?:    string;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
    message?: string;
    name?:    string;
}