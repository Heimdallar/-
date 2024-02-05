import adapter from '@/utils/adapter';
import { makeByAllCategoryGetRate } from '@/entities/homePage/factories';
import { fetchByAllCategoryGetRateApi } from '@/apis/homePage/';
import type {
  ByAllCategoryGetRateReq,
  Data,
} from '@/entities/homePage/interface/queryAllCategoryRate';

type FetchByAllCategoryGetRateType = (data: ByAllCategoryGetRateReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByAllCategoryGetRateService: FetchByAllCategoryGetRateType = adapter({
  request: fetchByAllCategoryGetRateApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeByAllCategoryGetRate(res.data) || {},
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
export default fetchByAllCategoryGetRateService;
