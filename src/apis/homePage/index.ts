import type { ByAllCategoryGetOverviewReq } from '@/entities/homePage/interface/queryAllCategoryOverview';
import type { ByOperatorQueryAchievedRankByAmountReq } from '@/entities/homePage/interface/querOperatorAchievedRankByAmount';
import type { ByOperatorGetRateReq } from '@/entities/homePage/interface/queryOperatorRate';
import type { ByOperatorQueryWaitingRankReq } from '@/entities/homePage/interface/queryOperatorWaitingRank';
import type { ByOperatorGetOverviewReq } from '@/entities/homePage/interface/queryyOperatorOverview';
import type { ByAllCategoryQueryAchievedRankByAmountReq } from '@/entities/homePage/interface/queryAllCategoryAchievedRankByAmount';
import type { ByAllCategoryQueryAchievedRankByRateReq } from '@/entities/homePage/interface/queryAllCategoryAchievedRankByRate';
import type { ByAllCategoryGetRateReq } from '@/entities/homePage/interface/queryAllCategoryRate';
import type { ByAllCategoryQueryWaitingRankReq } from '@/entities/homePage/interface/queryAllCategoryWaitingRank';
import type { StatisticIndexReq } from '@/entities/homePage/interface/queryLeadsStatistic';
import request from '@/utils/request';

export const fetchStatisticIndexApi = (data: StatisticIndexReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/statistic/index', {
    method: 'post',
    data,
  });
};

export const fetchByAllCategoryQueryWaitingRankApi = (data: ByAllCategoryQueryWaitingRankReq) => {
  return request(
    '/youthcamp-mer-customer/merchant/customer/leads/statistic/byAllCategory/queryWaitingRank',
    {
      method: 'post',
      data,
    },
  );
};

export const fetchByAllCategoryGetRateApi = (data: ByAllCategoryGetRateReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/statistic/byAllCategory/getRate', {
    method: 'post',
    data,
  });
};

export const fetchByAllCategoryQueryAchievedRankByRateApi = (
  data: ByAllCategoryQueryAchievedRankByRateReq,
) => {
  return request(
    '/youthcamp-mer-customer/merchant/customer/leads/statistic/byAllCategory/queryAchievedRankByRate',
    {
      method: 'post',
      data,
    },
  );
};

export const fetchByAllCategoryQueryAchievedRankByAmountApi = (
  data: ByAllCategoryQueryAchievedRankByAmountReq,
) => {
  return request(
    '/youthcamp-mer-customer/merchant/customer/leads/statistic/byAllCategory/queryAchievedRankByAmount',
    {
      method: 'post',
      data,
    },
  );
};

export const fetchByOperatorGetOverviewApi = (data: ByOperatorGetOverviewReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/statistic/byOperator/getOverview', {
    method: 'post',
    data,
  });
};

export const fetchByOperatorQueryWaitingRankApi = (data: ByOperatorQueryWaitingRankReq) => {
  return request(
    '/youthcamp-mer-customer/merchant/customer/leads/statistic/byOperator/queryWaitingRank',
    {
      method: 'post',
      data,
    },
  );
};

export const fetchByOperatorGetRateApi = (data: ByOperatorGetRateReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/statistic/byOperator/getRate', {
    method: 'post',
    data,
  });
};

export const fetchByOperatorQueryAchievedRankByAmountApi = (
  data: ByOperatorQueryAchievedRankByAmountReq,
) => {
  return request(
    '/youthcamp-mer-customer/merchant/customer/leads/statistic/byOperator/queryAchievedRankByAmount',
    {
      method: 'post',
      data,
    },
  );
};

export const fetchByAllCategoryGetOverviewApi = (data: ByAllCategoryGetOverviewReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/statistic/byAllCategory/getOverview', {
    method: 'post',
    data,
  });
};
