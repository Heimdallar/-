import adapter from '@/utils/adapter'
import { fetchClueRejectApi } from '@/apis/publicSea/'
import type { ClueRejectReq,   } from '@/entities/publicSea/interface/reject'

type FetchClueRejectType = (data: ClueRejectReq) => Promise<{
	success: boolean;
	data: string;
	error?: string | Error;
}>
const fetchClueRejectService: FetchClueRejectType = adapter({
	request: fetchClueRejectApi,
	onSuccess: (res) => {
		return {
			success: true,
			data: res.data,
		}
	},
	onError: (error) => {
		return {
			success: false,
			data: '',
			error
		}
	},
})
export default fetchClueRejectService
