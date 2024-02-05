import adapter from '@/utils/adapter';
import { fetchOrgAddUpdateOrgUserApi } from '@/apis/configurationManagement/';
import type {
  OrgAddUpdateOrgUserReq,
  Data,
} from '@/entities/configurationManagement/interface/addUpdateOrgUser';

type FetchOrgAddUpdateOrgUserType = (data: OrgAddUpdateOrgUserReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgAddUpdateOrgUserService: FetchOrgAddUpdateOrgUserType = adapter({
  request: fetchOrgAddUpdateOrgUserApi,
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
export default fetchOrgAddUpdateOrgUserService;
