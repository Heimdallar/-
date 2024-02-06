import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type {
  Data,
  Datas,
  CategoryInfo,
  AchievedInfo,
} from '../interface/queryAllCategoryAchievedRankByRate';

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
    percent: maxLevel ? (record.achievedRate / maxLevel) * 100 : 0,
    value: `${record.achievedRate}%`,
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

const buildMakeByAllCategoryQueryAchievedRankByRate = () => {
  return function makeByAllCategoryQueryAchievedRankByRate(record: Data) {
    if (!record) {
      return null;
    }
    maxLevel = record.extra?.firstData?.achievedInfo?.achievedRate * 1;

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/byAllCategory/queryAchievedRankByRate',
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

export default buildMakeByAllCategoryQueryAchievedRankByRate;
