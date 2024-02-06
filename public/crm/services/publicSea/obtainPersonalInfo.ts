import adapter from '@/utils/adapter';
import { makeClueObtainPersonalInfo } from '@/entities/publicSea/factories';
import { fetchClueObtainPersonalInfoApi } from '@/apis/publicSea/';
import type {
  ClueObtainPersonalInfoReq,
  Data,
} from '@/entities/publicSea/interface/obtainPersonalInfo';

type FetchClueObtainPersonalInfoType = (data: ClueObtainPersonalInfoReq) => Promise<{
  success: boolean;
  data: Data[];
  error?: Data | Error;
}>;
const fetchClueObtainPersonalInfoService: FetchClueObtainPersonalInfoType = adapter({
  request: fetchClueObtainPersonalInfoApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data?.map(makeClueObtainPersonalInfo) || [],
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: [],
      error,
    };
  },
});
export default fetchClueObtainPersonalInfoService;
