import request from '@/utils/request';

export const fetchGetApi = (data: any) => {
  return request('/youthcamp-mer-customer/merchant/customer/post', {
    method: 'post',
    data,
  });
};

export const fetchPostApi = (params: any) => {
  return request('/youthcamp-mer-customer/merchant/customer/get', {
    method: 'get',
    params,
  });
};
