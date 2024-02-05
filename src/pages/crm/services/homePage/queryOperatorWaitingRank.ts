import adapter from '@/utils/adapter';
import { makeByOperatorQueryWaitingRank } from '@/entities/homePage/factories';
import { fetchByOperatorQueryWaitingRankApi } from '@/apis/homePage/';
import type {
  ByOperatorQueryWaitingRankReq,
  Data,
} from '@/entities/homePage/interface/queryOperatorWaitingRank';

type FetchByOperatorQueryWaitingRankType = (data: ByOperatorQueryWaitingRankReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByOperatorQueryWaitingRankService: FetchByOperatorQueryWaitingRankType = adapter({
  request: fetchByOperatorQueryWaitingRankApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeByOperatorQueryWaitingRank(res.data) || {},
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
export default fetchByOperatorQueryWaitingRankService;
