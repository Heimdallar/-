
/**
 * Result<PageResponse<LeadsLogResponse>> :Result
 */
export interface LogRes {
    code?: number;
    /**
     * PageResponse
     */
    data?:   LogResData;
    domain?: string;
    /**
     * 错误信息 ,Error
     */
    errors?: Error[];
    msg?:    string;
}

/**
 * PageResponse
 */
export interface LogResData {
    /**
     * T
     */
    datas?:    DataElement[];
    page?:     number;
    pages?:    number;
    pageSize?: number;
    total?:    number;
}

/**
 * T
 */
export interface DataElement {
    /**
     * 操作描述
     */
    operateDesc?: string;
    /**
     * 操作人角色
     */
    operateRole?: string;
    /**
     * 操作时间
     */
    operateTime?: string;
    /**
     * 操作类型
     */
    operateType?: string;
    /**
     * 操作人
     */
    operator?: string;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
    message?: string;
    name?:    string;
}
