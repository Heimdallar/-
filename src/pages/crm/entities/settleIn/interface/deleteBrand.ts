export interface DeleteBrandReq {
    /**
     * 招商品牌库主键id
     */
    id: number;
}

/**
 * Result<Boolean>
 */
export interface DeleteRes {
    code?: number;
    data?: boolean;
    domain?: string;
    errors?: Error[];
    msg?: string;
}

export interface Error {
    message?: string;
    name?: string;
}
