import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type {
  Data,
  Datas,
  CategoryInfo,
  AchievedInfo,
} from '../interface/queryAllCategoryAchievedRankByAmount';

let maxLevel = 0;

const makeCategoryInfo = (record: CategoryInfo) => {
  if (!record) {
    return {};
  }

  return {
    level: record.level,
    categoryId: record.categoryId,
    categoryName: record.categoryName,
    label: record.categoryName,
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
    ...makeCategoryInfo(record.categoryInfo),
    ...makeAchievedInfo(record.achievedInfo),
  };
};

const buildMakeByAllCategoryQueryAchievedRankByAmount = () => {
  return function makeByAllCategoryQueryAchievedRankByAmount(record: Data) {
    if (!record) {
      return null;
    }
    maxLevel = record.extra?.firstData?.achievedInfo?.achievedAmount * 1;

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/byAllCategory/queryAchievedRankByAmount',
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

export default buildMakeByAllCategoryQueryAchievedRankByAmount;
