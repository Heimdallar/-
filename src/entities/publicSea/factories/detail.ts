import type {
  Data,
  CustomerSeaResponse,
  InternetSaleInfo,
  OutSidePlatformInfo,
  FollowUpInfoResponse,
  EnterpriseEnterInfoResponse,
  RecommenderResponse,
  EntryBindResponse,
  LeadsContactInfoResponseList,
} from '../interface/detail';

const makeInternetSaleInfos = (record: InternetSaleInfo) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
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
    storeCatalogs: record.storeCatalogs?.filter(Boolean),
    storeSalesSource: record.storeSalesSource,
    radarCreateTime: record.radarCreateTime,
  };
};

const makeCustomerSeaResponse = (record?: CustomerSeaResponse) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    leadsId: record.leadsId,
    customerSeaId: record.customerSeaId,
    brandName: record.brandName,
    mainCategoryId: record.mainCategoryId,
    mainCategory: record.mainCategory,
    enterpriseName: record.enterpriseName,
    contactName: record.contactName,
    contactTitle: record.contactTitle,
    contactMobile: record.contactMobile,
    contactTelephone: record.contactTelephone,
    contactWechat: record.contactWechat,
    contactWeibo: record.contactWeibo,
    contactEmail: record.contactEmail,
    categoryStyle: record.categoryStyle?.filter(Boolean),
    priorityName: record.priorityName,
    sourceName: record.sourceName,
    brandTypeName: record.brandTypeName,
    leadsTypeName: record.leadsTypeName,
    status: record.status,
    statusName: record.statusName,
    developer: record.developer,
    modifyTimeStr: record.modifyTimeStr,
    leadsOperator: record.leadsOperator,
    reason: record.reason,
    contactMobileNumber: record.contactMobileNumber,
    trademarkRegistrationCertificate: record.trademarkRegistrationCertificate,
    businessLicense: record.businessLicense,
    brandQualificationType: record.brandQualificationType,
    brandQualificationTypeCode: record.brandQualificationTypeCode,
    internetSaleInfos: record.internetSaleInfos?.map(makeInternetSaleInfos).filter(Boolean),
    top: record.top,
    brandAuths: record.brandAuths?.filter(Boolean),
    labelIds: record.labelIds?.filter(Boolean),
    labelNames: record.labelNames?.filter(Boolean),
    leadsType: record.leadsType,
    customerSeasRemark: record.customerSeasRemark,
    applyId: record.applyId,
    applyStatus: record.applyStatus,
    birthYear: record.birthYear,
    brandManual: record.brandManual,
    brandAuthLinkLevel: record.brandAuthLinkLevel,
    xiaohongshuPostsNum: record.xiaohongshuPostsNum,
    tiktokFansNum: record.tiktokFansNum,
    hotBrand: record.hotBrand,
    level2CategoryId: record.level2CategoryId,
    level2Category: record.level2Category,
    willingSendSample: record.willingSendSample,
    domesticStore: record.domesticStore,
    invitationCode: record.invitationCode,
    invitationActivityId: record.invitationActivityId,
    entryWilling: record.entryWilling,
    entryWillingDesc: record.entryWillingDesc,
    targetId: record.targetId,
    planChannel: record.planChannel,
    planChannelDesc: record.planChannelDesc,
    planEnd: record.planEnd,
    hitTag: record.hitTag,
    hitTagDesc: record.hitTagDesc,
    selfRecReason: record.selfRecReason,
    timeout: record.timeout,
    timeoutDesc: record.timeoutDesc,
    leftProcessTime: record.leftProcessTime,
    leftProcessTimeDesc: record.leftProcessTimeDesc,
    qualificationType: record.qualificationType,
    followerName: record.followerName,
    feedbackTalkFail: record.feedbackTalkFail,
    feedbackTalkFailDesc: record.feedbackTalkFailDesc,
  };
};

const makeOutSidePlatformInfos = (record: OutSidePlatformInfo) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    shopChannel: record.shopChannel,
    shopName: record.shopName,
    shopLevel: record.shopLevel,
    shopLink: record.shopLink,
    mainBrand: record.mainBrand,
    yearSellerMoney: record.yearSellerMoney,
    fansNum: record.fansNum,
    storeCatalogs: record.storeCatalogs?.filter(Boolean),
    recentThirtyTurnover: record.recentThirtyTurnover,
    spuCount: record.spuCount,
  };
};

const makeFollowUpInfoResponse = (record?: FollowUpInfoResponse) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    status: record.status,
    statusName: record.statusName,
    flowBD: record.flowBD,
    modifyTimeStr: record.modifyTimeStr,
    visitTimes: record.visitTimes,
    remark: record.remark,
  };
};

const makeEnterpriseEnterInfoResponse = (record?: EnterpriseEnterInfoResponse) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    enterStatus: record.enterStatus,
    enterStatusName: record.enterStatusName,
    merchantId: record.merchantId,
    userId: record.userId,
    enterEnterpriseName: record.enterEnterpriseName,
    enterEnterpriseAccount: record.enterEnterpriseAccount,
    enterEnterpriseLegalName: record.enterEnterpriseLegalName,
    remark: record.remark,
    merchantType: record.merchantType,
    brandType: record.brandType,
    sellerName: record.sellerName,
    directorName: record.directorName,
  };
};

const makeRecommenderResponse = (record?: RecommenderResponse) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    type: record.type,
    name: record.name,
    phone: record.phone,
    idCard: record.idCard,
    recommendEnterpriseName: record.recommendEnterpriseName,
  };
};

const makeEntryBindResponse = (record?: EntryBindResponse) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    bindUrl: record.bindUrl,
    bindUrlInvalid: record.bindUrlInvalid,
    hideFollowEntryButton: record.hideFollowEntryButton,
  };
};

const makeLeadsContactInfoResponseList = (record: LeadsContactInfoResponseList) => {
  if (!record) {
    return null;
  }

  return {
    ...record,
    contactName: record.contactName,
    contactTitle: record.contactTitle,
    contactMobileNumber: record.contactMobileNumber,
    contactTelephone: record.contactTelephone,
    contactWechat: record.contactWechat,
    contactWeibo: record.contactWeibo,
    contactEmail: record.contactEmail,
    mobileInvalidReason: record.mobileInvalidReason,
    telInvalidReason: record.telInvalidReason,
  };
};

const buildMakeClueDetail = () => {
  return function makeClueDetail(record: Data) {
    if (!record) {
      return null;
    }

    return {
      ...record,
      customerSeaResponse: makeCustomerSeaResponse(record.customerSeaResponse),
      outSidePlatformInfos: record.outSidePlatformInfos
        ?.map(makeOutSidePlatformInfos)
        .filter(Boolean),
      followUpInfoResponse: makeFollowUpInfoResponse(record.followUpInfoResponse),
      enterpriseEnterInfoResponse: makeEnterpriseEnterInfoResponse(
        record.enterpriseEnterInfoResponse,
      ),
      recommenderResponse: makeRecommenderResponse(record.recommenderResponse),
      entryBindResponse: makeEntryBindResponse(record.entryBindResponse),
      leadsContactInfoResponseList: record.leadsContactInfoResponseList
        ?.map(makeLeadsContactInfoResponseList)
        .filter(Boolean),
      leadsDetailOperateResponse: record.leadsDetailOperateResponse || {},
    };
  };
};

export default buildMakeClueDetail;
