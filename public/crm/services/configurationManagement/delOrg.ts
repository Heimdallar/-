import adapter from '@/utils/adapter';
import { fetchOrgDelOrgApi } from '@/apis/configurationManagement/';
import type { OrgDelOrgReq, Data } from '@/entities/configurationManagement/interface/delOrg';

type FetchOrgDelOrgType = (data: OrgDelOrgReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgDelOrgService: FetchOrgDelOrgType = adapter({
  request: fetchOrgDelOrgApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
      code: res.code,
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: {},
      error,
    };
  },
});
export default fetchOrgDelOrgService;
