import { IeaObtainIeaOperLogPageableReq } from '@/entities/fetchObtainIeaOperLogPageable/interface/index'
import request from '@/utils/request'

export const fetchIeaObtainIeaOperLogPageableApi = (data: IeaObtainIeaOperLogPageableReq) => {
	return request('/youthcamp-mer-customer/merchant/customer/iea/obtainIeaOperLogPageable', {
		method: 'post',
		data,
	})
};
