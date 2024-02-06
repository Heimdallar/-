import { ChannelSaveReq } from '@/entities/channelManagement/interface/channelSave';
import request from '@/utils/request';

export const fetchChannelSaveApi = (data: ChannelSaveReq) => {
  return request('/merchant-customer/merchant/customer/plan/channel/save', {
    method: 'post',
    data,
  });
};

export const fetchChannelObtainChannelsApi = (params) => {
  return request('/merchant-customer/merchant/customer/plan/channel/obtainChannels', {
    method: 'POST',
    params,
  });
};
