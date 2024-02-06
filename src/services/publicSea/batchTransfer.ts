import adapter from '@/utils/adapter'
import { fetchClueBatchTransferApi } from '@/apis/publicSea/'
import type { ClueBatchTransferReq,   } from '@/entities/publicSea/interface/batchTransfer'

type FetchClueBatchTransferType = (data: ClueBatchTransferReq) => Promise<{
	success: boolean;
	data: string;
	error?: string | Error;
}>
const fetchClueBatchTransferService: FetchClueBatchTransferType = adapter({
	request: fetchClueBatchTransferApi,
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
export default fetchClueBatchTransferService
