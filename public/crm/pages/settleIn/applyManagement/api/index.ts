import { requestApi } from '@/utils/request';

const API_PREFIX = '/merchant-customer';

// 线索导入导出功能关闭开关
export const closeSwitch = (): Promise<boolean> => 
  requestApi(`${API_PREFIX}/merchant/customer/leads/clue/close/switch`, {}, 'GET');

// 创建申请单
export const create = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/add`, queryParams, 'POST');

// 编辑申请单
export const edit = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/update`, queryParams, 'POST');

// 管理员编辑申请单
export const adminEdit = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/adminUpdate`, queryParams, 'POST');

// 提交申请单
export const submit = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/submitReview`, queryParams, 'POST');

// 批量提交申请单
export const batchSubmit = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/batchSubmitReview`, queryParams, 'POST');

// 删除申请单
export const deleteTicket = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/delete`, queryParams, 'POST');

// 查询申请单列表
export const query = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/page`, queryParams, 'POST');

// 查询申请单详情
export const details = (params: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/detail`, params, 'GET');

// 提报设置
export const settings = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/reportSet`, queryParams, 'POST');

// 导入
export const importList = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/file/task/importData`, queryParams, 'POST');

// 导出
export const exportList = (queryParams: any): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/file/task/exportApplyData`, queryParams, 'POST');

// 修改审批结果
export const modify = (queryParams: any): Promise<any> =>
  requestApi(
    `${API_PREFIX}/merchant/customer/brand/approval/modifyReviewResult`,
    queryParams,
    'POST',
  );

export const queryMenu = () =>
  requestApi(
    '/luna/menu/list',
    {
      backstageCode: 'crm', // 招商后台项目
    },
    'GET',
  );

// 获取所有有权限的接口列表
export const queryInterfaceList = ({
  backstageId,
  menuId,
}: {
  backstageId: number;
  menuId: number;
}): Promise<any> =>
  requestApi(
    '/luna/element/list',
    {
      backstageId, // 招商后台项目
      menuId, // 申请单管理菜单
    },
    'GET',
  );

export const querySettings = (): Promise<any> =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/queryApprovalPeroid`, {}, 'GET');

// 类目查询 (根据brandId)
export const getCategoryListByBrand = (params: any) =>
  requestApi(
    '/merchant-customer/merchant/customer/leads/clue/level1CategoryByBrand',
    params,
    'GET',
  );

// 查询一级类目(stark 拷贝)
export const categoryList = (params: any) =>
  requestApi('/biz/product/queryProductCategoryList', params, 'GET');

  // 获取手机区号列表(stark 拷贝) <https://mock.shizhuang-inc.com/project/943/interface/api/199258>
export const getCountryCodeList = () =>
  requestApi('/passport/v1/oauth/countryCodeList', {}, 'POST');


/* 获取类目列表 (gondor项目复制而来) */
export const getCategoryList = (queryParams: any) =>
  requestApi('/commodity-admin/admin/category/list', queryParams, 'POST');

/* 获取大类 */
export const getBrandClassesByLevel1Category = (queryParams: any) =>
  requestApi(
    '/commodity-admin/admin/brand/style-classes/get-brand-classes-by-level1-category-only-new',
    queryParams,
    'POST',
  );

/* 获取风格线 */
export const getBrandStyleByClass = (queryParams: any) =>
  requestApi(
    '/commodity-admin/admin/brand/style-classes/get-brand-style-by-class-only-new',
    queryParams,
    'POST',
  );

/* 走任务中心导出 */
export const importTask = (queryParams: any) =>
  requestApi('/merchant-bpc/task-center/submitTask', queryParams, 'POST');

export const getBrandInfo = (params: any) =>
  requestApi(
    '/merchant-customer/merchant/customer/brand/apply/getBrandInfo',
    params,
    'GET',
  );
/* 重新提交 */
export const reSubmit = (queryParams: any) =>
  requestApi(`${API_PREFIX}/merchant/customer/brand/apply/resubmit`, queryParams, 'POST');
