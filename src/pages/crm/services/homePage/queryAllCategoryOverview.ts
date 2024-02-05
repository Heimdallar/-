import adapter from '@/utils/adapter';
import { makeByAllCategoryGetOverview } from '@/entities/homePage/factories';
import { fetchByAllCategoryGetOverviewApi } from '@/apis/homePage/';
import type {
  ByAllCategoryGetOverviewReq,
  Data,
} from '@/entities/homePage/interface/queryAllCategoryOverview';

type FetchByAllCategoryGetOverviewType = (data: ByAllCategoryGetOverviewReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByAllCategoryGetOverviewService: FetchByAllCategoryGetOverviewType = adapter({
  request: fetchByAllCategoryGetOverviewApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeByAllCategoryGetOverview(res.data) || {},
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
export default fetchByAllCategoryGetOverviewService;
