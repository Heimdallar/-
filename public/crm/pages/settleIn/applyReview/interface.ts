export interface IListParams {
  id?: number;
  brandName?: string;
  mainCategoryId?: number;
  mainCategory?: string;
  enterpriseName?: string;
  status?: number;
  creator?: string;
  page: number;
  pageSize: number;
}

export interface IReviewParams {
  id: number;
  targetState: number;
}

export interface IBatchReviewParams {
  // idList: number[]
  idList: string;
  targetState: number;
}

export interface IModifyReviewReviewParams {
  id: number;
  targetState: number;
}

export interface IRemarkReviewParams {
  id: number;
  remark: string;
}

export interface IApplyDetailParams {
  applyId: number;
}

export interface IExportApproveDataParams {
  approvalPeroidId?: number;
  brandName?: string;
  mainCategoryId?: number;
  enterpriseName?: string;
  status?: number;
  creator?: string;
  statusList?: Array<number>;
  // userId: number
}

export interface IImportDataParams {
  ossKey: string;
  // 线索导入4003 申请单导入4002 审批单导入4004
  workType: 4003 | 4002 | 4004;
  // userId: number
}

export interface InternetSaleInfo {
  storeChannel: string;
  storeName: string;
  storeLevel: string;
  storeUrl: string;
  mainBrand: string;
  annualSales: number;
  fansNum: number;
  radarStoreId: number;
  crawlStatus: number;
  radarCreateTime: number;
}

export interface ApplyInfo {
  applyId: number;
  leadsId: number;
  brandName: string;
  brandId: number;
  mainCategoryId: number;
  mainCategory: string;
  brandType: number;
  brandTag: number;
  qualificationType: number;
  enterpriseName: string;
  isNewBrand: number;
  brandValueDesc: string;
  supplyMode: number;
  isSupplyClear: number;
  dailyPriceIndex: string;
  pricePromotionIndex: string;
  estimatePriceArriveTime: number;
  estimateSaleArriveTime: number;
  serviceRate: string;
  freeFreightGoodsPercent: string;
  isLuxury: number;
  luxuryStyle: number;
  luxuryReason: string;
  reportStartTime: string;
  reportEndTime: string;
  reportPeriodNo: string;
  layGoodsPercent: string;
  insideBudgetAmountPercent: string;
  insideBudgetAmount: number;
  gravityBudgetAmount: number;
  outsideBudgetAmountPercent: string;
  outsideBudgetAmount: number;
  dewuPostsNum: number;
  xiaohongshuPostsNum: number;
  tiktokVideoNum: number;
  tiktokVideoLikeNum: number;
  status: number;
  creator: string;
  createTime: string;
  brandLayerSelfEvaluation: number;
  countryFlag: number;
  brandCountry: string;
  brandCountryFlag: number;
  brandChineseName: string;
  brandEnglishName: string;
  brandAlias: string;
  brandStory: string;
  oneProductMultiMerchant: number;
  brandClasses: string;
  brandStyle: string;
  offlineStoreAmount: number;
  monthlySaleAmount: number;
  tianMaoFans: number;
  internetSaleInfos: InternetSaleInfo[];
  weiboFans: number;
  tiktokFans: number;
  applyTag: number;
  brandPriority: number;
}

export interface ApplyReviewInfo {
  id: number;
  approvalPeroidId: number;
  creator: string;
  editor: string;
  createTime: string;
  modifyTime: string;
  isDel: number;
  applyId: number;
  peroidNum: string;
  brandName: string;
  mainCategoryId: number;
  mainCategory: string;
  enterpriseName: string;
  supplyMode: number;
  status: number;
  remark: string;
  applyInfo: ApplyInfo;
  [key: string]: any;
}

export interface StringObj {
  [index: number]: string;
}
