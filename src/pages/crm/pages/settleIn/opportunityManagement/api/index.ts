import request, { requestApi } from '@/utils/request';

const API_PREFIX = '/merchant-customer';

export const fetchPageBrandList = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/recruit/brand/pageBrand`,
    { ...queryParams },
    'POST',
  );
};
// 编辑招商品牌
export const saveBrand = (queryParams: any) => {
  return request(`${API_PREFIX}/merchant/customer/recruit/brand/saveBrand`, {
    method: 'POST',
    data: queryParams, 
  });
};
// 招商品牌详情
export const getDetail = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/recruit/brand/getDetail`, queryParams, 'POST');
};
// 导入
export const importData = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/file/task/importData`, queryParams, 'POST');
};
/* 走任务中心导出 */
export const importTask = (queryParams: {
  importFile: string;
  extInfo: Record<string, any>;
  taskTemplateCode: string;
  taskName: string;
}) => requestApi('/merchant-bpc/task-center/submitTask', queryParams, 'POST');

// 更新是否招商
export const updateStatus = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/recruit/brand/updateStatus`,
    queryParams,
    'POST',
  );
};
// 获取配置信息
export const getBrandConfig = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/recruit/brand/getConfig`, queryParams, 'POST');
};
// 保存配置
export const saveBrandConfig = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/recruit/brand/saveConfig`,
    queryParams,
    'POST',
  );
};
