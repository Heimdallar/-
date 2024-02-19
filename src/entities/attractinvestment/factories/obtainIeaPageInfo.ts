import { Data } from '../interface/obtainIeaPageInfo'

const buildMakeIeaObtainIeaPageInfo = () => {
  return function makeIeaObtainIeaPageInfo(record: Data) {
    if (!record) {
      return null
    }

    return {
      title: record.title,
      bannerImgs: [],
      needFill: record.needFill,
      explain: record.explain,
      startTime: record.startTime,
      endTime: record.endTime,
      mainCateIds: record.mainCateIds || []
    }
  }
}

export default buildMakeIeaObtainIeaPageInfo
