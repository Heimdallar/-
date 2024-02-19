import adapter from '@/utils/adapter'
import { makeIeaObtainIeaPageInfo } from '@/entities/attractinvestment/factories'
import { fetchIeaObtainIeaPageInfoApi } from '@/apis/attractinvestment/'
import { IeaObtainIeaPageInfoReq, Data } from '@/entities/attractinvestment/interface/obtainIeaPageInfo'

type FetchIeaObtainIeaPageInfoType = (data: IeaObtainIeaPageInfoReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>
const fetchIeaObtainIeaPageInfoService: FetchIeaObtainIeaPageInfoType = adapter({
  request: fetchIeaObtainIeaPageInfoApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeIeaObtainIeaPageInfo(res.data) || {},
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
export default fetchIeaObtainIeaPageInfoService
