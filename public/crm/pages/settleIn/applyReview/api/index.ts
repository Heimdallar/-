import { requestApi } from '@/utils/request';
import {
  IApplyDetailParams,
  IBatchReviewParams,
  IExportApproveDataParams,
  IImportDataParams,
  IListParams,
  IModifyReviewReviewParams,
  IRemarkReviewParams,
  IReviewParams,
} from '../interface';

const API_PREFIX = '/youthcamp-mer-customer';

/* 获取评审(审批)列表 */
export const getApprovalList = (params: IListParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/approval/search`, params, 'POST');

/* 评审(审批) */
export const approvalReview = (params: IReviewParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/approval/review`, params, 'POST');

/* 批量评审(审批) */
export const approvalBatchReview = (params: IBatchReviewParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/approval/batchReview`, params, 'POST');

/* 修改评审结果 */
export const modifyReviewResult = (params: IModifyReviewReviewParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/approval/modifyReviewResult`, params, 'POST');

/* 添加备注 */
export const remarkReview = (params: IRemarkReviewParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/approval/remark`, params, 'POST');

/* 获取申请单详情 */
export const getApplyDetail = (params: IApplyDetailParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/detail`, params, 'GET');

/* 导出评审(审批)单 */
export const exportApproveData = (params: IExportApproveDataParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/file/task/exportApproveData`, params, 'POST');

/* 导入文件 */
export const importData = (params: IImportDataParams): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/file/task/importData`, params, 'POST');

/* 获取品牌类目分类列表 (475版本：评审单页面改用这个接口) */
export const getBrandApplyCategoryList = (): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/approval/queryBrandApplyCategoryList`, undefined,'GET');

// 删除申请单
export const deleteTicket = (params: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/delete`, params, 'POST');

/* 走任务中心导出 */
export const importTask = (params: any) =>
  requestApi('/merchant-bpc/task-center/submitTask', params, 'POST');
