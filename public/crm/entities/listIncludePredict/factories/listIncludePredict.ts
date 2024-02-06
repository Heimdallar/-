import type { Content } from '../interface/listIncludePredict'

const buildMakeIncludePredict = () => {
	return function makeIncludePredict(record: Content) {
		if (!record) {
			return null
		}

		return {
			value: record.id,
			label: record.name,
		}
	}
}

export default buildMakeIncludePredict
