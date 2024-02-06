import adapter from '@/utils/adapter'
import { makePrivateSeaGetFeedbackTalkFails } from '@/entities/publicSea/factories';
import { fetchClueGetRejectFailsApi } from '@/apis/publicSea/'
import type { ClueGetRejectFailsReq,  Datum } from '@/entities/publicSea/interface/getRejectFails'

type FetchClueGetRejectFailsType = (data: ClueGetRejectFailsReq) => Promise<{
	success: boolean;
	data: Datum[];
	error?: Datum[] | Error;
}>
const fetchClueGetRejectFailsService: FetchClueGetRejectFailsType = adapter({
	request: fetchClueGetRejectFailsApi,
	onSuccess: (res) => {
		return {
			success: true,
			data: makePrivateSeaGetFeedbackTalkFails(res.data).filter(Boolean) || [],
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
export default fetchClueGetRejectFailsService
