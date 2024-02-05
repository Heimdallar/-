import { IeaSaveReq } from '@/entities/fetchIeaSave/interface/fetchIeaSave'
import request from '@/utils/request'

export const fetchIeaSaveApi = (data: IeaSaveReq) => {
	return request('/merchant-customer/merchant/customer/iea/save', {
		method: 'post',
		data,
	})
};
