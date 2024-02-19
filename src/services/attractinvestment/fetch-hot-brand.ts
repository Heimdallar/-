import adapter from '@/utils/adapter'
import { makeBrandSearch } from '@/entities/attractinvestment/factories'
import { fetchBrandSearchApi } from '@/apis/attractinvestment/index'
import { BrandSearchReq, Datum } from '@/entities/attractinvestment/interface/fetch-hot-brand'

type FetchBrandSearchType = (data: BrandSearchReq) => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>

const fetchBrandSearchService: FetchBrandSearchType = adapter({
  request: fetchBrandSearchApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeBrandSearch(res.data)?.contents || []
    }
  },
  onError: (error) => {
    return {
      success: false,
      error
    }
  },
})

export default fetchBrandSearchService
