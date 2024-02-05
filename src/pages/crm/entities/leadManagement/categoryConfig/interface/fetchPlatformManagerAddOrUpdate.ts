/**
 * Result<Boolean> :Result
 */
export interface PlatformManagerAddOrUpdateRes {
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
 * CenterAuditAddOrUpdateRequest :CenterAuditAddOrUpdateRequest
 */
export interface PlatformManagerAddOrUpdateReq {
    /**
     * 运营列表 ,FollowerInfoDto
     */
    followerInfoList?: FollowerInfoList[];
}

/**
 * 运营列表 ,FollowerInfoDto
 */
export interface FollowerInfoList {
    /**
     * 创建人
     */
    creator?: string;
    /**
     * 修改人
     */
    editor?: string;
    /**
     * 操作者userId
     */
    followerId?: number;
    /**
     * 操作者用户名
     */
    followerName?: string;
    /**
     * 修改时间
     */
    modifyTime?: string;
}

