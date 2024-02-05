import adapter from '@/utils/adapter';
import { makeOrgSelectOrgInfo } from '@/entities/configurationManagement/factories';
import { fetchOrgSelectOrgInfoApi } from '@/apis/configurationManagement/';
import type {
  OrgSelectOrgInfoReq,
  Data,
} from '@/entities/configurationManagement/interface/querySelectOrgInfo';

type FetchOrgSelectOrgInfoType = (data: OrgSelectOrgInfoReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgSelectOrgInfoService: FetchOrgSelectOrgInfoType = adapter({
  request: fetchOrgSelectOrgInfoApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeOrgSelectOrgInfo(res.data) || {},
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
export default fetchOrgSelectOrgInfoService;
