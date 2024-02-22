import { IeaObtainIeaInfoPageableReq } from '@/entities/fetchObtainIeaInfoPageable/interface/index'
import request from '@/utils/request'

export const fetchIeaObtainIeaInfoPageableApi = (data: IeaObtainIeaInfoPageableReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/iea/obtainIeaInfoPageable', {
    method: 'post',
    data,
  })
};
