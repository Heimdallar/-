import adapter from '@/utils/adapter'
import { fetchClueBatchAllotApi } from '@/apis/publicSea/'
import type { ClueBatchAllotReq,   } from '@/entities/publicSea/interface/clueBatchAllot'

type FetchClueBatchAllotType = (data: ClueBatchAllotReq) => Promise<{
	success: boolean;
	data: string;
	error?: string | Error;
}>
const fetchClueBatchAllotService: FetchClueBatchAllotType = adapter({
	request: fetchClueBatchAllotApi,
	onSuccess: (res) => {
		return {
			success: true,
			data: res.data,
		}
	},
	onError: (error) => {
		return {
			success: false,
			data: null,
			error
		}
	},
})
export default fetchClueBatchAllotService
