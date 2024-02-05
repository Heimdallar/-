import adapter from '@/utils/adapter';
import { fetchPlatformManagerAddOrUpdateApi } from '@/apis/leadManagement/categoryConfig/';
import type { PlatformManagerAddOrUpdateReq } from '@/entities/leadManagement/categoryConfig/interface/fetchPlatformManagerAddOrUpdate';

type FetchPlatformManagerAddOrUpdateType = (data: PlatformManagerAddOrUpdateReq) => Promise<{
  success: boolean;
  data: boolean;
}>;
const fetchPlatformManagerAddOrUpdateService: FetchPlatformManagerAddOrUpdateType = adapter({
  request: fetchPlatformManagerAddOrUpdateApi,
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
export default fetchPlatformManagerAddOrUpdateService;
