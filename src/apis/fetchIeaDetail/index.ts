import { IeaDetailReq } from '@/entities/fetchIeaDetail/interface/fetchIeaDetail'
import request from '@/utils/request'

export const fetchIeaDetailApi = (data: IeaDetailReq) => {
	return request('/merchant-customer/merchant/customer/iea/detail', {
		method: 'post',
		data,
	})
};
