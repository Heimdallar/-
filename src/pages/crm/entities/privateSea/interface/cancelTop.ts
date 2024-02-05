/**
 * Result<Boolean>
 */
export interface ClueCancelTopRes {
    code?:   number;
    data?:   boolean;
    domain?: string;
    errors?: Error[];
    msg?:    string;
}

export interface Error {
    message?: string;
    name?:    string;
}

export interface ClueCancelTopReq {
    leadsId?: number;
}

