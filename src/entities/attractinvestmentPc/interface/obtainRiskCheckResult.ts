
export interface PlanObtainRiskCheckResultReq {
    /**
     * (String)
     */
    key: string;
}


/**
 * Result<Boolean> :Result
 */
export interface ObtainRiskCheckResultRes {
    code?: number;
    /**
     * true通过
     */
    data?:   boolean;
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