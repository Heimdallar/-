import adapter from '@/utils/adapter';
import { makeCategoryList } from '@/entities/serviceProvider/factories';
import { fetchCategoryListApi } from '@/apis/serviceProvider/';
import type {
  CategoryListReq,
  Datum,
} from '@/entities/serviceProvider/interface/queryCategoryList';

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
