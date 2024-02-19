import buildMakeIeaSubmit from './fetchSubmit'
import buildMakeIeaObtainIeaPageInfo from './obtainIeaPageInfo'
import buildMakeIeaObtainMeetings from './queryObtainMeetings'
import buildMakeCategoryList from './fetch-category-list'
import buildMakeBrandSearch from './fetch-hot-brand'

export const makeIeaObtainMeetings = buildMakeIeaObtainMeetings()
export const makeIeaObtainIeaPageInfo = buildMakeIeaObtainIeaPageInfo()
export const makeCategoryList = buildMakeCategoryList()
export const makeBrandSearch = buildMakeBrandSearch()
export const makeIeaSubmit = buildMakeIeaSubmit()