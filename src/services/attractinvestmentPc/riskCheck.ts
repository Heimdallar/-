import adapter from '@/utils/adapter'
import { fetchPlanRiskCheckApi } from '@/apis/attractinvestmentPc/'
import { PlanRiskCheckReq,   } from '@/entities/attractinvestmentPc/interface/riskCheck'

type FetchPlanRiskCheckType = (data: PlanRiskCheckReq) => Promise<{
	success: boolean;
	data: string;
	error?: string | Error;
}>
const fetchPlanRiskCheckService: FetchPlanRiskCheckType = adapter({
	request: fetchPlanRiskCheckApi,
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
export default fetchPlanRiskCheckService
