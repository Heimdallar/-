import {requestApi } from '@/utils/request'

const API_PREFIX = '/youthcamp-mer-customer'

export const fetchCategoryStyleList = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/brand/category/list`, {...queryParams}, 'POST')
}
// 更新类目风格
export const updateStyle = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/brand/category/addOrUpdate`, queryParams, 'POST')
}