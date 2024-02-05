import adapter from '@/utils/adapter'
import { fetchIeaObtainIeaInfoPageableApi } from '@/apis/fetchObtainIeaInfoPageable/'
import { IeaObtainIeaInfoPageableReq, IeaObtainIeaInfoPageableResData } from '@/entities/fetchObtainIeaInfoPageable/interface/index'

type FetchIeaObtainIeaInfoPageableType = (data: IeaObtainIeaInfoPageableReq) => Promise<{
  success: boolean;
  data: IeaObtainIeaInfoPageableResData;
  error?: Error;
}>

const fetchIeaObtainIeaInfoPageableService: FetchIeaObtainIeaInfoPageableType = adapter({
  request: fetchIeaObtainIeaInfoPageableApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data
    }
  },
  onError: (error) => {
    return {
      success: false,
      error
    }
  },
})

export default fetchIeaObtainIeaInfoPageableService
