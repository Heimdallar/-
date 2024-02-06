import adapter from '@/utils/adapter';
import { fetchServiceProviderAddOrUpdateApi } from '@/apis/serviceProvider/index';
import type {
  AddOrUpdateReq,
  Error,
  AddOrUpdateRes,
} from '@/entities/serviceProvider/interface/queryServiceProviderADDUpdate';

type FetchServiceProviderAddOrUpdateType = (data: AddOrUpdateReq) => Promise<{
  success: boolean;
  data: AddOrUpdateRes;
  error?: AddOrUpdateRes | Error;
}>;
const fetchServiceProviderAddOrUpdateService: FetchServiceProviderAddOrUpdateType = adapter({
  request: fetchServiceProviderAddOrUpdateApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
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
export default fetchServiceProviderAddOrUpdateService;
