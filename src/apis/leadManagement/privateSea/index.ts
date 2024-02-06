import request from '@/utils/request'

export const fetchPrivateSeaGetFeedbackTalkFailsApi = () => {
	return request('/merchant-customer/merchant/customer/leads/privateSea/getFeedbackTalkFails', {
		method: 'post',
	})
};
