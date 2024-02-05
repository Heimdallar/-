import adapter from '@/utils/adapter';
import { makeOrgSelectOrgDataRole } from '@/entities/configurationManagement/factories';
import { fetchOrgSelectOrgDataRoleApi } from '@/apis/configurationManagement/';
import type {
  OrgSelectOrgDataRoleReq,
  Data,
} from '@/entities/configurationManagement/interface/querySelectOrgDataRole';

type FetchOrgSelectOrgDataRoleType = (data: OrgSelectOrgDataRoleReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgSelectOrgDataRoleService: FetchOrgSelectOrgDataRoleType = adapter({
  request: fetchOrgSelectOrgDataRoleApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeOrgSelectOrgDataRole(res.data) || {},
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
export default fetchOrgSelectOrgDataRoleService;
