import adapter from '@/utils/adapter'
import { fetchIeaAuditApi } from '@/apis/fetchIeaAudit/'
import { IeaAuditReq,   } from '@/entities/fetchIeaAudit/interface/fetchIeaAudit'

type FetchIeaAuditType = (data: IeaAuditReq) => Promise<{
  success: boolean;
  data: boolean;
  error?: boolean | Error;
}>

const fetchIeaAuditService: FetchIeaAuditType = adapter({
  request: fetchIeaAuditApi,
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

export default fetchIeaAuditService
