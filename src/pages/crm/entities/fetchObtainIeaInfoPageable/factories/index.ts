
import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities'
import { IeaObtainIeaInfoPageableResData, DataElement, PageConfig, DiscountPoundageInfo } from '../interface/index'


const makeDatas = (record: DataElement) => {
  if (!record) {
    return null
  }

  return {
      id: record.id,
      encodedId: record.encodedId,
      name: record.name,
      creatorId: record.creatorId,
      creatorName: record.creatorName,
      status: record.status,
      statusStr: record.statusStr,
      startTime: record.startTime,
      endTime: record.endTime,
      estimateUserCount: record.estimateUserCount,
      desc: record.desc,
      preferentialPolicy: record.preferentialPolicy,
      pageConfig: record.pageConfig,
      invitationCodeStartTime: record.invitationCodeStartTime,
      invitationCodeEndTime: record.invitationCodeEndTime,
      rejectReason: record.rejectReason,
      feishuInstanceId: record.feishuInstanceId,
      createTime: record.createTime,
      modifyTime: record.modifyTime,
      discountPoundageInfo: record.discountPoundageInfo,
  }
}

const buildMakeIeaObtainIeaInfoPageable = () => {
  return function makeIeaObtainIeaInfoPageable(record: IeaObtainIeaInfoPageableResData) {
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
export const makeIeaObtainIeaInfoPageable = buildMakeIeaObtainIeaInfoPageable()

export default buildMakeIeaObtainIeaInfoPageable
