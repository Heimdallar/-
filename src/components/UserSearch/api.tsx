import {requestApi } from '@/utils/request'

export const getUserList = (queryParams: any) => {
  return requestApi(`/merchant/admin/merchant/queryManagerInfo`, {...queryParams}, 'GET')
}
