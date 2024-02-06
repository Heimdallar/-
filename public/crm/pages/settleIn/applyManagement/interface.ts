export interface InternetSaleInfo {
  storeChannel: string;
  storeUrl: string;
  annualSales: number;
  fansNum: number;
  radarCreateTime: number;
  [key: string]: any;
}

export interface BrandHotInfo {
  brandName: string;
  redbookPostNumber: number;
  redbookLikeNumber: number;
  tiktokPostNumber: number;
  tiktokLikeNumber: number;
  weiboKeywordContents30: number;
  weiboKeywordReposts30: number;
  weiboKeywordLikes30: number;
  weixinIndexLikes30: number;
  weixinIndexContents30: number;
  bilibiliKeywordContents90: number;
  bilibiliKeywordLikes90: number;
  bilibiliKeywordReposts90: number;
  bilibiliKeywordComments90: number;
  [key: string]: any;
}

export interface ApplyInfo {
  applyId: number;
  leadsId: number;
  brandName: string;
  mainCategoryId: number;
  mainCategory: string;
  brandType: number;
  price: number;
  enterpriseName: string;
  isNewBrand: number;
  brandValueDesc: string;
  isSupplyClear: number;
  dailyPriceIndex: string;
  pricePromotionIndex: string;
  estimatePriceArriveTime: number;
  spuNum: number;
  monthlySales: number;
  estimateSaleArriveTime: number;
  serviceRate: string;
  fixedCost: number;
  freeFreightGoodsPercent: string;
  taoDataGmv: number;
  isLuxury: number;
  luxuryStyle: number;
  luxuryReason: string;
  internetSaleInfos: InternetSaleInfo[];
  reportStartTime: string;
  reportEndTime: string;
  reportPeriodNo: string;
  communitySeedingNum: number;
  layGoodsPercent: string;
  isSocialMediaDiversion: number;
  gravityBudgetAmount: number;
  insideBudgetAmountPercent: string;
  insideBudgetAmount: number;
  outsideBudgetAmountPercent: string;
  outsideBudgetAmount: number;
  xiaohongshuPostsNum: number;
  tiktokVideoNum: number;
  tiktokVideoLikeNum: number;
  status: number;
  creator: string;
  createTime: string;
  brandLayerSelfEvaluation: string;
  resubmitFlag: number;
  [key: string]: any;
}

export interface StringObj {
  [index: number]: string;
}

export interface IEventTarget {
  value: number;
}
