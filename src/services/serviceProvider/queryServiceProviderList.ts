import adapter from '@/utils/adapter';
import { makeServiceProviderList } from '@/entities/serviceProvider/factories';
import { fetchServiceProviderPageApi } from '@/apis/serviceProvider/index';
import type {
  ServiceProviderPageReq,
  Content,
} from '@/entities/serviceProvider/interface/queryServiceProviderList';

type FetchServiceProviderPageType = (data: ServiceProviderPageReq) => Promise<{
  success: boolean;
  data: Content;
  total?: number;
  error?: Content | Error;
}>;
const fetchServiceProviderPageService: FetchServiceProviderPageType = adapter({
  request: fetchServiceProviderPageApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.contents?.map(makeServiceProviderList).filter(Boolean) || [],
      total: res.data.total,
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: [],
      total: 0,
      error,
    };
  },
});
export default fetchServiceProviderPageService;
