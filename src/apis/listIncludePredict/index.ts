import type { IncludePredictReq } from '@/entities/listIncludePredict/interface/listIncludePredict';
import request from '@/utils/request';

export const fetchIncludePredictApi = (data: IncludePredictReq) => {
  return request('/merchant-customer/merchant/customer/recruit/brand/list/include/predict', {
    method: 'post',
    data,
  });
};
