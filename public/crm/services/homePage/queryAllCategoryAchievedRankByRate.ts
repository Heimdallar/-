import adapter from '@/utils/adapter';
import { makeByAllCategoryQueryAchievedRankByRate } from '@/entities/homePage/factories';
import { fetchByAllCategoryQueryAchievedRankByRateApi } from '@/apis/homePage/';
import type {
  ByAllCategoryQueryAchievedRankByRateReq,
  Data,
} from '@/entities/homePage/interface/queryAllCategoryAchievedRankByRate';

type FetchByAllCategoryQueryAchievedRankByRateType = (
  data: ByAllCategoryQueryAchievedRankByRateReq,
) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByAllCategoryQueryAchievedRankByRateService: FetchByAllCategoryQueryAchievedRankByRateType =
  adapter({
    request: fetchByAllCategoryQueryAchievedRankByRateApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: makeByAllCategoryQueryAchievedRankByRate(res.data) || {},
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
export default fetchByAllCategoryQueryAchievedRankByRateService;
