/**
 * Result<PageRes<IEAOperLog>> :Result
 */
export interface IeaObtainIeaOperLogPageableRes {
    code?: number;
    /**
     * PageRes
     */
    data?:   IeaObtainIeaOperLogPageableResData;
    domain?: string;
    /**
     * 错误信息 ,Error
     */
    errors?: Error[];
    msg?:    string;
}

/**
 * PageRes
 */
export interface IeaObtainIeaOperLogPageableResData {
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
    desc?:   string;
    id?:     number;
    opTime?: number;
    /**
     * 操作时间
     */
    opTimeStr?: string;
    /**
     * 操作人
     */
    opUserInfo?: string;
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
export interface IeaObtainIeaOperLogPageableReq {
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

/**
 * Result<PageRes<IEAOperLog>> :Result
 */
export interface IeaObtainIeaOperLogPageableRes {
    code?: number;
    /**
     * PageRes
     */
    data?:   IeaObtainIeaOperLogPageableResData;
    domain?: string;
    /**
     * 错误信息 ,Error
     */
    errors?: Error[];
    msg?:    string;
}

/**
 * PageRes
 */
export interface IeaObtainIeaOperLogPageableResData {
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
    desc?:   string;
    id?:     number;
    opTime?: number;
    /**
     * 操作时间
     */
    opTimeStr?: string;
    /**
     * 操作人
     */
    opUserInfo?: string;
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
export interface IeaObtainIeaOperLogPageableReq {
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

