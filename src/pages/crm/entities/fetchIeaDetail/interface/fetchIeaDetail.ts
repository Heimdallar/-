/**
 * Result<InvitationEnterActivityInfo> :Result
 */
export interface IeaDetailRes {
  code?: number;
  /**
   * InvitationEnterActivityInfo
   */
  data?: Data;
  domain?: string;
  /**
   * 错误信息 ,Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * InvitationEnterActivityInfo
 */
export interface Data {
  createTime?: number;
  creatorId?: number;
  creatorName?: string;
  /**
   * 活动描述
   */
  desc?: string;
  /**
   * IEADiscountPoundageInfo
   */
  discountPoundageInfo?: DiscountPoundageInfo;
  encodedId?: string;
  endTime?: number;
  /**
   * 预估参与人数
   */
  estimateUserCount?: number;
  feishuInstanceId?: string;
  /**
   * 举办开始时间
   */
  meetingStartTime?: number;
  /**
   * 举办结束时间
   */
  meetingEndTime?: number;
  /**
   * 举办地址
   */
  meetingAddress?: string;
  id?: number;
  /**
   * 邀请码生效时间结束
   */
  invitationCodeEndTime?: number;
  /**
   * 邀请码生效时间开始
   */
  invitationCodeStartTime?: number;
  modifyTime?: number;
  name?: string;
  /**
   * 招商页面配置,@seeInvitationEnterActivityPage ,InvitationEnterActivityPage
   */
  pageConfig?: PageConfig;
  /**
   * @seePreferentialPolicyEnum
   */
  preferentialPolicy?: number;
  /**
   * 驳回原因
   */
  rejectReason?: string;
  /**
   * 时间戳毫秒
   */
  startTime?: number;
  /**
   * @seeInvitationEnterActivityEnum
   */
  status?: number;
  statusStr?: string;
  spId?: number;
  spName?: string;
  spUserId?: number;
  spUserName?: string;
}

/**
 * IEADiscountPoundageInfo
 */
export interface DiscountPoundageInfo {
  activityId?: number;
  /**
   * 类目维度
   */
  cateLevel?: number;
  /**
   * 折扣
   */
  discount?: number;
  id?: number;
  /**
   * 资质维度,@seeIEAQualificationEnum ,Integer
   */
  qualification?: number[];
}

/**
 * 招商页面配置,@seeInvitationEnterActivityPage ,InvitationEnterActivityPage
 */
export interface PageConfig {
  /**
   * -顶部banner，非必填项，支持上传不超过2M的jpg、png格式的10张图片，尺寸为XY，邀约页面图片轮播顺序按照配置页面上传顺序轮播。 ,String
   */
  bannerImgs?: string[];
  /**
   * -招商说明，非必填项，格式无限制，不超过300字符。
   */
  explain?: string;
  /**
   * -商家需填写内容，下拉多选框，可选择枚举值及格式要求见邀约表字段，默认选中字段必然展示在邀约页面中，邀约页面字段展示顺序按照邀约表字段顺序展示。 ,String
   */
  needFill?: string[];
  /**
   * -页面标题，必填项，格式无限制，不超过50字符
   */
  title?: string;
  /**
   * 商家所选类目信息
   */
  mainCateIds?: number[];
}

/**
 * 错误信息 ,Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * IEAPageableReq :IEAPageableReq
 */
export interface IeaDetailReq {
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
   * 活动结束内部使用
   */
  endTimeDate?: string;
  /**
   * 邀请码有效时段结束
   */
  invitationCodeEndTime?: number;
  /**
   * 邀请码有效时段结束内部使用
   */
  invitationCodeEndTimeDate?: string;
  /**
   * 邀请码有效时段开始
   */
  invitationCodeStartTime?: number;
  /**
   * 邀请码有效时段开始内部使用
   */
  invitationCodeStartTimeDate?: string;
  offset?: number;
  page?: number;
  pageSize?: number;
  /**
   * 活动开始
   */
  startTime?: number;
  /**
   * 活动开始内部使用
   */
  startTimeDate?: string;
  /**
   * 活动状态 ,Integer
   */
  statuses?: number[];
}
