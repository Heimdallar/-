import adapter from '@/utils/adapter'
import { makeIeaDetail } from '@/entities/fetchIeaDetail/factories'
import { fetchIeaDetailApi } from '@/apis/fetchIeaDetail/'
import { IeaDetailReq,  Data } from '@/entities/fetchIeaDetail/interface/fetchIeaDetail'

type FetchIeaDetailType = (data: IeaDetailReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>

const fetchIeaDetailService: FetchIeaDetailType = adapter({
  request: fetchIeaDetailApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeIeaDetail(res.data)
    }
  },
  onError: (error) => {
    return {
      success: false,
      error
    }
  },
})

export default fetchIeaDetailService
