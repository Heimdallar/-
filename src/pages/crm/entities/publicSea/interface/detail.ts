/**
 * Result<LeadsDetailResponse>
 */
export interface ClueDetailRes {
  code?: number;
  data?: Data;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Data {
  /**
   * 基本信息
   */
  customerSeaResponse?: CustomerSeaResponse;
  /**
   * 入驻情况
   */
  enterpriseEnterInfoResponse?: EnterpriseEnterInfoResponse;
  /**
   * 入驻绑定信息
   */
  entryBindResponse?: EntryBindResponse;
  /**
   * 跟进情况
   */
  followUpInfoResponse?: FollowUpInfoResponse;
  /**
   * 联系人信息
   */
  leadsContactInfoResponseList?: LeadsContactInfoResponseList[];
  /**
   * 品牌外网销售情况
   */
  outSidePlatformInfos?: OutSidePlatformInfo[];
  /**
   * 推荐人信息
   */
  recommenderResponse?: RecommenderResponse;

  leadsDetailOperateResponse?: {
    operates: string[];
  };
}

/**
 * 基本信息
 */
export interface CustomerSeaResponse {
  /**
   * 关联的申请单id
   */
  applyId?: number;
  /**
   * 关联的评审结果。0-"待提交"，10-"待评审"，20-"下次评审"，30-"评审不通过"，40-"评审通过"
   */
  applyStatus?: number;
  /**
   * 诞生年份
   */
  birthYear?: number;
  /**
   * 全链路级别
   */
  brandAuthLinkLevel?: string;
  /**
   * 品牌授权证书
   */
  brandAuths?: string[];
  /**
   * 品牌手册
   */
  brandManual?: string;
  /**
   * 品牌名称
   */
  brandName?: string;
  /**
   * 品牌资质类型
   */
  brandQualificationType?: string;
  /**
   * 品牌资质类型编码
   */
  brandQualificationTypeCode?: number;
  /**
   * 品牌类型
   */
  brandTypeName?: string;
  /**
   * 营业执照
   */
  businessLicense?: string;
  /**
   * 类目风格
   */
  categoryStyle?: string[];
  /**
   * 联系邮箱
   */
  contactEmail?: string;
  /**
   * 联系人手机号码
   */
  contactMobile?: string;
  /**
   * 手机号
   */
  contactMobileNumber?: string;
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
   * 私海id
   */
  customerSeaId?: number;
  /**
   * 私海备注
   */
  customerSeasRemark?: string;
  /**
   * 跟进BD人员
   */
  developer?: string;
  /**
   * 国内外线下店铺情况
   */
  domesticStore?: string;
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 入驻意愿
   */
  entryWilling?: number;
  entryWillingDesc?: string;
  /**
   * 洽谈失败原因
   */
  feedbackTalkFail?: string;
  /**
   * 洽谈失败补充描述
   */
  feedbackTalkFailDesc?: string;
  /**
   * 跟进人
   */
  followerName?: string;
  /**
   * 命中标识
   */
  hitTag?: number;
  hitTagDesc?: string;
  /**
   * 是否是得物热招品牌
   */
  hotBrand?: boolean;
  /**
   * 外网销售情况
   */
  internetSaleInfos?: InternetSaleInfo[];
  /**
   * 招商邀请活动id
   */
  invitationActivityId?: number;
  /**
   * 招商邀请活动邀请码
   */
  invitationCode?: string;
  /**
   * 标签id列表
   */
  labelIds?: number[];
  /**
   * 标签名称列表
   */
  labelNames?: string[];
  /**
   * 线索id
   */
  leadsId?: number;
  /**
   * 线索维护人
   */
  leadsOperator?: string;
  /**
   * 线索类型
   */
  leadsType?: number;
  /**
   * 线索类型
   */
  leadsTypeName?: string;
  /**
   * 剩余处理时效 毫秒
   */
  leftProcessTime?: number;
  /**
   * 剩余处理时效描述
   */
  leftProcessTimeDesc?: string;
  /**
   * 主营类目
   */
  level2Category?: string;
  /**
   * 主营类目id
   */
  level2CategoryId?: number;
  /**
   * 类目名称
   */
  mainCategory?: string;
  /**
   * 类目Id
   */
  mainCategoryId?: number;
  /**
   * 更新时间
   */
  modifyTimeStr?: string;
  /**
   * 投放渠道
   */
  planChannel?: string;
  planChannelDesc?: string;
  /**
   * 投放终端
   */
  planEnd?: string;
  /**
   * 优先级名称
   */
  priorityName?: string;
  /**
   * 资质类型
   */
  qualificationType?: number;
  /**
   * 原因
   */
  reason?: string;
  /**
   * 自荐理由
   */
  selfRecReason?: string;
  /**
   * 渠道名称
   */
  sourceName?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 状态名称
   */
  statusName?: string;
  /**
   * 需求id
   */
  targetId?: number;
  /**
   * 抖音官方账号粉丝数
   */
  tiktokFansNum?: number;
  /**
   * 超时类型 (UNKNOW, NOT_TIMEOUT, TIMEOUT_SOON, TIMEOUT)
   */
  timeout?: number;
  /**
   * 超时描述，未超时、即将超时、已超时
   */
  timeoutDesc?: string;
  /**
   * 是否置顶
   */
  top?: number;
  /**
   * 商标注册证或商标注册受理通知书
   */
  trademarkRegistrationCertificate?: string;
  /**
   * 是否愿意寄样，0-否，1-是
   */
  willingSendSample?: number;
  /**
   * 小红书帖子数
   */
  xiaohongshuPostsNum?: number;
}

export interface InternetSaleInfo {
  /**
   * 年销售额
   */
  annualSales: number;
  /**
   * 店铺商品成交均价
   */
  averagePrice?: string;
  /**
   * 爬取状态
   */
  crawlStatus?: number;
  /**
   * 粉丝数量
   */
  fansNum?: number;
  /**
   * 主营品牌
   */
  mainBrand?: string;
  /**
   * 店铺商品价格带
   */
  priceRange?: string;
  /**
   * 创建雷达任务时间戳（毫秒）
   */
  radarCreateTime?: number;
  /**
   * 店铺id
   */
  radarStoreId?: number;
  /**
   * 店铺近30天销售量
   */
  recentThirtySales?: string;
  /**
   * 店铺近30天销售额
   */
  recentThirtyTurnover?: string;
  /**
   * spu数量
   */
  spuCount?: number;
  /**
   * 商品图册（店铺近30天成交订单数top5商品主图）
   */
  storeCatalogs?: string[];
  /**
   * 店铺渠道 (UNKNOW, NOT_FILL, TMALL, TAOBAO, JD, XIAOHONGSHU, LIFEASE, KAOLA, OFFLINE_STORE,
   * OFFICIAL_WEBSITE, DOUYIN, PINGDUODUO, KUAISHOU, WEIPINHUI, JIYOUJIA, SUNINGYIGOU,
   * WECHATAPP)
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
   * 店铺销售数据来源，0-人工输入，1-雷达获取
   */
  storeSalesSource?: number;
  /**
   * 店铺标签（天猫/淘宝/京东/小红书渠道需要新增该字段，不支持编辑）
   */
  storeTag?: string;
  /**
   * 店铺链接
   */
  storeUrl?: string;
  /**
   * TOP1商品单价
   */
  topOnePrice?: string;
  /**
   * TOP1商品
   */
  topOneProduct?: string;
  /**
   * TOP1商品销售量（近30天）
   */
  topOneSales?: string;
  /**
   * TOP1商品销售额（近30天）
   */
  topOneTurnover?: string;
}

/**
 * 入驻情况
 */
export interface EnterpriseEnterInfoResponse {
  /**
   * 商家类型 1.品牌方 2.经销商 3.市场贸易商 4.扫货商
   */
  brandType?: string;
  /**
   * 负责人姓名 为个人商家时有效
   */
  directorName?: string;
  /**
   * 入驻企业账号
   */
  enterEnterpriseAccount?: string;
  /**
   * 入驻企业法人
   */
  enterEnterpriseLegalName?: string;
  /**
   * 入驻企业名称
   */
  enterEnterpriseName?: string;
  /**
   * 入驻进度id
   */
  enterStatus?: number;
  /**
   * 入驻进度名
   */
  enterStatusName?: string;
  /**
   * 商家id
   */
  merchantId?: number;
  /**
   * 入驻类型 1: 个人商家 2：企业商家
   */
  merchantType?: number;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 卖家昵称 为个人商家时有效
   */
  sellerName?: string;
  /**
   * 用户id
   */
  userId?: number;
}

/**
 * 入驻绑定信息
 */
export interface EntryBindResponse {
  /**
   * 入驻绑定链接
   */
  bindUrl?: string;
  /**
   * 链接是否失效，true表示失效
   */
  bindUrlInvalid?: boolean;
  /**
   * 跟进入驻按钮是否隐藏，true表示隐藏
   */
  hideFollowEntryButton?: boolean;
}

/**
 * 跟进情况
 */
export interface FollowUpInfoResponse {
  /**
   * 跟进BD
   */
  flowBD?: string;
  /**
   * 更新时间
   */
  modifyTimeStr?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 状态名称
   */
  statusName?: string;
  /**
   * 拜访进度
   */
  visitTimes?: string;
}

export interface LeadsContactInfoResponseList {
  /**
   * 联系人邮箱
   */
  contactEmail?: string;
  /**
   * 联系人手机号
   */
  contactMobileNumber?: string;
  /**
   * 联系人姓名
   */
  contactName?: string;
  /**
   * 联系人固定电话
   */
  contactTelephone?: string;
  /**
   * 联系人职位
   */
  contactTitle?: string;
  /**
   * 联系人微信
   */
  contactWechat?: string;
  /**
   * 联系人微博
   */
  contactWeibo?: string;
  /**
   * 手机无效原因
   */
  mobileInvalidReason?: string;
  /**
   * 固定电话无效原因
   */
  telInvalidReason?: string;
}

export interface OutSidePlatformInfo {
  /**
   * 粉丝数量(万)
   */
  fansNum?: number;
  /**
   * 主营品牌
   */
  mainBrand?: string;
  /**
   * 近30天销售额/元
   */
  recentThirtyTurnover?: string;
  /**
   * 店铺渠道
   */
  shopChannel?: string;
  /**
   * 店铺等级
   */
  shopLevel?: string;
  /**
   * 店铺链接
   */
  shopLink?: string;
  /**
   * 店铺名称
   */
  shopName?: string;
  /**
   * 店铺spu数量
   */
  spuCount?: number;
  /**
   * 商品图册
   */
  storeCatalogs?: string[];
  /**
   * 年销售额（亿）
   */
  yearSellerMoney?: number;
}

/**
 * 推荐人信息
 */
export interface RecommenderResponse {
  /**
   * 推荐人身份证号码
   */
  idCard?: string;
  /**
   * 推荐人姓名
   */
  name?: string;
  /**
   * 推荐人手机号码
   */
  phone?: string;
  /**
   * 推荐人企业全称
   */
  recommendEnterpriseName?: string;
  /**
   * 推荐人类型
   */
  type?: number;
}

export interface Error {
  message?: string;
  name?: string;
}

export interface ClueDetailReq {
  leadsId: number;
  fromPage: number;
}
