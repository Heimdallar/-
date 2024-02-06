import adapter from '@/utils/adapter';
import { fetchAddPermissionDataApi } from '@/apis/serviceProvider/';
import type { Content } from '@/entities/serviceProvider/interface/addUserPermissionData';

type FetchPermissionDataPageType = () => Promise<{
  success: boolean;
  data: Content;
  total?: number;
  error?: Content | Error;
}>;
const fetchAddPermissionDataService: FetchPermissionDataPageType = adapter({
  request: fetchAddPermissionDataApi,
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
export default fetchAddPermissionDataService;
