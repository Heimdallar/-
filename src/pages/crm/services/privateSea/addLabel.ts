import adapter from '@/utils/adapter';
import { fetchClueAddLabelApi } from '@/apis/privateSea/';
import type { ClueAddLabelReq } from '@/entities/privateSea/interface/addLabel';

type FetchClueAddLabelType = (data: ClueAddLabelReq) => Promise<{
  success: boolean;
  data: string;
}>;
const fetchClueAddLabelService: FetchClueAddLabelType = adapter({
  request: fetchClueAddLabelApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
    };
  },
  onError: () => {
    return {
      success: false,
      data: '',
    };
  },
});
export default fetchClueAddLabelService;
