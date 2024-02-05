
import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities'
import { IeaObtainIeaOperLogPageableResData, DataElement } from '../interface/index'

const makeDatas = (record: DataElement) => {
  if (!record) {
    return null
  }

  return {
      id: record.id,
      opTime: record.opTime,
      opTimeStr: record.opTimeStr,
      opUserInfo: record.opUserInfo,
      desc: record.desc,
  }
}

const buildMakeIeaObtainIeaOperLogPageable = () => {
  return function makeIeaObtainIeaOperLogPageable(record: IeaObtainIeaOperLogPageableResData) {
    if (!record) {
      return null
    }


    return {
      page: record.page,
      pageSize: record.pageSize,
      total: record.total,
      pages: record.pages,
      datas: record.datas?.map(makeDatas).filter(Boolean),
    }
  }
}
export const makeIeaObtainIeaOperLogPageable = buildMakeIeaObtainIeaOperLogPageable()

export default buildMakeIeaObtainIeaOperLogPageable
