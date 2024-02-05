/**
 * Result<String>
 */
export interface ClueAddLabelRes {
    code?:   number;
    data?:   string;
    domain?: string;
    errors?: Error[];
    msg?:    string;
}

export interface Error {
    message?: string;
    name?:    string;
}

export interface ClueAddLabelReq {
    /**
     * 标签
     */
    labelDesc?: string;
    /**
     * 线索ID
     */
    leadsId?: number;
    /**
     * 操作人
     */
    operator?: string;
    /**
     * 操作人id
     */
    operatorId?: number;
}

