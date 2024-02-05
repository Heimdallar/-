import adapter from '@/utils/adapter';
import { makeByOperatorGetOverview } from '@/entities/homePage/factories';
import { fetchByOperatorGetOverviewApi } from '@/apis/homePage/';
import type {
  ByOperatorGetOverviewReq,
  Data,
} from '@/entities/homePage/interface/queryyOperatorOverview';

type FetchByOperatorGetOverviewType = (data: ByOperatorGetOverviewReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchByOperatorGetOverviewService: FetchByOperatorGetOverviewType = adapter({
  request: fetchByOperatorGetOverviewApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeByOperatorGetOverview(res.data) || {},
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
export default fetchByOperatorGetOverviewService;
