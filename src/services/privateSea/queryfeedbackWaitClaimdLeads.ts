import adapter from '@/utils/adapter';
import { fetchClueGetfeedbackWaitClaimdLeadsApi } from '@/apis/privateSea/';
import { makePrivateSeaGetFeedbackTalkFails } from '@/entities/publicSea/factories';
import type { Datum } from '@/entities/privateSea/interface/queryfeedbackWaitClaimdLeads';

type FetchClueGetfeedbackWaitClaimdLeadsType = () => Promise<{
  success: boolean;
  data: Datum[];
  error?: Datum[] | Error;
}>;
const fetchClueGetfeedbackWaitClaimdLeadsService: FetchClueGetfeedbackWaitClaimdLeadsType = adapter(
  {
    request: fetchClueGetfeedbackWaitClaimdLeadsApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: makePrivateSeaGetFeedbackTalkFails(res?.data || [])?.filter(Boolean) || [],
      };
    },
    onError: (error) => {
      return {
        success: false,
        data: [],
        error,
      };
    },
  },
);
export default fetchClueGetfeedbackWaitClaimdLeadsService;
