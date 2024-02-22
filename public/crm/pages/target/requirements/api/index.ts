
import request, { requestApi } from '@/utils/request';
import { IListParams } from '../interface';
import { initRequstParams } from '../config';
import { AddOrUpdateReq, ListResponseData } from './interface';
const API_PREFIX = '/youthcamp-mer-customer';

/* 获取需求列表 */
export const getRequirementList = (queryParams: IListParams) => {
  return requestApi(`${API_PREFIX}/merchant/customer/target/page`, queryParams, 'POST') as Promise<ListResponseData>;
};

/* 获取需求日志列表 */
export const getRequirementLogList = (queryParams: {
  pageNum?:  number;
  pageSize?: number;
  /**
   * 需求id
   */
  targetId: number;
}) => {
  return requestApi(`${API_PREFIX}/merchant/customer/target/log`, queryParams, 'POST');
};

// 新增需求
export const putNewDemand = (queryParams: AddOrUpdateReq) => {
  const params = {
    ...queryParams
  };
  return requestApi(`${API_PREFIX}/merchant/customer/target/addOrUpdate`, params, 'POST');
};

// 获取导入文件模板
export const getRequirementTemplate = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/target/template`, { }, 'GET');
};

export const getOperationPermission = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/target/operate/permission`, {}, 'POST');
}

export const getCategoryList = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/clue/category/queryFollowList`, {}, 'POST');
}

/* 新增线索 */
export const addPublicSeaClue = async (queryParams: any) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/add`,
    {
     method :'POST',
     data: { ...queryParams },
    }
    
  );
};

// 需求作废
export const invaildRequire = (id:number) => {
  return requestApi(`${API_PREFIX}/merchant/customer/target/invaild`,{id})
}