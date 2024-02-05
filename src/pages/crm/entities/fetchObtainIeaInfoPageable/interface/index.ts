/**
 * Result<PageRes<InvitationEnterActivityInfo>> :Result
 */
export interface IeaObtainIeaInfoPageableRes {
  code?: number;
  /**
   * PageRes
   */
  data?: IeaObtainIeaInfoPageableResData;
  domain?: string;
  /**
   * 错误信息 ,Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * PageRes
 */
export interface IeaObtainIeaInfoPageableResData {
  /**
   * T
   */
  datas?: DataElement[];
  page?: number;
  pages?: number;
  pageSize?: number;
  total?: number;
}

/**
 * T
 */
export interface DataElement {
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
   * 资质维度 ,Integer
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
export interface IeaObtainIeaInfoPageableReq {
  activityId?: number;
  /**
   * 活动名字
   */
  activityName?: string;
  /**
   * 活动结束
   */
  endTime?: number | string;
  /**
   * 邀请码有效时段结束
   */
  invitationCodeEndTime?: number | string;
  /**
   * 邀请码有效时段开始
   */
  invitationCodeStartTime?: number | string;
  offset?: number;
  page?: number;
  pageSize?: number;
  /**
   * 活动开始
   */
  startTime?: number | string;
  /**
   * 活动状态 ,Integer
   */
  statuses?: number[];
}

