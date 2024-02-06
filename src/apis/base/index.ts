import request from '@/utils/request';

export const fetchChannelFetchRecommendLinkAndCreateChannelApi = () => {
  return request(
    '/merchant-customer/merchant/customer/plan/channel/fetchRecommendLinkAndCreateChannel',
    {
      method: 'post',
    },
  );
};
