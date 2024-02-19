import adapter from '@/utils/adapter';
import { makeIeaObtainMeetings } from '@/entities/attractinvestment/factories';
import { fetchIeaObtainMeetingsApi } from '@/apis/attractinvestment/';
import { Datum } from '@/entities/attractinvestment/interface/queryObtainMeetings';

type FetchIeaObtainMeetingsType = () => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>;
const fetchIeaObtainMeetingsService: FetchIeaObtainMeetingsType = adapter({
  request: fetchIeaObtainMeetingsApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data.map(makeIeaObtainMeetings).filter(Boolean) || [],
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
export default fetchIeaObtainMeetingsService;
