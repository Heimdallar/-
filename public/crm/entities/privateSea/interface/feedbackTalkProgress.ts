/**
 * Result<String>
 */
export interface ClueFeedbackTalkProgressRes {
    code?:   number;
    data?:   string;
    domain?: string;
    errors?: Error[];
    msg?:    string;
}

export interface Error {
    message?: string;
    name?:    string;
}

export interface ClueFeedbackTalkProgressReq {
    /**
     * 联系邮箱
     */
    contactEmail?: string;
    /**
     * 联系人手机号码
     */
    contactMobile?: string;
    /**
     * 联系人姓名
     */
    contactName?: string;
    /**
     * 联系座机号码
     */
    contactTelephone?: string;
    /**
     * 联系人职位
     */
    contactTitle?: string;
    /**
     * 联系微信号
     */
    contactWechat?: string;
    /**
     * 联系微博
     */
    contactWeibo?: string;
    /**
     * 入驻企业账号
     */
    enterEnterpriseAccount?: string;
    /**
     * 企业名称
     */
    enterpriseName?: string;
    /**
     * BD结果id
     */
    feedBackResultId?: number;
    /**
     * BD结果名
     */
    feedBackResultName?: string;
    /**
     * 标签id列表
     */
    labelIds?: number[];
    leadsId?:  number;
    /**
     * 操作人
     */
    operator?: string;
    /**
     * 唯一中文名称
     */
    operatorChineseName?: string;
    /**
     * 操作人id
     */
    operatorId?: number;
    /**
     * 原因
     */
    reason?: string;
    /**
     * 洽谈失败原因类型
     */
    reasonType?: number;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 恰谈类型 (UNKNOW, WAIT_FINISHED, REVIEWING, REVIEW_NOT_PASS, CENTER_REVIEWING,
     * CENTER_REVIEWING_NOT_PASS, WAIT_LINK, WAIT_RECALL, ENTRY_WILLING_COMMUNICATE,
     * WAIT_DISTRIBUTE, ALREADY_DISTRIBUTE, COMMUNICATE_FAIL, USELESS_LEADS, WAIT_ENTRY,
     * ENTRYING, ENTRY_DONE, ALREADY_BID)
     */
    type?: number;
}

