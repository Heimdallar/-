/**
 * Result<String>
 */
export interface ClueRejectRes {
  code?: number;
  data?: string;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Error {
  message?: string;
  name?: string;
}

export interface ClueRejectReq {
  /**
   * 联系人状态
   */
  contactInfoList?: ContactInfoList[];
  leadsId: number;
  /**
   * 操作人
   */
  operator?: string;
  /**
   * 操作人id
   */
  operatorId?: number;
  /**
   * 原因（下拉框原因）
   */
  reason?: string;
  /**
   * 原因类型（下拉框原因）
   */
  reasonType?: number;
  /**
   * 备注（下图输入框）
   */
  remark?: string;
  /**
   * 拒绝反馈的类型 (UNKNOW, WAIT_FINISHED, REVIEWING, REVIEW_NOT_PASS, CENTER_REVIEWING,
   * CENTER_REVIEWING_NOT_PASS, WAIT_LINK, WAIT_RECALL, ENTRY_WILLING_COMMUNICATE,
   * WAIT_DISTRIBUTE, ALREADY_DISTRIBUTE, COMMUNICATE_FAIL, USELESS_LEADS, WAIT_ENTRY,
   * ENTRYING, ENTRY_DONE, ALREADY_BID)
   */
  type: number;
}

export interface ContactInfoList {
  /**
   * 联系人号码
   */
  contactNumber?: string;
  /**
   * 联系方式是否有效原因
   */
  contactReason?: string;
  /**
   * 联系人手机号状态 (INVALID, VALID, TO_BE_CONFIRM)
   */
  contactStatus?: number;
  /**
   * 联系方式无效原因
   */
  invalidReason?: string;
}
