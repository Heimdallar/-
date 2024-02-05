import { importTask } from '@/pages/settleIn/applyReview/api';
import { IAuthBusinessDeveloperParams, IAuthParams, IAuthTargetBdParams, IBatchTransferParams, ICategoryListParams, IDetailParams, IEntryInfoParams, IExportParams, IFeedBackParams, IFollowUpParams, IListParams, IManagerInfoParams, IQueryMsgParams, IReviewParams, ISaveAccountParams, ITopParams, ITransferParams } from '../interface';
import { requestApi } from '@/utils/request';

const API_PREFIX = '/merchant-customer'

/* 获取私海线索列表 */
export const getPrivateSeaQueryList = (params: IListParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/queryList`,
    {...params},
   'POST',
  )

/* 转移 */
export const transferPrivateSea = (params: ITransferParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/transfer`,
    {...params},
   'POST',
    '转移成功',
  )

/* 批量转移 */
export const batchTransferPrivateSea = (
  params: IBatchTransferParams,
): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/batchTransfer`,
    {...params},
   'POST',
  )

/* 反馈 */
export const feedBackPrivateSea = (
  params: IFeedBackParams,
  successMsg?: string,
): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/feedBack`,
    {...params},
   'POST',
    successMsg || '反馈成功',
  )

/* 跟进 */
export const followUpPrivateSea = (params: IFollowUpParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/followUp`,
    {...params},
   'POST',
   '跟进成功',
  )

/* 评审 */
export const reviewPrivateSea = (params: IReviewParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/review`,
    {...params},
   'POST',
   '评审成功',
  )

/* 获取私海线索详情 */
export const getPrivateSeaQueryDetail = (params: IDetailParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/queryDetail`,
    {...params},
   'POST',
  )

/* 根据customerId校验是否有权限 (暂时用不到) */
export const checkCustomerAuth = (params: IAuthParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/auth`,
    params,
    'GET',
  )

/* 校验target用户是否有customerSea对应的类目权限 */
export const checkCustomerAuthTargetBd = (
  params: IAuthTargetBdParams,
): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/authTargetBd`,
    params,
    'GET',
  )

/* 校验跟进人 */
export const checkCustomerAuthBusinessDeveloper = (
  params: IAuthBusinessDeveloperParams,
): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/authBusinessDeveloper`,
    params,
    'GET',
  )

/* 获取类目列表 (gondor项目复制而来) */
export const getCategoryList = (params: ICategoryListParams): Promise<any> =>
  requestApi(
    '/commodity-admin/admin/category/list',
    {...params},
   'POST',
  )

/* 获取管理者数据 (gondor项目复制而来) */
export const getManagerInfo = (params: IManagerInfoParams): Promise<any> =>
  requestApi(
    '/merchant/admin/merchant/queryManagerInfo',
    params,
    'GET',
  )

/* 获取未脱敏的手机号码等信息 */
export const queryWholeMsg = (params: IQueryMsgParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/queryCustomerSeaPhone`,
    {...params},
   'POST',
  )

// 查看操作日志
export const getLog = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/log`,
    {...params},
   'POST',
  )

// 判断当前操作者是否为线索BD
export const checkBD = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/authBusinessDeveloper`,
    params,
    'GET',
  )

// 查看私海统计
export const getOverview = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/statistics`,
    {...params},
   'POST',
  )

// 设置置顶
export const setTop = (params: ITopParams) =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/setTop`,
    {...params},
   'POST',
  )

// 设置置顶
export const cancelTop = (params: ITopParams) =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/cancelTop`,
    {...params},
   'POST',
  )

/* 获取新版私海线索详情 */
export const getNewPrivateSeaQueryDetail = (
  params: IDetailParams,
): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/queryDesDetail`,
    {...params},
   'POST',
  )

/* 导出私海线索 */
export const exportCustomerSeaData = (params: IExportParams) =>
  requestApi(
    `${API_PREFIX}/merchant/customer/file/task/exportCustomerSeaData`,
    {...params},
   'POST',
  )

/* 导出私海线索 */
export const exportCustomerPrivateSeaData = (param: IExportParams) => {
  return  importTask({
    taskTemplateCode: `merchant_leads_private_export`,
    taskName: `私海线索导出`,
    param,
  });
}
/* 输入账号查询商家入驻信息 */
export const getEntryInfo = (params: IEntryInfoParams): Promise<any> => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/getEntryInfo`,
    params,
    'GET',
  )
}

/* 保存商家账号信息 */
export const saveAccount = (params: ISaveAccountParams): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/saveAccount`,
    {...params},
   'POST',
  )

// 查询标签列表
export const queryLabelList = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/label/clue/selectLabel`,
    params,
    'GET',
  )

// 私海打标
export const queryPrivateSeaTagAdd = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/tag/add`,
    {...params},
   'POST',
  )

// 备注
export const setRemark = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/remark/add`,
    {...params},
   'POST',
  )

//商家id修改
export const updateAccountID = (params: any) =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/updateAccount`,
    {...params},
   'POST',
  )
//跟进备注修改
export const editBDRemark = (params: any) =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/privateSea/bd/remark/add`,
    {...params},
   'POST',
  )

  // 查询线索类型
  export const leadsType = (params: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/leadsType`,
    params,
    'GET',
    )

  //跟进备注修改
  export const firstCommunicate = (params: any) =>
    requestApi(
      `${API_PREFIX}/merchant/customer/leads/privateSea/firstCommunicate`,
      {...params},
      'POST',
    )

// 获取投放渠道
export const getObtainChannels = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/plan/channel/obtainChannels`, {
  }, 'POST');
}
