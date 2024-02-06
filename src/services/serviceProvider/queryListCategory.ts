import adapter from '@/utils/adapter';
import { makeServiceProviderListCategory } from '@/entities/serviceProvider/factories';
import { fetchServiceProviderListCategoryApi } from '@/apis/serviceProvider/';
import type {
  ServiceProviderListCategoryReq,
  Datum,
} from '@/entities/serviceProvider/interface/queryListCategory';

type FetchServiceProviderListCategoryType = (data: ServiceProviderListCategoryReq) => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>;
const fetchServiceProviderListCategoryService: FetchServiceProviderListCategoryType = adapter({
  request: fetchServiceProviderListCategoryApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.map(makeServiceProviderListCategory).filter(Boolean) || [],
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
export default fetchServiceProviderListCategoryService;
