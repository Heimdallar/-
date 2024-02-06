import { Data } from '../interface/fetchIeaDetail';

const buildMakeIeaDetail = () => {
  return function makeIeaDetail(record: Data) {
    if (!record) {
      return null;
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
      meetingStartTime: record.meetingStartTime,
      meetingEndTime: record.meetingEndTime,
      meetingAddress: record.meetingAddress,
      spId: record.spId,
      spName: record.spName,
      spUserId: record.spUserId,
      spUserName: record.spUserName,
    };
  };
};

export default buildMakeIeaDetail;
