import adapter from '@/utils/adapter'
import { makeIeaSubmit } from '@/entities/attractinvestment/factories'
import { fetchIeaSubmitApi } from '@/apis/attractinvestment/'
import { IeaSubmitReq, Data } from '@/entities/attractinvestment/interface/fetchSubmit'

type FetchIeaSubmitType = (data: IeaSubmitReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>
const fetchIeaSubmitService: FetchIeaSubmitType = adapter({
  request: fetchIeaSubmitApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeIeaSubmit(res.data) || {},
    }
  },
  onError: (error) => {
    return {
      success: false,
      data: {},
      error
    }
  },
})
export default fetchIeaSubmitService
