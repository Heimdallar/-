/**
 * Result<PlanSubmitResp> :Result
 */
export interface ChannelSaveRes {
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
    msg?:       string;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
    message?: string;
    name?:    string;
}

/**
 * PlanChannel :PlanChannel
 */
export interface ChannelSaveReq {
    channel1Code?: string;
    channel1Name?: string;
    channel2Code?: string;
    channel2Name?: string;
    channel3Code?: string;
    channel3Name?: string;
    /**
     * 渠道标识
     */
    channelDesc?: string;
    creatorId?:   number;
    creatorName?: string;
    /**
     * 渠道id
     */
    id?:         number;
    updateTime?: number;
}

