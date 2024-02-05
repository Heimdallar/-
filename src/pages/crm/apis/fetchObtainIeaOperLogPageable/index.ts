import { IeaObtainIeaOperLogPageableReq } from '@/entities/fetchObtainIeaOperLogPageable/interface/index'
import request from '@/utils/request'

export const fetchIeaObtainIeaOperLogPageableApi = (data: IeaObtainIeaOperLogPageableReq) => {
	return request('/merchant-customer/merchant/customer/iea/obtainIeaOperLogPageable', {
		method: 'post',
		data,
	})
};
