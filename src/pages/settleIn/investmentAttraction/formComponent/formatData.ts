import _ from 'lodash';
import moment from 'moment';
import { Data } from '@/entities/fetchIeaDetail/interface/fetchIeaDetail';
import { Discount_Type } from '../enum';

interface ResProps {
  name: string;
  activityTime: number[];
  meetingTime: number[];
  meetingAddress: string;
  estimateUserCount: string;
  title: string;
  explain: string;
  needFill: number[];
  mainCateIds: number[];
  invitationCodeTime: number[];
  spUserId?: number;
  spId?: number;
}

interface DetailProps {
  data: Data;
}

export const getParamData = (res: ResProps, checkValue: boolean) => {
  let discountValue: number | null = _.get(res, 'discount', null);
  if (discountValue) {
    discountValue *= 10;
  }
  return {
    name: res.name,
    desc: _.get(res, 'desc', null),
    startTime: moment(res.activityTime[0]).valueOf(),
    endTime: moment(res.activityTime[1]).valueOf(),
    meetingStartTime: res.meetingTime ? moment(res.meetingTime[0]).startOf('minute').valueOf() : 0,
    meetingEndTime: res.meetingTime ? moment(res.meetingTime[1]).startOf('minute').valueOf() : 0,
    meetingAddress: res.meetingAddress || '',
    estimateUserCount: res.estimateUserCount,
    preferentialPolicy: checkValue ? Discount_Type.有折扣 : Discount_Type.无折扣,
    pageConfig: {
      title: res.title,
      explain: res.explain,
      bannerImgs: [],
      needFill: res.needFill,
      mainCateIds: res.mainCateIds,
    },
    discountPoundageInfo: {
      discount: discountValue,
      cateLevel: _.get(res, 'cateLevel', null),
      qualification: _.get(res, 'qualification', null),
    },
    invitationCodeStartTime: moment(res.invitationCodeTime[0]).valueOf(),
    invitationCodeEndTime: moment(res.invitationCodeTime[1]).valueOf(),
    spId: res?.spId,
    spUserId: res?.spUserId,
  };
};

export const getDetailData = (res: DetailProps) => {
  let discountValue: number | null = _.get(res.data, 'discountPoundageInfo.discount', null);
  if (discountValue) {
    discountValue /= 10;
  }
  return {
    name: res.data.name,
    activityTime: [moment(res.data.startTime), moment(res.data.endTime)],
    meetingTime:
      res.data.meetingStartTime && res.data.meetingEndTime
        ? [moment(res.data.meetingStartTime), moment(res.data.meetingEndTime)]
        : undefined,
    meetingAddress: res.data.meetingAddress,
    estimateUserCount: res.data.estimateUserCount,
    desc: res.data.desc,
    invitationCodeTime: [
      moment(res.data.invitationCodeStartTime),
      moment(res.data.invitationCodeEndTime),
    ],
    title: _.get(res.data, 'pageConfig.title', ''),
    explain: _.get(res.data, 'pageConfig.explain', ''),
    discount: discountValue,
    cateLevel: _.get(res.data, 'discountPoundageInfo.cateLevel', null),
    qualification: _.get(res.data, 'discountPoundageInfo.qualification', null),
    bannerImgs: [],
    needFill: _.get(res.data, 'pageConfig.needFill', []),
    mainCateIds: _.get(res.data, 'pageConfig.mainCateIds', []),
    spId: _.get(res.data, 'spId', null),
    spName: _.get(res.data, 'spName', null),
    spUserId: _.get(res.data, 'spUserId', null),
    spUserName: _.get(res.data, 'spUserName', null),
  };
};
