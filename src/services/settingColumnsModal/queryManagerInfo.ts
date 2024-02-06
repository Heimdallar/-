import adapter from '@/utils/adapter';
import { makeMerchantQueryManagerInfo } from '@/entities/settingColumnsModal/factories';
import { fetchMerchantQueryManagerInfoApi } from '@/apis/settingColumnsModal/';
import type {
  QueryManagerInfoReq,
  Data,
} from '@/entities/settingColumnsModal/interface/queryManagerInfo';

type FetchMerchantQueryManagerInfoType = (data: QueryManagerInfoReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchMerchantQueryManagerInfoService: FetchMerchantQueryManagerInfoType = adapter({
  request: fetchMerchantQueryManagerInfoApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeMerchantQueryManagerInfo(res.data) || {},
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

export default fetchMerchantQueryManagerInfoService;
