import adapter from '@/utils/adapter'
import { makeChannelObtainChannels } from '@/entities/channelManagement/factories'
import { fetchChannelObtainChannelsApi } from '@/apis/channelManagement/'
import {  Datum } from '@/entities/channelManagement/interface/queryObtainChannels'

type FetchChannelObtainChannelsType = () => Promise<{
	success: boolean;
	data: Datum[];
	error?: Datum[] | Error;
}>
const fetchChannelObtainChannelsService: FetchChannelObtainChannelsType = adapter({
	request: fetchChannelObtainChannelsApi,
	onSuccess: (res) => {
		return {
			success: true,
			data: res.data.map(makeChannelObtainChannels).filter(Boolean) || [],
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
export default fetchChannelObtainChannelsService
