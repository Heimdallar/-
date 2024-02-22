import request from '@/utils/request'

export const fetchPrivateSeaGetFeedbackTalkFailsApi = () => {
	return request('/youthcamp-mer-customer/merchant/customer/leads/privateSea/getFeedbackTalkFails', {
		method: 'post',
	})
};
