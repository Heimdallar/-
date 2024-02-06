import adapter from '@/utils/adapter';
import { makePermissionDataPage } from '@/entities/serviceProvider/factories';
import { fetchPermissionDataPageApi } from '@/apis/serviceProvider/';
import type { Content } from '@/entities/serviceProvider/interface/queryUserPermissionDataList';

type FetchPermissionDataPageType = () => Promise<{
  success: boolean;
  data: Content;
  total?: number;
  error?: Content | Error;
}>;
const fetchPermissionDataPageService: FetchPermissionDataPageType = adapter({
  request: fetchPermissionDataPageApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.contents?.map(makePermissionDataPage).filter(Boolean) || [],
      total: res.data.total,
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: [],
      total: 0,
      error,
    };
  },
});
export default fetchPermissionDataPageService;
