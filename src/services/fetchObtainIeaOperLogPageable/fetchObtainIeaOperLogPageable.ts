import adapter from '@/utils/adapter'
import { makeIeaObtainIeaOperLogPageable } from '@/entities/fetchObtainIeaOperLogPageable/factories/obtainIeaOperLogPageable'
import { fetchIeaObtainIeaOperLogPageableApi } from '@/apis/fetchObtainIeaOperLogPageable/'
import { IeaObtainIeaOperLogPageableReq,  IeaObtainIeaOperLogPageableResData } from '@/entities/fetchObtainIeaOperLogPageable/interface/index'

type FetchIeaObtainIeaOperLogPageableType = (data: IeaObtainIeaOperLogPageableReq) => Promise<{
  success: boolean;
  data: IeaObtainIeaOperLogPageableResData;
  error?: Error;
}>

const fetchIeaObtainIeaOperLogPageableService: FetchIeaObtainIeaOperLogPageableType = adapter({
  request: fetchIeaObtainIeaOperLogPageableApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeIeaObtainIeaOperLogPageable(res.data)
    }
  },
  onError: (error) => {
    return {
      success: false,
      error
    }
  },
})

export default fetchIeaObtainIeaOperLogPageableService
