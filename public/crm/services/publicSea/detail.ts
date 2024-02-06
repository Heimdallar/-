import adapter from '@/utils/adapter';
import { makeClueDetail } from '@/entities/publicSea/factories';
import { fetchClueDetailApi } from '@/apis/publicSea/';
import type { ClueDetailReq, Data } from '@/entities/publicSea/interface/detail';

type FetchClueDetailType = (data: ClueDetailReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchClueDetailService: FetchClueDetailType = adapter({
  request: fetchClueDetailApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeClueDetail(res.data) || {},
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
export default fetchClueDetailService;
