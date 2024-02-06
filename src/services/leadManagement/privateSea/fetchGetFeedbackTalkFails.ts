import adapter from '@/utils/adapter';
import { makePrivateSeaGetFeedbackTalkFails } from '@/entities/leadManagement/privateSea/factories';
import { fetchPrivateSeaGetFeedbackTalkFailsApi } from '@/apis/leadManagement/privateSea/';

type FetchPrivateSeaGetFeedbackTalkFailsType = () => Promise<{
  success: boolean;
  data: EnumOptions<string>[];
}>;
const fetchPrivateSeaGetFeedbackTalkFailsService: FetchPrivateSeaGetFeedbackTalkFailsType = adapter(
  {
    request: fetchPrivateSeaGetFeedbackTalkFailsApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: res.data.map(makePrivateSeaGetFeedbackTalkFails).filter(Boolean) || [],
      };
    },
    onError: () => {
      return {
        success: false,
        data: [],
      };
    },
  },
);
export default fetchPrivateSeaGetFeedbackTalkFailsService;
