import adapter from '@/utils/adapter'
import { fetchPlanSubmitApi } from '@/apis/attractinvestmentPc/'
import { PlanSubmitReq,  Data } from '@/entities/attractinvestmentPc/interface/planSubmit'

type FetchPlanSubmitType = (data: PlanSubmitReq) => Promise<{
	success: boolean;
	data: Data;
	error?: Data | Error;
	code?: number;
}>
const fetchPlanSubmitService: FetchPlanSubmitType = adapter({
	request: fetchPlanSubmitApi,
	onSuccess: (res) => {
		return {
			success: true,
			data: res.data || {},
			code: res.code,
		}
	},
	onError: (error) => {
		return {
			success: false,
			data: {},
			error,
			code: error.code,
		}
	},
})
export default fetchPlanSubmitService
