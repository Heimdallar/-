import {requestApi } from '@/utils/request'

const API_PREFIX = '/merchant-customer'

export const fetchCategoryConfigList = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/clue/category/queryPage`, {...queryParams}, 'POST')
}
// 更新类目
export const updateCategory = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/clue/category/addOrUpdate`, queryParams, 'POST')
}
// 获取自动认领运营配置
export const getAutoAllocate = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/clue/category/autoAllocate/queryPage`, {}, 'POST')
}
// 更新自动认领运营配置
export const updateAutoAllocate = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/clue/category/autoAllocate/addOrUpdate`, queryParams, 'POST')
}