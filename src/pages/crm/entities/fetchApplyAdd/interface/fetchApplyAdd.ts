/**
 * Result<Boolean> :Result
 */
export interface ApplyAddRes {
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
 * AddBrandApplyInfoRequest :AddBrandApplyInfoRequest
 */
export interface ApplyAddReq {
    /**
     * 线上线下销售规模（年度）(亿)
     */
    annualSaleScale?: number;
    /**
     * 品牌别名
     */
    brandAlias?: string;
    /**
     * 品牌中文名
     */
    brandChineseName?: string;
    /**
     * 大类
     */
    brandClasses: string;
    /**
     * 品牌国别
     */
    brandCountry?: string;
    /**
     * 品牌中英文，0代表中文名 1代表英文名 2代表全都选
     */
    brandCountryFlag: number;
    /**
     * 品牌英文名
     */
    brandEnglishName?: string;
    /**
     * 品牌id
     */
    brandId?: number;
    /**
     * 品牌分层自评（A:1,B:2,C:3,D:4,E:5）
     */
    brandLayerSelfEvaluation: number;
    /**
     * 品牌LOGO
     */
    brandLogo: string;
    /**
     * 品牌名称
     */
    brandName: string;
    /**
     * 品牌优先级，0：P0，1：P1，2：P2，3：P3，4：P4，5：P5
     */
    brandPriority: number;
    /**
     * 品牌主体权益
     */
    brandRightSubject?: string;
    /**
     * 品牌故事
     */
    brandStory: string;
    /**
     * 品牌风格
     */
    brandStyle: string;
    /**
     *
     * 品牌标签，0-海外进口品牌、1-国内新锐品牌、2-国内供应链品牌,BrandTagEnum[OUTER_SEA_BRAND,DOMESTIC_NEW_BRAND,DOMESTIC_SUPPLY_CHAIN_BRAND,code,desc]
     */
    brandTag?: number;
    /**
     * 品牌类型
     */
    brandType?: number;
    /**
     * 品牌分层满足规则描述
     */
    brandValueDesc?: string;
    /**
     * 承诺函证明特批截图图片格式，上限2张 ,String
     */
    commitmentProofList?: string[];
    /**
     * 社区每月seeding数量
     */
    communitySeedingNum?: number;
    /**
     * 国家编码
     */
    countryCode?: string;
    /**
     * 品牌国别选项，0-国内 1-国际
     */
    countryFlag: number;
    creator?:    string;
    creatorId?:  string;
    /**
     * 日销价格指数
     */
    dailyPriceIndex?: string;
    /**
     * 得物帖子数量
     */
    dewuPostsNum?: number;
    /**
     * 企业名称
     */
    enterpriseName?: string;
    /**
     * 预计到达规定价格指数时间
     */
    estimatePriceArriveTime?: number;
    /**
     * 预计到达销售额时间
     */
    estimateSaleArriveTime?: number;
    /**
     * 固定费用
     */
    fixedCost?: number;
    /**
     * String
     */
    foreignCommitmentProofList?: string[];
    /**
     * 商标注册状态（枚举值3个（R标、TM标、未注册））,仅落库商标状态为【R标】的商标注册证及专用权期限，其他商标状态仅在飞书流展示，不落库,（1-TM标；2-R标；3-未注册）
     */
    foreignRegisterStatus?: number;
    /**
     * String
     */
    foreignRelationshipProofList?: string[];
    foreignTrademarkEndTime?:      string;
    /**
     * 英文注册商标 ,String
     */
    foreignTrademarkList?: string[];
    /**
     * 商标注册证开始时间-结束时间
     */
    foreignTrademarkStartTime?: string;
    /**
     * 包邮商品比例
     */
    freeFreightGoodsPercent?: string;
    /**
     * 每月引力平台投入预算金额
     */
    gravityBudgetAmount?: number;
    /**
     * 每月站内社区投入预算金额
     */
    insideBudgetAmount?: number;
    /**
     * 每月站内社区投入预算金额比例
     */
    insideBudgetAmountPercent?: string;
    /**
     * 外网销售情况 ,InternetSaleInfo
     */
    internetSaleInfos?: InternetSaleInfo[];
    /**
     * 是否奢品
     */
    isLuxury?: number;
    /**
     * 是否纯新品牌
     */
    isNewBrand?: number;
    /**
     * 是否可在社媒每月导流
     */
    isSocialMediaDiversion?: number;
    /**
     * 是否供给明确
     */
    isSupplyClear?: number;
    /**
     * 品牌分层满足规则,图片格式，上限3张 ,String
     */
    layerRuleList?: string[];
    /**
     * 铺设商品比例
     */
    layGoodsPercent?: string;
    /**
     * 线索id
     */
    leadsId?: number;
    /**
     * 符合奢侈品的具体原因
     */
    luxuryReason?: string;
    /**
     * 奢侈品风格
     */
    luxuryStyle?: number;
    /**
     * 主营类目
     */
    mainCategory: string;
    /**
     * 主营类目id
     */
    mainCategoryId: number;
    /**
     * 淘宝（含天猫）月销量(件)
     */
    monthlySaleAmount?: number;
    /**
     * 月销售额/万
     */
    monthlySales?: number;
    /**
     * 国内外官方线下店铺数量(个)
     */
    offlineStoreAmount?: number;
    /**
     * 是否一品多商，0-否，1-是
     */
    oneProductMultiMerchant: number;
    /**
     * 每月外投预算金额
     */
    outsideBudgetAmount?: number;
    /**
     * 每月外投预算金额比例
     */
    outsideBudgetAmountPercent?: string;
    /**
     * 件单价
     */
    price?: number;
    /**
     * 价格促销指数
     */
    pricePromotionIndex?: string;
    /**
     * 资质类型,
     * 1-品牌方，2-一级经销商（有得物授权），3-一级经销商（无得物授权），4-二级经销商（有得物授权），5-二级经销商（无得物授权），6-三级以上经销商（有得物授权），7-三级以上经销商（无得物授权），8-市场贸易商，9-扫货商，0-无。
     * {@link
     * QualificationTypeEnum},QualificationTypeEnum[DEFAULT,BRAND,FIRST_LEVEL_SELLERS_AUTHORIZED,FIRST_LEVEL_SELLERS_UNAUTHORIZED,SECOND_LEVEL_SELLERS_AUTHORIZED,SECOND_LEVEL_SELLERS_UNAUTHORIZED,THIRD_LEVEL_SELLERS_AUTHORIZED,THIRD_LEVEL_SELLERS_UNAUTHORIZED,SERVICE_PROVIDER,SHOPPING,PERSON,PERSON_VIP,code,desc]
     */
    qualificationType?: number;
    /**
     * 商标注册状态（枚举值3个（R标、TM标、未注册））,仅落库商标状态为【R标】的商标注册证及专用权期限，其他商标状态仅在飞书流展示，不落库,（1-TM标；2-R标；3-未注册）
     */
    registerStatus?: number;
    /**
     * 品牌方关系证明图片格式，上限2张 ,String
     */
    relationshipProofList?: string[];
    /**
     * 服务费率
     */
    serviceRate?: string;
    /**
     * 上新spu
     */
    spuNum?: number;
    /**
     * 状态
     */
    status: number;
    /**
     * 供给模式
     */
    supplyMode?: number;
    /**
     * 淘数据GMV
     */
    taoDataGmv?: number;
    /**
     * 淘宝天猫粉丝数(万)
     */
    tianMaoFans?: number;
    /**
     * 抖音粉丝数（万）
     */
    tiktokFans?: number;
    /**
     * 抖音视频点赞数
     */
    tiktokVideoLikeNum?: number;
    /**
     * 抖音视频数
     */
    tiktokVideoNum?:   number;
    trademarkEndTime?: string;
    /**
     * 商标注册证 ,String
     */
    trademarkList: string[];
    /**
     * 商标注册证开始时间-结束时间
     */
    trademarkStartTime?: string;
    /**
     * 微博粉丝数（万）
     */
    weiboFans?: number;
    /**
     * 小红书帖子数量
     */
    xiaohongshuPostsNum?: number;
}

/**
 * 外网销售情况 ,InternetSaleInfo
 */
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
     * 商品图册（店铺近30天成交订单数top5商品主图） ,String
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

