import adapter from '@/utils/adapter';
import { fetchClueTransferApi } from '@/apis/publicSea/';
import type { ClueTransferReq } from '@/entities/publicSea/interface/transfer';

type FetchClueTransferType = (data: ClueTransferReq) => Promise<{
  success: boolean;
  data: boolean;
  error?: boolean | Error;
}>;
const fetchClueTransferService: FetchClueTransferType = adapter({
  request: fetchClueTransferApi,
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
export default fetchClueTransferService;
