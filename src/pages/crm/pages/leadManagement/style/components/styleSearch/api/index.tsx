import {requestApi } from '@/utils/request'
const API_PREFIX = '/merchant-customer'

export const getStyleSelectList = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/style`, {...queryParams}, 'GET')
}