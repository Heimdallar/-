import {requestApi } from '@/utils/request'

const API_PREFIX = '/merchant-customer'

export const fetchCategoryStyleList = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/audit/page`, {...queryParams}, 'POST')
}
// 更新类目
export const updateCategory = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/audit/addOrUpdate`, queryParams, 'POST')
}
// 获取中台初审配置
export const getMidGrdConfig = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/audit/center/query`, {}, 'POST')
}
// 更新中台初审配置
export const updateMidGrdConfig = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/audit/center/addOrUpdate`, queryParams, 'POST')
}