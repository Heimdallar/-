/**
 * Result<List<FollowerInfoDto>> :Result
 */
export interface PlatformManagerQueryRes {
    code?: number;
    /**
     * FollowerInfoDto
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
 * FollowerInfoDto
 */
export interface Datum {
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

/**
 * 错误信息 ,Error
 */
export interface Error {
    message?: string;
    name?:    string;
}

