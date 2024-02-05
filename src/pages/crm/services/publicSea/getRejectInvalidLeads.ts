import adapter from '@/utils/adapter'
import { makePrivateSeaGetFeedbackTalkFails } from '@/entities/publicSea/factories';
import { fetchClueGetRejectInvalidLeadsApi } from '@/apis/publicSea/'
import type { ClueGetRejectInvalidLeadsReq,  Datum } from '@/entities/publicSea/interface/getRejectInvalidLeads'

type FetchClueGetRejectInvalidLeadsType = (data: ClueGetRejectInvalidLeadsReq) => Promise<{
	success: boolean;
	data: Datum[];
	error?: Datum[] | Error;
}>
const fetchClueGetRejectInvalidLeadsService: FetchClueGetRejectInvalidLeadsType = adapter({
	request: fetchClueGetRejectInvalidLeadsApi,
	onSuccess: (res) => {
		return {
			success: true,
			data:  makePrivateSeaGetFeedbackTalkFails(res.data).filter(Boolean) || [],
		}
	},
	onError: (error) => {
		return {
			success: false,
			data: [],
			error
		}
	},
})
export default fetchClueGetRejectInvalidLeadsService
