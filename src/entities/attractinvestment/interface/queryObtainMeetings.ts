/**
 * Result<List<IEAMeetingsResp>> :Result
 */
export interface IeaObtainMeetingsRes {
    code?: number;
    /**
     * IEAMeetingsResp
     */
    data?:   Datum[];
    domain?: string;
    /**
     * 错误信息 ,Error
     */
    errors?: Error[];
    msg?:    string;
}

/**
 * IEAMeetingsResp
 */
export interface Datum {
    /**
     * 时间
     */
    dayStr?: string;
    /**
     * key时间value该时间下的所有会议信息 ,IEAMeetingInfo
     */
    meetings?: Meeting[];
}

/**
 * key时间value该时间下的所有会议信息 ,IEAMeetingInfo
 */
export interface Meeting {
    /**
     * 招商类目
     */
    catesStr?:  string;
    encodedId?: string;
    /**
     * 招商说明
     */
    explain?: string;
    /**
     * 可选主营类目id ,Long
     */
    mainCateIds?: number[];
    /**
     * 大会举办地址
     */
    meetingAddress?: string;
    /**
     * 大会举办结束时间毫秒
     */
    meetingEndTime?: number;
    /**
     * 大会举办开始时间毫秒
     */
    meetingStartTime?: number;
    /**
     * 活动会议状态
     */
    meetingStatusStr?: string;
    /**
     * 活动名称
     */
    name?: string;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
    message?: string;
    name?:    string;
}

