import type { ClueFeedbackTalkProgressReq } from '@/entities/privateSea/interface/feedbackTalkProgress';
import type { ClueAddLabelReq } from '@/entities/privateSea/interface/addLabel';
import type { ClueCancelTopReq } from '@/entities/privateSea/interface/cancelTop';
import type { ClueSetTopReq } from '@/entities/privateSea/interface/setTop';
import request from '@/utils/request';

export const fetchClueSetTopApi = (data: ClueSetTopReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/clue/setTop', {
    method: 'post',
    data,
  });
};

export const fetchClueCancelTopApi = (data: ClueCancelTopReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/clue/cancelTop', {
    method: 'post',
    data,
  });
};

export const fetchClueAddLabelApi = (data: ClueAddLabelReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/clue/addLabel', {
    method: 'post',
    data,
  });
};

export const fetchClueFeedbackTalkProgressApi = (data: ClueFeedbackTalkProgressReq) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/clue/feedbackTalkProgress', {
    method: 'post',
    data,
  });
};

export const fetchClueGetfeedbackInvalidLeadsApi = (params) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/clue/getfeedbackInvalidLeads', {
    method: 'get',
    params,
  });
};

export const fetchClueGetfeedbackWaitClaimdLeadsApi = (params) => {
  return request('/youthcamp-mer-customer/merchant/customer/leads/clue/getfeedbackWaitClaimdLeads', {
    method: 'get',
    params,
  });
};
