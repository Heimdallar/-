import adapter from '@/utils/adapter';
import { fetchOrgAddOrUpdateApi } from '@/apis/configurationManagement/';
import type {
  OrgAddOrUpdateReq,
  Data,
} from '@/entities/configurationManagement/interface/addOrUpdateOrg';

type FetchOrgAddOrUpdateType = (data: OrgAddOrUpdateReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgAddOrUpdateService: FetchOrgAddOrUpdateType = adapter({
  request: fetchOrgAddOrUpdateApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data || {},
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
export default fetchOrgAddOrUpdateService;
