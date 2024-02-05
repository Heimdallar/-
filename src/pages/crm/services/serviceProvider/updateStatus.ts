import adapter from '@/utils/adapter';
import { fetchUpdateStatusApi } from '@/apis/serviceProvider/';
import type { Content } from '@/entities/serviceProvider/interface/updateStatus';

type FetchPermissionDataPageType = () => Promise<{
  success: boolean;
  data: Content;
  total?: number;
  error?: Content | Error;
}>;
const fetchUpdateStatusService: FetchPermissionDataPageType = adapter({
  request: fetchUpdateStatusApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
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
export default fetchUpdateStatusService;
