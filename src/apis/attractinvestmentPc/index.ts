import request from '@/utils/request'

export const fetchPlanSubmitApi = (data) => {
  const { onSubmit, ...rest } = data
  return request('/youthcamp-mer-customer/merchant/customer/plan/submit', {
    method: 'post',
    data: rest,
    ignoreToken: true,
    onSubmit: () => { onSubmit && onSubmit(rest) }
  })
};

export const fetchPlanRiskCheckApi = (data) => {
  return request('/youthcamp-mer-customer/merchant/customer/plan/riskCheck', {
    method: 'post',
    data,
    ignoreToken: true
  })
};

export const fetchPlanObtainRiskCheckResultApi = (params) => {
  return request('/youthcamp-mer-customer/merchant/customer/plan/obtainRiskCheckResult', {
    method: 'get',
    params,
    ignoreToken: true,
  });
};
