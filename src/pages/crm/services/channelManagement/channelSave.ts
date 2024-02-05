import adapter from '@/utils/adapter'
import { makeChannelSave } from '@/entities/channelManagement/factories'
import { fetchChannelSaveApi } from '@/apis/channelManagement/'
import { ChannelSaveReq,  Data } from '@/entities/channelManagement/interface/channelSave'

type FetchChannelSaveType = (data: ChannelSaveReq) => Promise<{
	success: boolean;
	data: Data;
	error?: Data | Error;
}>
const fetchChannelSaveService: FetchChannelSaveType = adapter({
	request: fetchChannelSaveApi,
	onSuccess: (res) => {
		return {
			success: true,
			data: makeChannelSave(res.data) || {},
		}
	},
	onError: (error) => {
		return {
			success: false,
			data: {},
			error
		}
	},
})
export default fetchChannelSaveService
