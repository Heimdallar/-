import buildMakeByAllCategoryGetOverview from './queryAllCategoryOverview';
import buildMakeByOperatorQueryAchievedRankByAmount from './querOperatorAchievedRankByAmount';
import buildMakeByOperatorGetRate from './queryOperatorRate';
import buildMakeByOperatorQueryWaitingRank from './queryOperatorWaitingRank';
import buildMakeByOperatorGetOverview from './queryyOperatorOverview';
import buildMakeByAllCategoryQueryAchievedRankByAmount from './queryAllCategoryAchievedRankByAmount';
import buildMakeByAllCategoryQueryAchievedRankByRate from './queryAllCategoryAchievedRankByRate';
import buildMakeByAllCategoryGetRate from './queryAllCategoryRate';
import buildMakeByAllCategoryQueryWaitingRank from './queryAllCategoryWaitingRank';
import buildMakeStatisticIndex from './queryLeadsStatistic';

export const makeStatisticIndex = buildMakeStatisticIndex();
export const makeByAllCategoryQueryWaitingRank = buildMakeByAllCategoryQueryWaitingRank();
export const makeByAllCategoryGetRate = buildMakeByAllCategoryGetRate();
export const makeByAllCategoryQueryAchievedRankByRate =
  buildMakeByAllCategoryQueryAchievedRankByRate();
export const makeByAllCategoryQueryAchievedRankByAmount =
  buildMakeByAllCategoryQueryAchievedRankByAmount();
export const makeByOperatorGetOverview = buildMakeByOperatorGetOverview();
export const makeByOperatorQueryWaitingRank = buildMakeByOperatorQueryWaitingRank();
export const makeByOperatorGetRate = buildMakeByOperatorGetRate();
export const makeByOperatorQueryAchievedRankByAmount =
  buildMakeByOperatorQueryAchievedRankByAmount();
export const makeByAllCategoryGetOverview = buildMakeByAllCategoryGetOverview();
