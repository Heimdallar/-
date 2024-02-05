const buildMakePrivateSeaGetFeedbackTalkFails = () => {
	return function makePrivateSeaGetFeedbackTalkFails(record: string) {
		if (!record) {
			return null
		}

		return {
			label: record,
			value: record,
		}
	}
}

export default buildMakePrivateSeaGetFeedbackTalkFails
