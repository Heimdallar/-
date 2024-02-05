import adapter from '@/utils/adapter';
import { fetchClueCancelTopApi } from '@/apis/privateSea/';
import type { ClueCancelTopReq } from '@/entities/privateSea/interface/cancelTop';

type FetchClueCancelTopType = (data: ClueCancelTopReq) => Promise<{
  success: boolean;
  data: boolean;
}>;
const fetchClueCancelTopService: FetchClueCancelTopType = adapter({
  request: fetchClueCancelTopApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
    };
  },
  onError: () => {
    return {
      success: false,
      data: false,
    };
  },
});
export default fetchClueCancelTopService;
