import { IeaInvaildReq } from '@/entities/fetchIeaInvaildService/interface/index'
import request from '@/utils/request'

export const fetchIeaInvaildApi = (data: IeaInvaildReq) => {
	return request('/merchant-customer/merchant/customer/iea/invaild', {
		method: 'post',
		data,
	})
};
