/**
 * Result<Boolean>
 */
export interface ClueSetTopRes {
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

export interface ClueSetTopReq {
    leadsId?: number;
}

