import { IeaAuditReq } from '@/entities/fetchIeaAudit/interface/fetchIeaAudit'
import request from '@/utils/request'

export const fetchIeaAuditApi = (data: IeaAuditReq) => {
	return request('/merchant-customer/merchant/customer/iea/audit', {
		method: 'post',
		data,
	})
};
