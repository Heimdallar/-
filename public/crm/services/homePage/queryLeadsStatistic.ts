import adapter from '@/utils/adapter';
import { makeStatisticIndex } from '@/entities/homePage/factories';
import { fetchStatisticIndexApi } from '@/apis/homePage/';
import type { StatisticIndexReq, Data } from '@/entities/homePage/interface/queryLeadsStatistic';

type FetchStatisticIndexType = (data: StatisticIndexReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchStatisticIndexService: FetchStatisticIndexType = adapter({
  request: fetchStatisticIndexApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeStatisticIndex(res.data) || {},
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
export default fetchStatisticIndexService;
