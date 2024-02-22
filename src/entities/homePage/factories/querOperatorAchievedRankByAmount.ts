import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type {
  Data,
  Datas,
  OperatorInfo,
  AchievedInfo,
} from '../interface/querOperatorAchievedRankByAmount';

let maxLevel = 0;

const makeOperatorInfo = (record: OperatorInfo) => {
  if (!record) {
    return {};
  }

  return {
    operatorId: record.operatorId,
    operatorName: record.operatorName,
    label: record.operatorName,
  };
};

const makeAchievedInfo = (record: AchievedInfo) => {
  if (!record) {
    return {};
  }

  return {
    targetAmount: record.targetAmount,
    achievedAmount: record.achievedAmount,
    achievedRate: record.achievedRate,
    percent: maxLevel ? (record.achievedAmount / maxLevel) * 100 : 0,
    value: record.achievedAmount,
  };
};

const makeDatas = (record: Datas) => {
  if (!record) {
    return null;
  }

  return {
    randIndex: record.randIndex,
    ...makeOperatorInfo(record.operatorInfo),
    ...makeAchievedInfo(record.achievedInfo),
  };
};

const buildMakeByOperatorQueryAchievedRankByAmount = () => {
  return function makeByOperatorQueryAchievedRankByAmount(record: Data) {
    if (!record) {
      return null;
    }
    maxLevel = record.extra?.firstData?.achievedInfo?.achievedAmount * 1;

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/youthcamp-mer-customer/merchant/customer/leads/statistic/byOperator/queryAchievedRankByAmount',
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

export default buildMakeByOperatorQueryAchievedRankByAmount;
