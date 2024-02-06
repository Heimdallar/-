export interface IListParams {
  id?: number
  brandName?: string
  mainCategoryId?: number
  mainCategory?: string
  enterpriseName?: string
  status?: number
  creator?: string
  page: number
  pageSize: number
}

export interface IReviewParams {
  id: number
  targetState: number
}

export interface IBatchReviewParams {
  // idList: number[]
  idList: string
  targetState: number
}

export interface IModifyReviewReviewParams {
  id: number
  targetState: number
}

export interface IRemarkReviewParams {
  id: number
  remark: string
}

export interface IApplyDetailParams {
  applyId: number
}

export interface IExportApproveDataParams {
  approvalPeroidId?: number
  brandName?: string
  mainCategoryId?: number
  enterpriseName?: string
  status?: number
  creator?: string
  statusList?: Array<number>
  // userId: number
}

export interface IImportDataParams {
  ossKey: string
  // 线索导入4003 申请单导入4002 审批单导入4004
  workType: 4003 | 4002 | 4004
  // userId: number
}

export interface BrandHotInfoList {
	brandName: string;
	redbookPostNumber: string;
	redbookLikeNumber: string;
	tiktokPostNumber: string;
	tiktokLikeNumber: string;
	weiboKeywordContents30: string;
	weiboKeywordReposts30: string;
	weiboKeywordComments30: string;
	weiboKeywordLikes30: string;
	weixinIndexContents30: string;
	weixinIndexReads30: string;
	weixinIndexLikes30: string;
	bilibiliKeywordContents90: string;
	bilibiliKeywordLikes90: string;
	bilibiliKeywordReposts90: string;
	bilibiliKeywordComments90: string;
	topOne: boolean;
}

export interface BrandLogo {
	key: string;
	url: string;
}

export interface TrademarkList {
	key: string;
	url: string;
}
export interface BrandTab {
	key: string;
	name: string;
}

export interface InternetSaleInfo {
	storeChannel: string;
	storeName: string;
	storeUrl: string;
	annualSales: number;
	crawlStatus: number;
	radarCreateTime: number;
}

export interface Options {
  label: string;
  value: string;
}

export interface IDetail {
  applyId: number;
  leadsId: number;
  brandName: string;
  brandId?: number;
  mainCategoryId: number | Options;
  mainCategory: string;
  brandType: number;
  qualificationType: number;
  price: number;
  enterpriseName: string;
  isNewBrand: number;
  brandValueDesc: string;
  supplyMode: number;
  isSupplyClear?: number;
  dailyPriceIndex: string;
  pricePromotionIndex: string;
  estimatePriceArriveTime: number;
  spuNum: number;
  monthlySales?: number;
  estimateSaleArriveTime: number;
  serviceRate?: string;
  fixedCost: number;
  freeFreightGoodsPercent?: string;
  taoDataGmv?: number;
  isLuxury?: number;
  luxuryStyle?: number;
  luxuryReason: string;
  reportStartTime?: string;
  reportEndTime?: string;
  reportPeriodNo?: string;
  communitySeedingNum?: number;
  layGoodsPercent: string;
  isSocialMediaDiversion?: number;
  insideBudgetAmountPercent: string;
  insideBudgetAmount?: number;
  gravityBudgetAmount?: number;
  outsideBudgetAmountPercent: string;
  outsideBudgetAmount?: number;
  dewuPostsNum?: number;
  xiaohongshuPostsNum?: number;
  tiktokVideoNum?: number;
  tiktokVideoLikeNum?: number;
  status: number;
  creator: string;
  createTime: string;
  brandHotInfoList: BrandHotInfoList[];
  brandLayerSelfEvaluation?: number;
  countryFlag?: number;
  brandCountry: string;
  brandCountryFlag: number;
  brandChineseName: string;
  brandEnglishName: string;
  brandAlias: string;
  brandStory: string;
  oneProductMultiMerchant: number;
  brandClasses: string;
  brandStyle: string;
  brandLogo: BrandLogo;
  trademarkList: TrademarkList[];
  offlineStoreAmount?: number;
  annualSaleScale?: number;
  monthlySaleAmount?: number;
  tianMaoFans?: number;
  internetSaleInfos?: InternetSaleInfo[];
  weiboFans?: number;
  tiktokFans?: number;
  applyTag?: number;
  brandPriority?: number;
}


export interface DetailField {
  brandMsg: { [key: string] : string }
  brandData: { [key: string] : string }
}