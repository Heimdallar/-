import {requestApi } from '@/utils/request'

const API_PREFIX = '/merchant-customer'

export const fetchLabelList = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/label/clue/manage/queryLabelList`, {...queryParams}, 'POST')
}
// 更新标签状态
export const updateLabelStatus = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/label/clue/manage/updateLabelStatus`, queryParams, 'POST')
}
// 更新标签
export const updateLabel = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/label/clue/manage/editLabel`, queryParams, 'POST')
}