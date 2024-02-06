import adapter from '@/utils/adapter'
import { fetchApplyAddApi } from '@/apis/fetchApplyAdd/'
import { ApplyAddReq,   } from '@/entities/fetchApplyAdd/interface/fetchApplyAdd'

type FetchApplyAddType = (data: ApplyAddReq) => Promise<{
	success: boolean;
	data: boolean;
	error?: boolean | Error;
}>
const fetchApplyAddService: FetchApplyAddType = adapter({
	request: fetchApplyAddApi,
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
export default fetchApplyAddService
