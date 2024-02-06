
import { requestApi } from '@/utils/request';
import { IApplyDetailParams } from '../interface';

const API_PREFIX = '/merchant-customer';

/* 获取申请单详情 */
export const getApplyDetail = (params: IApplyDetailParams): Promise<any> =>
requestApi(
   `${API_PREFIX}/merchant/customer/brand/apply/detail`,
    params,
    'GET',
  )