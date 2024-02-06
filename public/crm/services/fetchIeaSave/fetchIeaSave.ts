import adapter from '@/utils/adapter'
import { fetchIeaSaveApi } from '@/apis/fetchIeaSave/'
import { IeaSaveReq,   } from '@/entities/fetchIeaSave/interface/fetchIeaSave'

type FetchIeaSaveType = (data: IeaSaveReq) => Promise<{
  success: boolean;
  data: number;
  error?: number | Error;
}>

const fetchIeaSaveService: FetchIeaSaveType = adapter({
  request: fetchIeaSaveApi,
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

export default fetchIeaSaveService
