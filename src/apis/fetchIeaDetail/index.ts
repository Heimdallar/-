import { IeaDetailReq } from '@/entities/fetchIeaDetail/interface/fetchIeaDetail'
import request from '@/utils/request'

export const fetchIeaDetailApi = (data: IeaDetailReq) => {
	return request('/youthcamp-mer-customer/merchant/customer/iea/detail', {
		method: 'post',
		data,
	})
};
