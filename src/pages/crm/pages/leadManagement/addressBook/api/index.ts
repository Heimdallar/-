import {requestApi } from '@/utils/request'

const API_PREFIX = '/merchant-customer'

export const fetchAddressList = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/op/page`, {...queryParams}, 'POST')
}
// 查看脱敏信息
export const viewSecret = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/op/queryOpInfo`, queryParams, 'POST')
}
// 新增通讯录项
export const createAddress = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/op/add`, queryParams, 'POST')
}
// 更新通讯录项
export const updateAddress = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/op/update`, queryParams, 'POST')
}