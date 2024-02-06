import {requestApi } from '@/utils/request'
import { IListParams, IFileDownloadParams } from '../interface'

const API_PREFIX = '/merchant-customer'

export const fetchTaskList = (queryParams: IListParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/file/task/page`, {...queryParams}, 'POST')
}

export const findUrlByfileIdAndKey = (queryParams: IFileDownloadParams): Promise<string> => {
  return requestApi(`${API_PREFIX}/merchant/customer/file/task/findUrlById`, queryParams, 'POST')
}