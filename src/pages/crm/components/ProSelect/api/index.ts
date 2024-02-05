import {requestApi } from '@/utils/request'

// 获取一级类目信息
export const getCategoryList = (queryParams: any) => {
  return requestApi(`/commodity-admin/admin/category/list`, queryParams, 'POST')
}
// 获取用户信息
export const getUserList = (queryParams: any) => {
  return requestApi(`/merchant/admin/merchant/queryManagerInfo`, queryParams, 'GET')
}

