import { Data } from '../interface/channelSave'

const buildMakeChannelSave = () => {
	return function makeChannelSave(record: Data) {
		if (!record) {
			return null
		}

		return {
			channelId: record.channelId,
			msg: record.msg,
		}
	}
}

export default buildMakeChannelSave
