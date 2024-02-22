import type { OrgDelOrgReq } from '@/entities/configurationManagement/interface/delOrg';
import type { OrgAddOrUpdateReq } from '@/entities/configurationManagement/interface/addOrUpdateOrg';
import type { OrgSelectOrgDataRoleReq } from '@/entities/configurationManagement/interface/querySelectOrgDataRole';
import type { OrgSelectOrgInfoReq } from '@/entities/configurationManagement/interface/querySelectOrgInfo';
import type { OrgSelectOrgUserReq } from '@/entities/configurationManagement/interface/querySelectOrgUser';
import type { OrgAddUpdateOrgUserReq } from '@/entities/configurationManagement/interface/addUpdateOrgUser';
import request from '@/utils/request';

export const fetchOrgAddUpdateOrgUserApi = (data: OrgAddUpdateOrgUserReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/user/org/addUpdateOrgUser', {
    method: 'post',
    data,
  });
};

export const fetchOrgSelectOrgUserApi = (data: OrgSelectOrgUserReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/user/org/selectOrgUser', {
    method: 'post',
    data,
  });
};

export const fetchOrgSelectOrgInfoApi = (data: OrgSelectOrgInfoReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/org/org/selectOrgInfo', {
    method: 'post',
    data,
  });
};

export const fetchOrgSelectOrgDataRoleApi = (data: OrgSelectOrgDataRoleReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/org/org/selectOrgDataRole', {
    method: 'post',
    data,
  });
};

export const fetchOrgAddOrUpdateApi = (data: OrgAddOrUpdateReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/org/org/addOrUpdate', {
    method: 'post',
    data,
  });
};

export const fetchOrgDelOrgApi = (data: OrgDelOrgReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/org/org/delOrg', {
    method: 'post',
    data,
  });
};

export const fetchOrgSelectOrgTreeApi = () => {
  return request('/youthcamp-mer-customer/merchant/customer/org/org/selectOrgTree', {
    method: 'post',
  });
};

export const fetchCategoryListApi = (data) => {
  return request('/commodity-admin/admin/category/list', {
    method: 'post',
    data,
  });
};
