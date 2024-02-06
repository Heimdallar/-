import adapter from '@/utils/adapter';
import { makeCategoryList } from '@/entities/configurationManagement/factories';
import { fetchCategoryListApi } from '@/apis/configurationManagement/';
import type {
  CategoryListReq,
  Datum,
} from '@/entities/configurationManagement/interface/queryCategoryList';

type FetchCategoryListType = (data: CategoryListReq) => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>;
const fetchCategoryListService: FetchCategoryListType = adapter({
  request: fetchCategoryListApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.map(makeCategoryList).filter(Boolean) || [],
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
export default fetchCategoryListService;
