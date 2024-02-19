
/**
 * PlanLeadsReq :PlanLeadsReq
 */
export interface PlanSubmitReq {
    /**
     * 是否是补充提交
     */
    append?: boolean;
    /**
     * 品牌id
     */
    brandId?: number;
    /**
     * 品牌名称
     */
    brandName: string;
    /**
     * 联系人手机号
     */
    contactMobileNumber: string;
    /**
     * 联系人姓名
     */
    contactName: string;
    /**
     * 企业名称
     */
    enterpriseName: string;
    /**
     * 主营类目
     */
    mainCategory: string;
    /**
     * 主营类目id
     */
    mainCategoryId: number;
    /**
     * 投放渠道
     */
    planChannel?: string;
    /**
     * 投放终端
     */
    planEnd?: string;
    /**
     * 资质类型
     */
    qualificationType: number;
    /**
     * 自荐理由
     */
    selfRecReason?: string;
    /**
     * 信息来源
     */
    source?: number;
    /**
     * 店铺渠道
     */
    storeChannel?: string;
    /**
     * 店铺月GMV
     */
    storeMonthGmv?: number;
    /**
     * 店铺名称
     */
    storeName?: string;
}


/**
 * Result<PlanSubmitResp> :Result
 */
export interface SubmitRes {
    code?: number;
    /**
     * PlanSubmitResp
     */
    data?:   Data;
    domain?: string;
    /**
     * 错误信息 ,Error
     */
    errors?: Error[];
    msg?:    string;
}

/**
 * PlanSubmitResp
 */
export interface Data {
    channelId?: number;
    hitTag?:    number;
    msg?:       string;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
    message?: string;
    name?:    string;
}