import type { ConfigQueryBaseConfigReq } from '@/entities/settingColumnsModal/interface/queryBaseConfig';
import type { ConfigSaveUserConfigReq } from '@/entities/settingColumnsModal/interface/saveUserConfig';
import type { ConfigQueryUserConfigReq } from '@/entities/settingColumnsModal/interface/queryUserConfig';
import type { QueryManagerInfoReq } from '@/entities/settingColumnsModal/interface//queryManagerInfo';
import request from '@/utils/request';

export const fetchConfigQueryUserConfigApi = (data: ConfigQueryUserConfigReq) => {
  return request('/merchant-customer/merchant/customer/column/config/queryUserConfig', {
    method: 'post',
    data,
  });
};

export const fetchConfigSaveUserConfigApi = (data: ConfigSaveUserConfigReq) => {
  return request('/merchant-customer/merchant/customer/column/config/saveUserConfig', {
    method: 'post',
    data,
  });
};

export const fetchConfigQueryBaseConfigApi = (data: ConfigQueryBaseConfigReq) => {
  return request('/merchant-customer/merchant/customer/column/config/queryBaseConfig', {
    method: 'post',
    data,
  });
};

export const fetchMerchantQueryManagerInfoApi = (params: QueryManagerInfoReq) => {
  return request('/merchant/admin/merchant/queryManagerInfo', {
    method: 'get',
    params,
  });
};
