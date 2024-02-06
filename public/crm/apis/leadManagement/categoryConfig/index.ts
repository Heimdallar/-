import type { PlatformManagerAddOrUpdateReq } from '@/entities/leadManagement/categoryConfig/interface/fetchPlatformManagerAddOrUpdate';
import request from '@/utils/request';

export const fetchPlatformManagerQueryApi = () => {
  return request('/merchant-customer/merchant/customer/clue/category/platformManager/query', {
    method: 'post',
  });
};

export const fetchPlatformManagerAddOrUpdateApi = (data: PlatformManagerAddOrUpdateReq) => {
  return request('/merchant-customer/merchant/customer/clue/category/platformManager/addOrUpdate', {
    method: 'post',
    data,
  });
};
