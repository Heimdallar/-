import adapter from '@/utils/adapter';
import { fetchUpdatePermissionDataApi } from '@/apis/serviceProvider/';
import type { Content } from '@/entities/serviceProvider/interface/updateUserPermissionData';

type FetchPermissionDataPageType = () => Promise<{
  success: boolean;
  data: Content;
  total?: number;
  error?: Content | Error;
}>;
const fetchUpdatePermissionDataService: FetchPermissionDataPageType = adapter({
  request: fetchUpdatePermissionDataApi,
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
export default fetchUpdatePermissionDataService;
