import request from '@/utils/request';

export const fetchChannelFetchRecommendLinkAndCreateChannelApi = () => {
  return request(
    '/youthcamp-mer-customer/merchant/customer/plan/channel/fetchRecommendLinkAndCreateChannel',
    {
      method: 'post',
    },
  );
};
