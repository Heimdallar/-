import buildMakeApplyPage from './index'

export const makeApplyPage = buildMakeApplyPage()import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities'
import { Data, Datas, InternetSaleInfos, StoreCatalogs } from '../interface/index'

const makeStoreCatalogs = (record: StoreCatalogs) => {
	if (!record) {
		return null
	}

	return {
	}
}

const makeInternetSaleInfos = (record: InternetSaleInfos) => {
	if (!record) {
		return null
	}

	return {
		storeChannel: record.storeChannel,
		storeName: record.storeName,
		storeLevel: record.storeLevel,
		storeUrl: record.storeUrl,
		mainBrand: record.mainBrand,
		annualSales: record.annualSales,
		fansNum: record.fansNum,
		recentThirtySales: record.recentThirtySales,
		recentThirtyTurnover: record.recentThirtyTurnover,
		priceRange: record.priceRange,
		averagePrice: record.averagePrice,
		topOneProduct: record.topOneProduct,
		topOnePrice: record.topOnePrice,
		topOneSales: record.topOneSales,
		topOneTurnover: record.topOneTurnover,
		radarStoreId: record.radarStoreId,
		spuCount: record.spuCount,
		crawlStatus: record.crawlStatus,
		storeTag: record.storeTag,
		storeCatalogs: record.storeCatalogs?.map(makeStoreCatalogs).filter(Boolean),
		storeSalesSource: record.storeSalesSource,
		radarCreateTime: record.radarCreateTime,
	}
}

const makeDatas = (record: Datas) => {
	if (!record) {
		return null
	}

	return {
		applyId: record.applyId,
		leadsId: record.leadsId,
		brandName: record.brandName,
		mainCategoryId: record.mainCategoryId,
		mainCategory: record.mainCategory,
		brandType: record.brandType,
		brandTag: record.brandTag,
		qualificationType: record.qualificationType,
		price: record.price,
		enterpriseName: record.enterpriseName,
		isNewBrand: record.isNewBrand,
		brandValueDesc: record.brandValueDesc,
		supplyMode: record.supplyMode,
		isSupplyClear: record.isSupplyClear,
		dailyPriceIndex: record.dailyPriceIndex,
		pricePromotionIndex: record.pricePromotionIndex,
		estimatePriceArriveTime: record.estimatePriceArriveTime,
		spuNum: record.spuNum,
		monthlySales: record.monthlySales,
		estimateSaleArriveTime: record.estimateSaleArriveTime,
		serviceRate: record.serviceRate,
		fixedCost: record.fixedCost,
		freeFreightGoodsPercent: record.freeFreightGoodsPercent,
		taoDataGmv: record.taoDataGmv,
		isLuxury: record.isLuxury,
		luxuryStyle: record.luxuryStyle,
		luxuryReason: record.luxuryReason,
		internetSaleInfos: record.internetSaleInfos?.map(makeInternetSaleInfos).filter(Boolean),
		reportStartTime: record.reportStartTime,
		reportEndTime: record.reportEndTime,
		reportPeriodNo: record.reportPeriodNo,
		communitySeedingNum: record.communitySeedingNum,
		layGoodsPercent: record.layGoodsPercent,
		isSocialMediaDiversion: record.isSocialMediaDiversion,
		gravityBudgetAmount: record.gravityBudgetAmount,
		insideBudgetAmountPercent: record.insideBudgetAmountPercent,
		insideBudgetAmount: record.insideBudgetAmount,
		outsideBudgetAmountPercent: record.outsideBudgetAmountPercent,
		outsideBudgetAmount: record.outsideBudgetAmount,
		dewuPostsNum: record.dewuPostsNum,
		xiaohongshuPostsNum: record.xiaohongshuPostsNum,
		tiktokVideoNum: record.tiktokVideoNum,
		tiktokVideoLikeNum: record.tiktokVideoLikeNum,
		status: record.status,
		creator: record.creator,
		createTime: record.createTime,
		approvalRecordId: record.approvalRecordId,
		approvalPeroidId: record.approvalPeroidId,
		remark: record.remark,
		brandLayerSelfEvaluation: record.brandLayerSelfEvaluation,
		resubmitFlag: record.resubmitFlag,
	}
}

const buildMakeApplyPage = () => {
	return function makeApplyPage(record: Data) {
		if (!record) {
			return null
		}

		return {
			page: record.page,
			pageSize: record.pageSize,
			total: record.total,
			pages: record.pages,
			datas: record.datas?.map(makeDatas).filter(Boolean),
		}
	}
}

export default buildMakeApplyPage
