import adapter from '@/utils/adapter';
import { fetchClueGetfeedbackInvalidLeadsApi } from '@/apis/privateSea/';
import { makePrivateSeaGetFeedbackTalkFails } from '@/entities/publicSea/factories';

type FetchClueGetfeedbackInvalidLeadsType = () => Promise<{
  success: boolean;
  data: { label: string; value: number }[];
}>;
const fetchClueGetfeedbackInvalidLeadsService: FetchClueGetfeedbackInvalidLeadsType = adapter({
  request: fetchClueGetfeedbackInvalidLeadsApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makePrivateSeaGetFeedbackTalkFails(res?.data || [])?.filter(Boolean) || [],
    };
  },
  onError: () => {
    return {
      success: false,
      data: [],
    };
  },
});
export default fetchClueGetfeedbackInvalidLeadsService;
