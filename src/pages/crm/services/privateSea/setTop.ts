import adapter from '@/utils/adapter';
import { fetchClueSetTopApi } from '@/apis/privateSea/';
import type { ClueSetTopReq } from '@/entities/privateSea/interface/setTop';

type FetchClueSetTopType = (data: ClueSetTopReq) => Promise<{
  success: boolean;
  data: boolean;
}>;
const fetchClueSetTopService: FetchClueSetTopType = adapter({
  request: fetchClueSetTopApi,
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
export default fetchClueSetTopService;
