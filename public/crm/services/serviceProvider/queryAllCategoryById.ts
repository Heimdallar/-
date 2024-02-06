import adapter from '@/utils/adapter';
import { fetchPermissionDataListAllCategoryApi } from '@/apis/serviceProvider/';
import type {
  PermissionDataListAllCategoryReq,
  Datum,
} from '@/entities/serviceProvider/interface/queryAllCategoryById';

type FetchPermissionDataListAllCategoryType = (data: PermissionDataListAllCategoryReq) => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>;
const fetchPermissionDataListAllCategoryService: FetchPermissionDataListAllCategoryType = adapter({
  request: fetchPermissionDataListAllCategoryApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data || [],
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: [],
      error,
    };
  },
});
export default fetchPermissionDataListAllCategoryService;
