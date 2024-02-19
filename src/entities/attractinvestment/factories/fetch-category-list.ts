import { Datum } from '../interface/fetch-category-list'

const buildMakeCategoryList = () => {
	return function makeCategoryList(record: Datum) {
		if (!record) {
			return null
		}

		return {
			id: record.id,
			name: record.name,
			level: record.level,
			pid: record.pid,
			rootId: record.rootId,
			sort: record.sort,
			isDel: record.isDel,
			items: record.items,
			type: record.type,
			isHide: record.isHide,
		}
	}
}

export default buildMakeCategoryList
