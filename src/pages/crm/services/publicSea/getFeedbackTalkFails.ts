import adapter from '@/utils/adapter';
import { makePrivateSeaGetFeedbackTalkFails } from '@/entities/publicSea/factories';
import { fetchPrivateSeaGetFeedbackTalkFailsApi } from '@/apis/publicSea/';

interface failResonOptionsType {
  label: string;
  value: number;
  children?: failResonOptionsType[];
}

type FetchPrivateSeaGetFeedbackTalkFailsType = () => Promise<{
  success: boolean;
  data: failResonOptionsType[];
  error?: failResonOptionsType[] | Error;
}>;
const fetchPrivateSeaGetFeedbackTalkFailsService: FetchPrivateSeaGetFeedbackTalkFailsType = adapter(
  {
    request: fetchPrivateSeaGetFeedbackTalkFailsApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: makePrivateSeaGetFeedbackTalkFails(res?.data || {})?.filter(Boolean) || [],
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
export default fetchPrivateSeaGetFeedbackTalkFailsService;
