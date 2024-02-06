/**
 * Result<Boolean> :Result
 */
export interface IeaAuditRes {
    code?: number;
    /**
     * data
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

/**
 * IEAPageableReq :IEAPageableReq
 */
export interface IeaAuditReq {
    activityId?: number;
    /**
     * 活动名字
     */
    activityName?: string;
    /**
     * 活动结束
     */
    endTime?: number;
    /**
     * 邀请码有效时段结束
     */
    invitationCodeEndTime?: number;
    /**
     * 邀请码有效时段开始
     */
    invitationCodeStartTime?: number;
    offset?:                  number;
    page?:                    number;
    pageSize?:                number;
    /**
     * 活动开始
     */
    startTime?: number;
    /**
     * 活动状态 ,Integer
     */
    statuses?: number[];
}

