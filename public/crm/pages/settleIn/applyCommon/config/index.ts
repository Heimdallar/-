import moment from "moment";

export const regStatusMap = {
  TM标: 1,
  R标: 2,
  未注册: 3,
};

// 供给模式
export const REG_STATUS = [
  {
    label: 'TM标',
    value: 1,
  },
  {
    label: 'R标',
    value: 2,
  },
  {
    label: '未注册',
    value: 3,
  },
];

export const passNopassOptions = [
  {
    label: '评审不通过',
    value: 30,
  },
  {
    label: '评审通过',
    value: 40,
  },
];

export const TABS_CONFIG = [
  {
    key: '1',
    tab: '待提交',
    status: [0],
  },
  {
    key: '2',
    tab: '待处理',
    status: [10],
  },
  {
    key: '3',
    tab: '已处理',
    status: [20, 30, 40],
  },
  {
    key: '4',
    tab: '全部',
    status: [],
  },
];

export const TABS_CONFIG_REVIEW = [
  {
    key: '2',
    tab: '待处理',
    status: [10],
  },
  {
    key: '3',
    tab: '已处理',
    status: [20, 30, 40],
  },
  {
    key: '4',
    tab: '全部',
    status: [],
  },
];

export const APPROVAL_STATUS = [
  {
    label: '待提交',
    value: 0,
  },
  {
    label: '待评审',
    value: 10,
  },
  // {
  //   label: '下次评审',
  //   value: 20,
  // },
  {
    label: '评审不通过',
    value: 30,
  },
  {
    label: '评审通过',
    value: 40,
  },
];

export const BRAND_TYPES = [
  {
    label: '线上线下均无渠道',
    value: 0,
  },
  {
    label: '纯线上',
    value: 1,
  },
  {
    label: '纯线下',
    value: 2,
  },
  {
    label: '全渠道',
    value: 3,
  },
];

export const BRAND_TYPES_MAP = BRAND_TYPES.reduce((s: any, c) => {
  s[c.value] = c.label;
  return s;
}, {});

export const QUALIFICATION_TYPE = [
  {
    label: '品牌方',
    value: 1,
  },
  {
    label: '一级经销商（有得物授权）',
    value: 2,
  },
  {
    label: '一级经销商（无得物授权）',
    value: 3,
  },
  {
    label: '二级经销商（有得物授权）',
    value: 4,
  },
  {
    label: '二级经销商（无得物授权）',
    value: 5,
  },
  {
    label: '三级以上经销商（有得物授权）',
    value: 6,
  },
  {
    label: '三级以上经销商（无得物授权）',
    value: 7,
  },
  {
    label: '市场贸易商',
    value: 8,
  },
  {
    label: '扫货商',
    value: 9,
  },
  {
    label: '个人卖家',
    value: 10,
  },
  {
    label: '个人VIP',
    value: 11,
  },
  {
    label: '无',
    value: 0,
  },
];

export const QUALIFICATION_TYPE_MAP = QUALIFICATION_TYPE.reduce((s: any, c) => {
  s[c.value] = c.label;
  return s;
}, {});

export const BRAND_LAYER_SELFE_VALUATION_TYPES = [
  { label: 'A', value: 1 },
  { label: 'B', value: 2 },
  { label: 'C', value: 3 },
  { label: 'D', value: 4 },
  { label: 'E', value: 5 },
];

export const BRAND_LAYER_SELFE_VALUATION_TYPES_MAP = BRAND_LAYER_SELFE_VALUATION_TYPES.reduce(
  (s: any, c) => {
    s[c.value] = c.label;
    return s;
  },
  {},
);

export const TABS_MAP_CONFIG = TABS_CONFIG.reduce((s: any, c) => {
  s[c.key] = c;
  return s;
}, {});
export const TABS_MAP_CONFIG_REVIEW = TABS_CONFIG_REVIEW.reduce((s: any, c) => {
  s[c.key] = c;
  return s;
}, {});

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const todayStr = moment().startOf('day');

// 品牌优先级
export const BRAND_PRIORITY_TYPES = [
  { label: 'P0', value: 0 },
  { label: 'P1', value: 1 },
  { label: 'P2', value: 2 },
  { label: 'P3', value: 3 },
  { label: 'P4', value: 4 },
  { label: 'P5', value: 5 },
];

export const countryMap = {
  国内: 0,
  国际: 1,
};

export const brandCountryMap = {
  中文: 0,
  英文: 1,
  中英文: 2,
};

export const commonYesNoMap = {
  是: 1,
  否: 0,
};

// 品牌国别选项
export const COUNTRY_FLAG_TYPES = [
  { label: '国内', value: countryMap.国内 },
  { label: '国际', value: countryMap.国际 },
];

// 品牌中英文
export const BRAND_COUNTRY_FLAG_TYPES = [
  { label: '中文', value: brandCountryMap.中文 },
  { label: '英文', value: brandCountryMap.英文 },
];

// 是否一品多商
export const ONE_PRODUCT_MULTI_MERCHANT_TYPES = [
  { label: '是', value: commonYesNoMap.是 },
  { label: '否', value: commonYesNoMap.否 },
];

// 品牌标签
export const BRAND_TAGS = [
  {
    label: '海外进口品牌',
    value: 0,
  },
  {
    label: '国内新锐品牌',
    value: 1,
  },
  {
    label: '国内供应链品牌',
    value: 2,
  },
];
export const supplyModeMap = {
  'B 端供给': 1,
  'C 端供给': 2,
  'B/C 共存': 3,
  供给未明确: 8,
};
// 供给模式
export const SUPPLY_MODES = [
  {
    label: 'B 端供给',
    value: 1,
  },
  {
    label: 'C 端供给',
    value: 2,
  },
  {
    label: 'B/C 共存',
    value: 3,
  },
  {
    label: '供给未明确',
    value: 8,
  },
];

// 奢品风格
export const LUXURY_STYLES = [
  {
    label: '重奢',
    value: 0,
  },
  {
    label: '轻奢',
    value: 1,
  },
  {
    label: '轻奢（手表）',
    value: 2,
  },
  {
    label: '美妆奢品',
    value: 3,
  },
];

// 预计时间
export const ESTIMATED_TIME = [
  {
    label: '出价即可达到',
    value: 0,
  },
  {
    label: '1个月',
    value: 1,
  },
  {
    label: '2个月',
    value: 2,
  },
  {
    label: '3个月',
    value: 3,
  },
  {
    label: '6个月',
    value: 4,
  },
  {
    label: '9个月',
    value: 5,
  },
  {
    label: '12个月',
    value: 6,
  },
];

export const tabs = [
  {
    key: 'brandMsg',
    name: '品牌信息',
  },
  {
    key: 'brandData',
    name: '品牌数据',
  },
  {
    key: 'saleChannel',
    name: '渠道销售',
  },
  {
    key: 'brandPopularity',
    name: '品牌热度',
  },
  {
    key: 'other',
    name: '其他',
  },
];

const tansferMap = (list: any = []) => {
  return list.reduce((s: any, c: any) => {
    s[c.value] = c.label;
    return s;
  }, {})
}

const timeMap = tansferMap(ESTIMATED_TIME)
const registerStatuMap = tansferMap(REG_STATUS);

export const generateConstMaps = () => {
  return {
    brandType: tansferMap(BRAND_TYPES),
    // 品牌分层自评
    brandLayerSelfEvaluation: tansferMap(BRAND_LAYER_SELFE_VALUATION_TYPES),
    // 品牌优先级
    brandPriority: tansferMap(BRAND_PRIORITY_TYPES),
    // 品牌国别
    countryFlag: tansferMap(COUNTRY_FLAG_TYPES),
    // 品牌中英文
    brandCountryFlag: tansferMap(BRAND_COUNTRY_FLAG_TYPES),
    // 是否一品多商
    oneProductMultiMerchant: tansferMap(ONE_PRODUCT_MULTI_MERCHANT_TYPES),
    // 英文商标注册状态
    foreignRegisterStatus: registerStatuMap,
    // 中文商标注册状态
    registerStatus: registerStatuMap,

    brandTag: tansferMap(BRAND_TAGS),
    qualificationType: tansferMap(QUALIFICATION_TYPE),
    supplyMode: tansferMap(SUPPLY_MODES),
    luxuryStyle: tansferMap(LUXURY_STYLES),
    estimatePriceArriveTime: timeMap,
    estimateSaleArriveTime: timeMap,
  };
};

export const detailField = {
  brandMsg: {
    // '': 'brandName',
    品牌权利主体名称: 'brandRightSubject',
    品牌分层自评: 'brandLayerSelfEvaluation',
    品牌优先级: 'brandPriority',
    品牌国别: 'countryFlag',
    品牌中英文: 'brandCountryFlag',
    品牌别名: 'brandAlias',
    是否一品多商: 'oneProductMultiMerchant',
    大类: 'brandClasses',
    风格线: 'brandStyle',
    // 评审序号: 'approvalPeroidId',
    申请单ID: 'applyId',
    企业全称: 'enterpriseName',
    提报人: 'creator',
    主营类目: 'mainCategory',
    品牌类型: 'brandType',
    品牌标签: 'brandTag',
    资质类型: 'qualificationType',
    件单价: 'price',
    是否为纯新品牌: 'isNewBrand',
    供给模式: 'supplyMode',
    // 供给是否确定: 'isSupplyClear',
    品牌LOGO: 'brandLogo',
    中文商标注册证: 'trademarkList',
    中文商标注册状态: 'registerStatus',
    中文商标专用权期限: 'trademarkStartTime,trademarkEndTime',
    '中文承诺函证明/特批截图': 'commitmentProofList',
    中文品牌方关系证明: 'relationshipProofList',
    英文商标注册证: 'foreignTrademarkList',
    英文商标注册状态: 'foreignRegisterStatus',
    英文商标专用权期限: 'foreignTrademarkStartTime,foreignTrademarkEndTime',
    '英文承诺函证明/特批截图': 'foreignCommitmentProofList',
    英文品牌方关系证明: 'foreignRelationshipProofList',
    品牌故事: 'brandStory',
    品牌分层满足规则描述: 'brandValueDesc',
    附件: 'layerRuleList',
  },
  brandData: {
    日销价格指数: 'dailyPriceIndex',
    'A/S级促销价格指数': 'pricePromotionIndex',
    预计到达规定价格指数时间: 'estimatePriceArriveTime',
    计划平均每月上新SPU数: 'spuNum',
    预计贡献月销售额: 'monthlySales',
    达到预计销售需要时间: 'estimateSaleArriveTime',
    费率: 'rate',
    收费建议: 'fixedCost',
    社区每月Seeding数量: 'communitySeedingNum',
    '可在穿搭/晒单/开箱精选铺设的商品比例': 'layGoodsPercent',
    是否可在社媒每月导流: 'isSocialMediaDiversion',
    每月引力平台投入预算金额: 'gravityBudgetAmount',
    每月站内社区投入预算占比: 'insideBudgetAmountPercent',
    每月外投预算金额: 'outsideBudgetAmount',
    每月外投预算占比: 'outsideBudgetAmountPercent',
    得物社区帖子数: 'dewuPostsNum',
    小红书社区帖子数: 'xiaohongshuPostsNum',
    抖音视频数: 'tiktokVideoNum',
    抖音视频点赞数: 'tiktokVideoLikeNum',
    是否为奢品: 'isLuxury',
    奢品风格: 'luxuryStyle',
    淘数据GMV: 'taoDataGmv',
    符合奢品的具体原因: 'luxuryReason',
    国内外官方线下店铺数量: 'offlineStoreAmount',
    '线上线下销售规模（年度）': 'annualSaleScale',
    '淘宝（含天猫）月销量': 'monthlySaleAmount',
    淘宝天猫粉丝数: 'tianMaoFans',
    微博粉丝数: 'weiboFans',
    抖音粉丝数: 'tiktokFans',
  },
};

export const APPLY_ITEM_STATUS = {
  toSubmit: 0, // 待提交
  toReview: 10, // 待评审
  reviewNextTime: 20, // 下次评审
  reviewNotPass: 30, // 评审不通过
  reviewPass: 40, // 评审通过
};

export const BRAND_NAME = {
  中文名: 0,
  英文名: 1,
  中英文名: 2,
};
