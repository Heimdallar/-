import adapter from '@/utils/adapter'
import { fetchIeaInvaildApi } from '@/apis/fetchIeaInvaildService/'
import { IeaInvaildReq } from '@/entities/fetchIeaInvaildService/interface'

type FetchIeaInvaildType = (data: IeaInvaildReq) => Promise<{
  success: boolean;
  data: boolean;
  error?: boolean | Error;
}>

const fetchIeaInvaildService: FetchIeaInvaildType = adapter({
  request: fetchIeaInvaildApi,
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

export default fetchIeaInvaildService
