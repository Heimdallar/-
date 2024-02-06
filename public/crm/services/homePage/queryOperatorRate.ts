import adapter from '@/utils/adapter';
import { makeByOperatorGetRate } from '@/entities/homePage/factories';
import { fetchByOperatorGetRateApi } from '@/apis/homePage/';
import type { ByOperatorGetRateReq, Data } from '@/entities/homePage/interface/queryOperatorRate';

type FetchByOperatorGetRateType = (data: ByOperatorGetRateReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByOperatorGetRateService: FetchByOperatorGetRateType = adapter({
  request: fetchByOperatorGetRateApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeByOperatorGetRate(res.data) || {},
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
export default fetchByOperatorGetRateService;
