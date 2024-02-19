import adapter from '@/utils/adapter'
import { fetchPlanObtainRiskCheckResultApi } from '@/apis/attractinvestmentPc/'
import { PlanObtainRiskCheckResultReq,   } from '@/entities/attractinvestmentPc/interface/obtainRiskCheckResult'

type FetchPlanObtainRiskCheckResultType = (data: PlanObtainRiskCheckResultReq) => Promise<{
	success: boolean;
	data: boolean;
	error?: boolean | Error;
}>
const fetchPlanObtainRiskCheckResultService: FetchPlanObtainRiskCheckResultType = adapter({
	request: fetchPlanObtainRiskCheckResultApi,
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
export default fetchPlanObtainRiskCheckResultService
