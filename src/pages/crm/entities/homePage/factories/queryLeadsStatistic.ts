import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data, CategoryInfoList } from '../interface/queryLeadsStatistic';

const makeCategoryInfoList = (record: CategoryInfoList[]) => {
  if (!record) {
    return [];
  }

  const data = record.map((item) => {
    return {
      level: item.level,
      label: item.categoryName,
      value: item.categoryId,
    };
  });

  if (data.length > 1) {
    data.unshift({
      label: '全部',
      value: 'ALL',
    });
  }
  return data;
};

const buildMakeStatisticIndex = () => {
  return function makeStatisticIndex(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/index',
      configs: [
        {
          key: 'categoryInfoList',
          type: 'array',
        },
        {
          key: 'viewMode',
          type: 'string',
        },
      ],
      data: record,
    });

    return {
      viewMode: record.viewMode,
      categoryInfoList: makeCategoryInfoList(record.categoryInfoList),
    };
  };
};

export default buildMakeStatisticIndex;
