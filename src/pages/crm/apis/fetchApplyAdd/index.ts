import { ApplyAddReq } from '@/entities/fetchApplyAdd/interface/fetchApplyAdd'
import request from '@/utils/request'

export const fetchApplyAddApi = (data: ApplyAddReq) => {
	return request('/merchant/customer/brand/apply/add', {
		method: 'post',
		data,
	})
};
