import adapter from '@/utils/adapter';
import { makeApplyPage } from '@/entities/fetchApplyPage/factories';
import { fetchApplyPageApi } from '@/apis/fetchApplyPage/';
import { ApplyPageReq, Data } from '@/entities/fetchApplyPage/interface/index';

type FetchApplyPageType = (data: ApplyPageReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchApplyPageService: FetchApplyPageType = adapter({
  request: fetchApplyPageApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeApplyPage(res.data) || {},
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
export default fetchApplyPageService;
