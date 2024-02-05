import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data, Datas, OperatorInfo, RankData } from '../interface/queryOperatorWaitingRank';

const makeOperatorInfo = (record: OperatorInfo) => {
  if (!record) {
    return {};
  }

  return {
    operatorId: record.operatorId,
    operatorName: record.operatorName,
  };
};

const makeRankData = (record: RankData) => {
  if (!record) {
    return {};
  }

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
    ...makeOperatorInfo(record.operatorInfo),
    ...makeRankData(record.rankData),
  };
};

const buildMakeByOperatorQueryWaitingRank = () => {
  return function makeByOperatorQueryWaitingRank(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/byOperator/queryWaitingRank',
      configs: [
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
        {
          key: 'datas',
          type: 'array',
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

export default buildMakeByOperatorQueryWaitingRank;
