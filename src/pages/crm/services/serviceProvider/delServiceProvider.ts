import adapter from '@/utils/adapter';
import { fetchServiceProviderDelApi } from '@/apis/serviceProvider/index';
import type {
  ServiceProviderDelReq,
  Data,
} from '@/entities/serviceProvider/interface/delServiceProvider';

type FetchServiceProviderDelType = (data: ServiceProviderDelReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchServiceProviderDelService: FetchServiceProviderDelType = adapter({
  request: fetchServiceProviderDelApi,
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
export default fetchServiceProviderDelService;
