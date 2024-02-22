import type { DeleteBrandReq } from '@/entities/settleIn/interface/deleteBrand';
import request from '@/utils/request';

export const fetchDeleteBrandApi = (data: DeleteBrandReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/recruit/brand/delete', {
    method: 'post',
    data,
  });
};
