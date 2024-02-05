import { ApplyPageReq } from '@/entities/fetchApplyPage/interface/index'
import request from '@/utils/request'

export const fetchApplyPageApi = (data: ApplyPageReq) => {
	return request('/merchant/customer/brand/apply/page', {
		method: 'post',
		data,
	})
};
