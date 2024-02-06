import adapter from '@/utils/adapter';
import { makeOrgSelectOrgUser } from '@/entities/configurationManagement/factories';
import { fetchOrgSelectOrgUserApi } from '@/apis/configurationManagement/';
import type {
  OrgSelectOrgUserReq,
  Data,
} from '@/entities/configurationManagement/interface/querySelectOrgUser';

type FetchOrgSelectOrgUserType = (data: OrgSelectOrgUserReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgSelectOrgUserService: FetchOrgSelectOrgUserType = adapter({
  request: fetchOrgSelectOrgUserApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeOrgSelectOrgUser(res.data) || {},
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
export default fetchOrgSelectOrgUserService;
