import adapter from '@/utils/adapter';
import { makeByAllCategoryQueryAchievedRankByAmount } from '@/entities/homePage/factories';
import { fetchByAllCategoryQueryAchievedRankByAmountApi } from '@/apis/homePage/';
import type {
  ByAllCategoryQueryAchievedRankByAmountReq,
  Data,
} from '@/entities/homePage/interface/queryAllCategoryAchievedRankByAmount';

type FetchByAllCategoryQueryAchievedRankByAmountType = (
  data: ByAllCategoryQueryAchievedRankByAmountReq,
) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByAllCategoryQueryAchievedRankByAmountService: FetchByAllCategoryQueryAchievedRankByAmountType =
  adapter({
    request: fetchByAllCategoryQueryAchievedRankByAmountApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: makeByAllCategoryQueryAchievedRankByAmount(res.data) || {},
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
export default fetchByAllCategoryQueryAchievedRankByAmountService;
