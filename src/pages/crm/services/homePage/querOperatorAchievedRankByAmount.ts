import adapter from '@/utils/adapter';
import { makeByOperatorQueryAchievedRankByAmount } from '@/entities/homePage/factories';
import { fetchByOperatorQueryAchievedRankByAmountApi } from '@/apis/homePage/';
import type {
  ByOperatorQueryAchievedRankByAmountReq,
  Data,
} from '@/entities/homePage/interface/querOperatorAchievedRankByAmount';

type FetchByOperatorQueryAchievedRankByAmountType = (
  data: ByOperatorQueryAchievedRankByAmountReq,
) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByOperatorQueryAchievedRankByAmountService: FetchByOperatorQueryAchievedRankByAmountType =
  adapter({
    request: fetchByOperatorQueryAchievedRankByAmountApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: makeByOperatorQueryAchievedRankByAmount(res.data) || {},
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
export default fetchByOperatorQueryAchievedRankByAmountService;
