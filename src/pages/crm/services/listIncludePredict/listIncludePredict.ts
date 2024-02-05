import adapter from '@/utils/adapter';
import { makeIncludePredict } from '@/entities/listIncludePredict/factories';
import { fetchIncludePredictApi } from '@/apis/listIncludePredict/';
import type {
  IncludePredictReq,
  Content,
} from '@/entities/listIncludePredict/interface/listIncludePredict';

type FetchIncludePredictType = (data: IncludePredictReq) => Promise<{
  success: boolean;
  data: Content[];
  total?: number;
  error?: Content | Error;
}>;
const fetchIncludePredictService: FetchIncludePredictType = adapter({
  request: fetchIncludePredictApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.contents?.map(makeIncludePredict).filter(Boolean) || [],
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
export default fetchIncludePredictService;
