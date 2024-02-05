import type { ClueRejectReq } from '@/entities/publicSea/interface/reject'
import type { ClueGetRejectInvalidLeadsReq } from '@/entities/publicSea/interface/getRejectInvalidLeads'
import type { ClueGetRejectFailsReq } from '@/entities/publicSea/interface/getRejectFails'
import type { ClueDetailReq } from '@/entities/publicSea/interface/detail';
import type { ClueBatchAllotReq } from '@/entities/publicSea/interface/clueBatchAllot';
import type { ClueAllotReq } from '@/entities/publicSea/interface/clueAllot';
import type { ClueBatchTransferReq } from '@/entities/publicSea/interface/batchTransfer';
import type { ClueTransferReq } from '@/entities/publicSea/interface/transfer';
import type { ClueObtainPersonalInfoReq } from '@/entities/publicSea/interface/obtainPersonalInfo';
import request from '@/utils/request';

export const fetchPrivateSeaGetFeedbackTalkFailsApi = (params) => {
  return request('/merchant-customer/merchant/customer/leads/clue/getFeedbackTalkFails', {
	  method: 'get',
	  params,
  });
};

export const fetchClueObtainPersonalInfoApi = (data: ClueObtainPersonalInfoReq) => {
  return request('/merchant-customer/merchant/customer/leads/clue/obtainPersonalInfo', {
    method: 'post',
    data,
  });
};

export const fetchClueTransferApi = (data: ClueTransferReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/transfer', {
		method: 'post',
		data,
  });
};

export const fetchClueBatchTransferApi = (data: ClueBatchTransferReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/batchTransfer', {
		method: 'post',
		data,
  });
};

export const fetchClueAllotApi = (data: ClueAllotReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/allot', {
		method: 'post',
		data,
  });
};

export const fetchClueBatchAllotApi = (data: ClueBatchAllotReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/batchAllot', {
		method: 'post',
		data,
  });
};

export const fetchClueDetailApi = (params: ClueDetailReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/detail', {
		method: 'get',
		params,
  });
};

export const fetchClueGetRejectFailsApi = (params: ClueGetRejectFailsReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/getRejectFails', {
		method: 'get',
		params,
	})
};

export const fetchClueGetRejectInvalidLeadsApi = (params: ClueGetRejectInvalidLeadsReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/getRejectInvalidLeads', {
		method: 'get',
		params,
	})
};

export const fetchClueRejectApi = (data: ClueRejectReq) => {
	return request('/merchant-customer/merchant/customer/leads/clue/reject', {
		method: 'post',
		data,
	})
};
