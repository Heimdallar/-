import request from '@/utils/request';
import type { DelReq } from '@/entities/serviceProvider/interface/delServiceProvider';
import type { AddOrUpdateReq } from '@/entities/serviceProvider/interface/queryServiceProviderADDUpdate';
import type { PageReq } from '@/entities/serviceProvider/interface/queryServiceProviderList';

export const fetchServiceProviderPageApi = (data: PageReq) => {
  return request('/merchant-customer/merchant/customer/org/service_provider/page', {
    method: 'post',
    data,
  });
};

export const fetchServiceProviderAddOrUpdateApi = (data: AddOrUpdateReq) => {
  return request('/merchant-customer/merchant/customer/org/service_provider/addOrUpdate', {
    method: 'post',
    data,
  });
};

export const fetchServiceProviderDelApi = (data: DelReq) => {
  return request('/merchant-customer/merchant/customer/org/service_provider/del', {
    method: 'post',
    data,
  });
};

export const fetchCategoryListApi = (data) => {
  return request('/commodity-admin/admin/category/list', {
    method: 'post',
    data,
  });
};

export const fetchServiceProviderListCategoryApi = (params) => {
  return request('/merchant-customer/merchant/customer/org/service_provider/listCategory', {
    method: 'get',
    params,
  });
};

export const fetchAddPermissionDataApi = (data) => {
  return request('/merchant-customer/merchant/customer/user/permission_data/add', {
    method: 'post',
    data,
  });
};

export const fetchPermissionDataPageApi = (data) => {
  return request('/merchant-customer/merchant/customer/user/permission_data/page', {
    method: 'post',
    data,
  });
};

export const fetchUpdateStatusApi = (data) => {
  return request('/merchant-customer/merchant/customer/user/permission_data/updateStatus', {
    method: 'post',
    data,
  });
};

export const fetchUpdatePermissionDataApi = (data) => {
  return request('/merchant-customer/merchant/customer/user/permission_data/update', {
    method: 'post',
    data,
  });
};

export const fetchPermissionDataListAllCategoryApi = (params) => {
  return request('/merchant-customer/merchant/customer/user/permission_data/listAllCategory', {
    method: 'get',
    params,
  });
};
