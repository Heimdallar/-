/**
 * Result<IEASubmitResp> :Result
 */
export interface IeaSubmitRes {
  code?: number;
  /**
   * IEASubmitResp
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
 * IEASubmitResp
 */
export interface Data {
  /**
   * 邀请码
   */
  invitationCode?: string;
  /**
   * 邀请码有效时段结束
   */
  invitationCodeEndTime?: number;
  /**
   * 邀请码有效时段开始
   */
  invitationCodeStartTime?: number;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * AddLeadsReq :AddLeadsReq
 */
export interface IeaSubmitReq {
  onSubmit?: (val: IeaSubmitReq) => void
  /**
   * 跟进bd
   */
  bindBusinessDeveloper?: string;
  /**
   * 跟进bd
   */
  bindBusinessDeveloperId?: number;
  /**
   * 诞生年份
   */
  birthYear: number;
  /**
   * 全链路级别
   */
  brandAuthLinkLevel?: string;
  /**
   * 品牌授权书列表 ,String
   */
  brandAuths?: string[];
  /**
   * 品牌id
   */
  brandId: number;
  /**
   * 品牌手册
   */
  brandManual: string;
  /**
   * 品牌名称
   */
  brandName: string;
  /**
   * 品牌类型
   */
  brandType?: number;
  /**
   * 风格 ,String
   */
  categoryStyles?: string[];
  /**
   * 联系人邮箱
   */
  contactEmail: string;
  /**
   * 联系人手机号
   */
  contactMobileNumber: string;
  /**
   * 联系人姓名
   */
  contactName: string;
  /**
   * 联系人固定电话
   */
  contactTelephone?: string;
  /**
   * 联系人职务
   */
  contactTitle?: string;
  /**
   * 联系人微信
   */
  contactWechat: string;
  /**
   * 联系人微博
   */
  contactWeibo?: string;
  creator?: string;
  creatorId?: string;
  /**
   * 国内外线下店铺情况
   */
  domesticStore?: string;
  /**
   * 修改人
   */
  editor?: string;
  /**
   * 企业名称
   */
  enterpriseName: string;
  /**
   * 申请单id
   */
  id?: number;
  /**
   * 招商活动加密后的id
   */
  ieaEncodedId?: string;
  /**
   * 外网销售情况 ,InternetSaleInfoReq
   */
  internetSaleInfoReqs?: InternetSaleInfoReq[];
  /**
   * 招商邀请活动id
   */
  invitationActivityId?: number;
  /**
   * 招商邀请活动邀请码
   */
  invitationCode?: string;
  /**
   * 二级类目名称,todo暂时允许为空兼容前端没有线上的情况
   */
  level2Category?: string;
  /**
   * 二级类目id,todo暂时允许为空兼容前端没有线上的情况
   */
  level2CategoryId?: number;
  /**
   * 营业执照
   */
  license: string;
  /**
   * 主营类目
   */
  mainCategory: string;
  /**
   * 主营类目id
   */
  mainCategoryId: number;
  /**
   * 商家经营类型 1.品牌方 2.经销商 3.市场贸易商 4.扫货商
   */
  manageType: number;
  /**
   * 商家id,可空(入驻可能为空)
   */
  merchantId?: number;
  /**
   * 推荐人信息 ,RecommendInfoReq
   */
  recommendInfoReq?: RecommendInfoReq;
  /**
   * 信息来源
   */
  source?: number;
  /**
   * 状态
   */
  status?: number;
  /**
   * 抖音官方账号粉丝数
   */
  tiktokFansNum: number;
  /**
   * 商标
   */
  trademark: string;
  /**
   * 商家用户id
   */
  userId?: number;
  /**
   * 是否愿意寄样，0-否，1-是
   */
  willingSendSample?: number;
  /**
   * 小红书帖子数
   */
  xiaohongshuPostsNum: number;
  /**
   * 提交来源 h5: 0, stark: 1
   */
  submitFrom?: number
}

/**
 * 外网销售情况 ,InternetSaleInfoReq
 */
export interface InternetSaleInfoReq {
  /**
   * 年销售额
   */
  annualSales: number;
  /**
   * 粉丝数量
   */
  fansNum?: number;
  /**
   * 主营品牌
   */
  mainBrand?: string;
  /**
   * 商品图册 ,String
   */
  storeCatalogs?: string[];
  /**
   * 店铺渠道
   */
  storeChannel: string;
  /**
   * 店铺等级
   */
  storeLevel?: string;
  /**
   * 店铺名称
   */
  storeName: string;
  /**
   * 店铺链接
   */
  storeUrl?: string;
}

/**
 * 推荐人信息 ,RecommendInfoReq
 */
export interface RecommendInfoReq {
  /**
   * 推荐人身份证号码
   */
  idCard: string;
  /**
   * 推荐人姓名
   */
  name: string;
  /**
   * 推荐人手机号码
   */
  phone: string;
  /**
   * 推荐人企业全称
   */
  recommendEnterpriseName: string;
  /**
   * 推荐人类型
   */
  type?: number;
}

