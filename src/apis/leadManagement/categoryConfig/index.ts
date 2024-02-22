import type { PlatformManagerAddOrUpdateReq } from '@/entities/leadManagement/categoryConfig/interface/fetchPlatformManagerAddOrUpdate';
import request from '@/utils/request';

export const fetchPlatformManagerQueryApi = () => {
  return request('/youthcamp-mer-customer/merchant/customer/clue/category/platformManager/query', {
    method: 'post',
  });
};

export const fetchPlatformManagerAddOrUpdateApi = (data: PlatformManagerAddOrUpdateReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/clue/category/platformManager/addOrUpdate', {
    method: 'post',
    data,
  });
};
