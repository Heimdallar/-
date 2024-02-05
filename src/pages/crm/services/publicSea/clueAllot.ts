import adapter from '@/utils/adapter';
import { fetchClueAllotApi } from '@/apis/publicSea/';
import type { ClueAllotReq } from '@/entities/publicSea/interface/clueAllot';

type FetchClueAllotType = (data: ClueAllotReq) => Promise<{
  success: boolean;
  data: boolean;
  error?: boolean | Error;
}>;
const fetchClueAllotService: FetchClueAllotType = adapter({
  request: fetchClueAllotApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: null,
      error,
    };
  },
});
export default fetchClueAllotService;
