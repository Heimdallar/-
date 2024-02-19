import { IeaSubmitReq } from '@/entities/attractinvestment/interface/fetchSubmit'
import { IeaObtainIeaPageInfoReq } from '@/entities/attractinvestment/interface/obtainIeaPageInfo'
import { CategoryListReq } from '@/entities/attractinvestment/interface/fetch-category-list'
import { BrandSearchReq } from '@/entities/attractinvestment/interface/fetch-hot-brand'
import request from '@/utils/request';

export const fetchIeaObtainMeetingsApi = (params) => {
  return request('/youthcamp-mer-customer/merchant/customer/iea/obtainMeetings', {
    method: 'get',
    params,
    ignoreToken: true
  });
};

export const fetchIeaObtainIeaPageInfoApi = (params: IeaObtainIeaPageInfoReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/iea/obtainIeaPageInfo', {
    method: 'get',
    params,
    hideErrNotice: true,
    ignoreToken: true
  })
};

export const fetchCategoryListApi = (data: CategoryListReq) => {
  return request('/youthcamp-mer-customer/open/entry/home/page/category/list', {
    method: 'post',
    data,
    ignoreToken: true,
  })
};

export const fetchBrandSearchApi = (data: BrandSearchReq) => {
  return request('/open/entry/home/page/brand/list/include/predict', {
    method: 'post',
    data,
    ignoreToken: true,
  })
};

export const fetchIeaSubmitApi = (data: IeaSubmitReq) => {
  const { onSubmit, ...rest } = data
  return request('/youthcamp-mer-customer/merchant/customer/iea/submit', {
    method: 'post',
    data: rest,
    ignoreToken: true,
    onSubmit: () => { onSubmit && onSubmit(rest) }
  })
};
