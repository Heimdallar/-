import { ChannelColumn, STORE_CHANNEL_APPLY_LIST, getChannelMap } from '@/entities/storeChannel';
import { commonYesNoMap } from '../../applyCommon/config';

export const initInternetSaleInfos = {
  annualSales: undefined,
  fansNum: undefined,
  storeChannel: undefined,
  storeUrl: undefined,
};

const imgList = [
  {
    key: '',
    thumbUrl: '',
  },
];

export const initValues = {
  annualSaleScale: null,
  brandAlias: null,
  brandClasses: null,
  brandCountryFlagArr: [],
  brandLayerSelfEvaluation: null,
  brandLogo: imgList,
  brandName: '',
  brandPriority: null,
  brandStory: '',
  brandStyle: null,
  brandTag: null,
  brandType: null,
  brandValueDesc: '',
  brandChineseName: '',
  brandEnglishName: '',
  countryFlag: null,
  dailyPriceIndex: null,
  enterpriseName: '',
  estimatePriceArriveTime: null,
  estimateSaleArriveTime: null,
  fixedCost: null,
  formSet: [],
  freeFreightGoodsPercent: null,
  internetSaleInfos: [initInternetSaleInfos],
  isLuxury: null,
  isNewBrand: null,
  isSupplyClear: null,
  luxuryReason: '',
  luxuryStyle: null,
  mainCategoryId: null,
  monthlySaleAmount: null,
  monthlySales: null,
  offlineStoreAmount: null,
  oneProductMultiMerchant: commonYesNoMap.是,
  price: null,
  pricePromotionIndex: null,
  qualificationType: null,
  serviceRate: null,
  spuNum: null,
  supplyMode: null,
  taoDataGmv: null,
  tianMaoFans: null,
  trademarkList: [], // 不设置值
  //  5.23修改新增
  brandRightSubject: null,
  registerStatus: null,
  trademarkStartTime: null,
  trademarkEndTime: null,
  commitmentProofList: imgList,
  relationshipProofList: imgList,
  foreignTrademarkList: [], // 不设置值
  foreignRegisterStatus: null,
  foreignTrademarkStartTime: null,
  foreignTrademarkEndTime: null,
  foreignCommitmentProofList: imgList,
  foreignRelationshipProofList: imgList,
  layerRuleList: imgList,
};

// 艺术品设置
// 品牌国别、品牌官方名、品牌中英文名、资质类型、主营类目、品牌故事、是否一品多商、大类、风格线，品牌LOGO、商标注册证、
// 小红书帖子数、微博粉丝数、抖音粉丝数 之外的非必填
export const artSettingKeys = [
  'countryFlag',
  'brandCountry',
  'brandName',
  'brandCountryFlagArr',
  'brandChineseName',
  'brandEnglishName',
  'qualificationType',
  'mainCategoryId',
  'brandStory',
  'oneProductMultiMerchant',
  'brandLayerSelfEvaluation',
  'brandPriority',
  'brandClasses',
  'brandStyle',
  'brandLogo',
  'trademarkList',
  'xiaohongshuPostsNum',
  'weiboFans',
  'tiktokFans',
  'brandValueDesc',
];

// 演出票务设置
// 品牌国别、品牌官方名、品牌中英文名、资质类型、主营类目、品牌故事、是否一品多商、大类、风格线，品牌LOGO、商标注册证
export const ticketSettingKeys = [
  'countryFlag',
  'brandCountry',
  'brandName',
  'brandCountryFlagArr',
  'brandChineseName',
  'brandEnglishName',
  'qualificationType',
  'mainCategoryId',
  'brandStory',
  'oneProductMultiMerchant',
  'brandLayerSelfEvaluation',
  'brandPriority',
  'brandClasses',
  'brandStyle',
  'brandLogo',
  'trademarkList',
  'brandValueDesc',
];

export const reviewPassDisbleKeys = [
  'brandName',
  'brandCountryFlagArr',
  'brandChineseName',
  'brandEnglishName',
  'brandAlias',
  'trademarkList',
  'brandStory',
];

// 数字字符转成数字
export const STRINGNO2NO = [
  'dailyPriceIndex',
  'freeFreightGoodsPercent',
  'insideBudgetAmountPercent',
  'layGoodsPercent',
  'outsideBudgetAmountPercent',
  'pricePromotionIndex',
];

export const CHANGESIZEONE = [
  {
    key: 'price',
    multiple: 100,
    unit: '元',
  },
  {
    key: 'monthlySales',
    multiple: 100,
    unit: '元',
  },
  {
    key: 'fixedCost',
    multiple: 100,
    unit: '元',
  },
  {
    key: 'gravityBudgetAmount',
    multiple: 100,
    unit: '元',
  },
  {
    key: 'insideBudgetAmount',
    multiple: 100,
    unit: '元',
  },
  {
    key: 'outsideBudgetAmount',
    multiple: 100,
    unit: '元',
  },
  {
    key: 'taoDataGmv',
    multiple: 100000000,
    unit: '亿',
  },
];

export const CHANGESIZETWO = [
  {
    key: 'annualSales',
    multiple: 10000000000,
    unit: '亿',
  },
];

export const STEP_ITEMS = [
  {
    title: '基础信息',
    value: 0,
  },
  {
    title: '外网销售概况',
    value: 1,
  },
  {
    title: '社区资源投放',
    value: 2,
  },
];

export const labelCol = { span: 8 };
export const wrapperCol = { span: 12 };
export const rowCol = { span: 24 };

// 是和否
export const IS_OR_NOT = [
  {
    label: '是',
    value: 1,
  },
  {
    label: '否',
    value: 0,
  },
];

// 店铺渠道
export const INIT_STORE_CHANNELS = STORE_CHANNEL_APPLY_LIST.map((channel) => {
  let label = channel.label;
  if (label === '官网平台') {
    // 老的逻辑
    label = '官网/平台';
  }
  return {
    label,
    value: label, // 这里确实是 label
    disabled: undefined,
  };
});

export const CHANNEL_MAPS: any = getChannelMap(ChannelColumn.Label, ChannelColumn.Key);
