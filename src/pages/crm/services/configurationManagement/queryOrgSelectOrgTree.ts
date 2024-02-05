import adapter from '@/utils/adapter';
import { makeOrgSelectOrgTree } from '@/entities/configurationManagement/factories';
import { fetchOrgSelectOrgTreeApi } from '@/apis/configurationManagement/';
import type { Data } from '@/entities/configurationManagement/interface/queryOrgSelectOrgTree';

type FetchOrgSelectOrgTreeType = () => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchOrgSelectOrgTreeService: FetchOrgSelectOrgTreeType = adapter({
  request: fetchOrgSelectOrgTreeApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeOrgSelectOrgTree(res.data) || {},
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
export default fetchOrgSelectOrgTreeService;
