import adapter from '@/utils/adapter';
import { fetchClueFeedbackTalkProgressApi } from '@/apis/privateSea/';
import type { ClueFeedbackTalkProgressReq } from '@/entities/privateSea/interface/feedbackTalkProgress';

type FetchClueFeedbackTalkProgressType = (data: ClueFeedbackTalkProgressReq) => Promise<{
  success: boolean;
  data: string;
}>;
const fetchClueFeedbackTalkProgressService: FetchClueFeedbackTalkProgressType = adapter({
  request: fetchClueFeedbackTalkProgressApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
    };
  },
  onError: () => {
    return {
      success: false,
      data: '',
    };
  },
});
export default fetchClueFeedbackTalkProgressService;
