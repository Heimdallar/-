import adapter from '@/utils/adapter';
import { makeByAllCategoryQueryWaitingRank } from '@/entities/homePage/factories';
import { fetchByAllCategoryQueryWaitingRankApi } from '@/apis/homePage/';
import type {
  ByAllCategoryQueryWaitingRankReq,
  Data,
} from '@/entities/homePage/interface/queryAllCategoryWaitingRank';

type FetchByAllCategoryQueryWaitingRankType = (data: ByAllCategoryQueryWaitingRankReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByAllCategoryQueryWaitingRankService: FetchByAllCategoryQueryWaitingRankType = adapter({
  request: fetchByAllCategoryQueryWaitingRankApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeByAllCategoryQueryWaitingRank(res.data) || {},
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: {},
      error,
    };
  },
});
export default fetchByAllCategoryQueryWaitingRankService;
