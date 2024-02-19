import adapter from '@/utils/adapter'
import { makeCategoryList } from '@/entities/attractinvestment/factories'
import { fetchCategoryListApi } from '@/apis/attractinvestment/index'
import { CategoryListReq, Datum } from '@/entities/attractinvestment/interface/fetch-category-list'

type FetchCategoryListType = (data: CategoryListReq) => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>

const fetchCategoryListService: FetchCategoryListType = adapter({
  request: fetchCategoryListApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data?.map(makeCategoryList).filter(Boolean) || []
    }
  },
  onError: (error) => {
    return {
      success: false,
      error
    }
  },
})

export default fetchCategoryListService
