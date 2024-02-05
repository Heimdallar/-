export interface ApplyPageRes {
    code?:   number;
    data?:   ApplyPageResData;
    domain?: string;
    errors?: Error[];
    msg?:    string;
}

export interface ApplyPageResData {
    datas?:    DataElement[];
    page?:     number;
    pages?:    number;
    pageSize?: number;
    total?:    number;
}

export interface DataElement {
    applyId?:                    number;
    approvalPeroidId?:           number;
    approvalRecordId?:           number;
    brandLayerSelfEvaluation?:   string;
    brandName?:                  string;
    brandTag?:                   number;
    brandType?:                  number;
    brandValueDesc?:             string;
    communitySeedingNum?:        number;
    createTime?:                 string;
    creator?:                    string;
    dailyPriceIndex?:            string;
    dewuPostsNum?:               number;
    enterpriseName?:             string;
    estimatePriceArriveTime?:    number;
    estimateSaleArriveTime?:     number;
    fixedCost?:                  number;
    freeFreightGoodsPercent?:    string;
    gravityBudgetAmount?:        number;
    insideBudgetAmount?:         number;
    insideBudgetAmountPercent?:  string;
    internetSaleInfos?:          InternetSaleInfo[];
    isLuxury?:                   number;
    isNewBrand?:                 number;
    isSocialMediaDiversion?:     number;
    isSupplyClear?:              number;
    layGoodsPercent?:            string;
    leadsId?:                    number;
    luxuryReason?:               string;
    luxuryStyle?:                number;
    mainCategory?:               string;
    mainCategoryId?:             number;
    monthlySales?:               number;
    outsideBudgetAmount?:        number;
    outsideBudgetAmountPercent?: string;
    price?:                      number;
    pricePromotionIndex?:        string;
    qualificationType?:          number;
    remark?:                     string;
    reportEndTime?:              string;
    reportPeriodNo?:             string;
    reportStartTime?:            string;
    /**
     * 是否可以重新提交标识，0不允许，1允许
     */
    resubmitFlag?:        number;
    serviceRate?:         string;
    spuNum?:              number;
    status?:              number;
    supplyMode?:          number;
    taoDataGmv?:          number;
    tiktokVideoLikeNum?:  number;
    tiktokVideoNum?:      number;
    xiaohongshuPostsNum?: number;
}

export interface InternetSaleInfo {
    annualSales?:          number;
    averagePrice?:         string;
    crawlStatus?:          number;
    fansNum?:              number;
    mainBrand?:            string;
    priceRange?:           string;
    radarCreateTime?:      number;
    radarStoreId?:         number;
    recentThirtySales?:    string;
    recentThirtyTurnover?: string;
    spuCount?:             number;
    storeCatalogs?:        string[];
    storeChannel?:         string;
    storeLevel?:           string;
    storeName?:            string;
    storeSalesSource?:     number;
    storeTag?:             string;
    storeUrl?:             string;
    topOnePrice?:          string;
    topOneProduct?:        string;
    topOneSales?:          string;
    topOneTurnover?:       string;
}

export interface Error {
    message?: string;
    name?:    string;
}

export interface ApplyPageReq {
    applyId?:          number;
    approvalRecordId?: number;
    brandName?:        string;
    creator?:          string;
    enterpriseName?:   string;
    mainCategory?:     number;
    page?:             number;
    pageSize?:         number;
    reportPeriodNo?:   string;
    status?:           number;
    statusList?:       number[];
}

