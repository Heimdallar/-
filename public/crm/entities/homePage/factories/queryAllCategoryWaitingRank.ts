import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data, Datas, CategoryInfo, RankData } from '../interface/queryAllCategoryWaitingRank';

const makeCategoryInfo = (record: CategoryInfo) => {
  if (!record) {
    return {};
  }

  return {
    level: record.level,
    categoryId: record.categoryId,
    categoryName: record.categoryName,
  };
};

const makeRankData = (record: RankData) => {
  if (!record) {
    return {};
  }

  validEntitiesDataAndLogError({
    path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/byAllCategory/queryWaitingRank',
    configs: [
      {
        key: 'waitClaimAmount',
        type: 'number',
      },
      {
        key: 'waitClaimTimeoutAmount',
        type: 'number',
      },
      {
        key: 'waitFirstCommunicateAmount',
        type: 'number',
      },
      {
        key: 'waitFirstCommunicateTimeoutAmount',
        type: 'number',
      },
      {
        key: 'waitCommunicatResultAmount',
        type: 'number',
      },
      {
        key: 'waitCommunicatResultTimeoutAmount',
        type: 'number',
      },
      {
        key: 'waitEntryAmount',
        type: 'number',
      },
      {
        key: 'waitEntryTimeoutAmount',
        type: 'number',
      },
      {
        key: 'waitBiddingAmount',
        type: 'number',
      },
      {
        key: 'waitBiddingTimeoutAmount',
        type: 'number',
      },
    ],
    data: record,
  });

  return {
    waitClaimAmount: record.waitClaimAmount,
    waitClaimTimeoutAmount: record.waitClaimTimeoutAmount,
    waitFirstCommunicateAmount: record.waitFirstCommunicateAmount,
    waitFirstCommunicateTimeoutAmount: record.waitFirstCommunicateTimeoutAmount,
    waitCommunicatResultAmount: record.waitCommunicatResultAmount,
    waitCommunicatResultTimeoutAmount: record.waitCommunicatResultTimeoutAmount,
    waitEntryAmount: record.waitEntryAmount,
    waitEntryTimeoutAmount: record.waitEntryTimeoutAmount,
    waitBiddingAmount: record.waitBiddingAmount,
    waitBiddingTimeoutAmount: record.waitBiddingTimeoutAmount,
  };
};

const makeDatas = (record: Datas) => {
  if (!record) {
    return null;
  }

  return {
    rankIndex: record.rankIndex,
    ...makeCategoryInfo(record.categoryInfo),
    ...makeRankData(record.rankData),
  };
};

const buildMakeByAllCategoryQueryWaitingRank = () => {
  return function makeByAllCategoryQueryWaitingRank(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/byAllCategory/queryWaitingRank',
      configs: [
        {
          key: 'datas',
          type: 'array',
        },
        {
          key: 'page',
          type: 'number',
        },
        {
          key: 'pageSize',
          type: 'number',
        },
        {
          key: 'total',
          type: 'number',
        },
        {
          key: 'pages',
          type: 'number',
        },
      ],
      data: record,
    });

    return {
      page: record.page,
      pageSize: record.pageSize,
      total: record.total,
      pages: record.pages,
      datas: record.datas?.map(makeDatas).filter(Boolean),
    };
  };
};

export default buildMakeByAllCategoryQueryWaitingRank;
