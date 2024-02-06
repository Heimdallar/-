import adapter from '@/utils/adapter';
import { makePlatformManagerQuery } from '@/entities/leadManagement/categoryConfig/factories';
import { fetchPlatformManagerQueryApi } from '@/apis/leadManagement/categoryConfig/';
import type { Datum } from '@/entities/leadManagement/categoryConfig/interface/fetchQueryPlatformManager';

type FetchPlatformManagerQueryType = () => Promise<{
  success: boolean;
  data: Datum[];
}>;
const fetchPlatformManagerQueryService: FetchPlatformManagerQueryType = adapter({
  request: fetchPlatformManagerQueryApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.map(makePlatformManagerQuery).filter(Boolean) || [],
    };
  },
  onError: () => {
    return {
      success: false,
      data: [],
    };
  },
});
export default fetchPlatformManagerQueryService;
