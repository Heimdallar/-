import adapter from '@/utils/adapter';
import { fetchChannelFetchRecommendLinkAndCreateChannelApi } from '@/apis/base/';
import type { Data } from '@/entities/base/interface/fetchRecommendLinkAndCreateChannel';

type FetchChannelFetchRecommendLinkAndCreateChannelType = () => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchChannelFetchRecommendLinkAndCreateChannelService: FetchChannelFetchRecommendLinkAndCreateChannelType =
  adapter({
    request: fetchChannelFetchRecommendLinkAndCreateChannelApi,
    onSuccess: (res) => {
      return {
        success: true,
        data: res?.data || '',
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
export default fetchChannelFetchRecommendLinkAndCreateChannelService;
