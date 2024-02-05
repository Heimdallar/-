import { requestApi } from '@/utils/request';
import {
  IListParams,
  IAddParams,
  IUpdateParams,
  IDetailParams,
  IStyleParams,
  IImportParams,
  IImportDataParams,
  IAllotParams,
  IBatchAllotParams,
  ICategoryListParams,
  IManagerInfoParams,
  IBrandListParams,
  IAuthBusinessDeveloperParams,
  IAuthManagerParams,
  IStyleListParams,
  IRejectParams,
  IDeleteLeadsIdParams,
  IOverviewParams,
  ILogParams,
  IRejectReasonParams,
  IRealParams,
} from '../interface';
import request from '@/utils/request';

const API_PREFIX = '/merchant-customer';

/* 获取线索列表 */
export const getPublicSeaClueList = (queryParams: IListParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/page`, { ...queryParams }, 'POST');
};

/* 新增线索 */
export const addPublicSeaClue = (queryParams: IAddParams) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/add`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
  );
};

/* 编辑线索 */
export const updatePublicSeaClue = (queryParams: IUpdateParams) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/update`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
  );
};

/* 获取线索详情 */
export const getPublicSeaClueDetail = (params: IDetailParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/detail`, params, 'GET');
};

/* 获取风格 */
export const getPublicSeaClueStyle = (params: IStyleParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/style`, params, 'GET');
};

/* 导入线索 (475版本修改：上传文件到OSS，任务中心异步处理) */
export const importPublicSeaClue = (queryParams: IImportParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/import`, { ...queryParams }, 'POST');
};

/* 导入文件 */
export const importData = (queryParams: IImportDataParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/file/task/importData`, { ...queryParams }, 'POST');
};

/* 走任务中心导出 */
export const importTask = (queryParams: {
  importFile: string;
  extInfo: Record<string, any>;
  taskTemplateCode: string;
  taskName: string;
}) => requestApi('/merchant-bpc/task-center/submitTask', queryParams, 'POST');


/* 获取线索导入模板 */
export const getPublicSeaClueTemplate = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/template`, {}, 'GET');
};

/* 分配bd */
export const allotPublicSeaClue = (queryParams: IAllotParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/allot`,
    { ...queryParams },
    'POST',
    '分配成功',
  );
};

/* 批量分配bd */
export const batchAllotPublicSeaClue = (queryParams: IBatchAllotParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/batchAllot`,
    { ...queryParams },
    'POST',
    // successMsg: '批量分配成功',
  );
};

/* 认领线索 */
export const claimPublicSeaClue = (queryParams: IAllotParams) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/claim`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
  );
};

/* 批量认领线索 */
export const batchClaimPublicSeaClue = (queryParams: IBatchAllotParams) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/batchClaim`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
    // successMsg: '批量分配成功',
  );
};

/* 校验跟进人 */
export const checkCustomerAuthBusinessDeveloper = (params: IAuthBusinessDeveloperParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/authBusinessDeveloper`, params, 'GET');
};

/* 获取类目列表 (gondor项目复制而来) */
export const getCategoryList = (queryParams: ICategoryListParams) => {
  return requestApi('/commodity-admin/admin/category/list', { ...queryParams }, 'POST');
};

/* 获取管理者数据 (gondor项目复制而来) */
export const getManagerInfo = (params: IManagerInfoParams) => {
  return requestApi('/merchant/admin/merchant/queryManagerInfo', params, 'GET');
};

/* 根据名称获取品牌列表 (gondor项目复制而来) */
export const getBrandByName = (queryParams: IBrandListParams) => {
  return requestApi(
    '/commodity-admin/admin/brand/page-list',
    { ...queryParams },
    'POST',
  );
};

// 审核
export const approve = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/review`,
    { ...queryParams },
    'POST',
  );
};

// 判断当前操作者是否为线索主营类目的管理员
export const checkAuthManager = (params: IAuthManagerParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/authManager`, params, 'GET');
};

// 获取风格list
export const getStyleList = (params: IStyleListParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/style`, params, 'GET');
};

// 申请驳回
export const postReject = (queryParams: IRejectParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/reject`,
    { ...queryParams },
    'POST',
  );
};

// 删除和批量删除线索
export const deleteLeadsId = (queryParams: IDeleteLeadsIdParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/del`,
    { ...queryParams },
    'POST',
  );
};

// 线索数据总览
export const getDataOverview = (queryParams: IOverviewParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/stat`,
    { ...queryParams },
    'POST',
  );
};

// 查看操作日志
export const getLog = (queryParams: ILogParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/log`,
    { ...queryParams },
    'POST',
  );
};

// 查看操作日志
export const getRejectReason = (params: IRejectReasonParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/reason`, params, 'GET');
};

// 查看新版线索详情
export const getPublicSeaDesDetail = (params: IDetailParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/desDetail`, params, 'GET');
};

// 查看新版未脱敏数据
export const getPublicSeaRealMsg = (queryParams: IRealParams) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/plaintext`,
    { ...queryParams },
    'POST',
  );
};

// 查询标签列表
export const queryLabelList = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/label/clue/selectLabel`, params, 'GET');
};

// 备注新增
export const setRemark = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/remark`,
    { ...queryParams },
    'POST',
  );
};
// 驳回原因枚举
export const getRejectReasonList = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/rejectReasonList`, params, 'GET');
};

// 中台审核
export const centerAudit = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/center/review`,
    { ...queryParams },
    'POST',
  );
};

// 中台审核驳回原因枚举
export const getCenterRejectReasonList = (params: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/list/center/rejectReasonList`,
    params,
    'GET',
  );
};

// 类目查询(根据品牌id 等)
export const getCategoryListByBrand = (params: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/level1CategoryByBrand`,
    params,
    'GET',
  );
};

// 公海建联
export const publicSeaLink = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/link`, {
    ...queryParams
  }, 'POST');
}

// 获取投放渠道
export const getObtainChannels = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/plan/channel/obtainChannels`, {
  }, 'POST');
}