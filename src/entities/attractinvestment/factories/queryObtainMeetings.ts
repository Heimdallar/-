import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities'
import { Datum, Meetings, MainCateIds } from '../interface/queryObtainMeetings'
import moment from 'moment';
const makeMainCateIds = (record: MainCateIds) => {
  if (!record) {
    return null;
  }

  return {};
};
const makeTime = (record) => {
  if (!record) {
    return null;
  }
  if (
    moment(record.meetingStartTime).format('YYYY年MM月DD日') ==
    moment(record.meetingEndTime).format('YYYY年MM月DD日')
  ) {
    return `${moment(record.meetingStartTime).format('YYYY年MM月DD日 HH:mm')} - ${moment(
      record.meetingEndTime,
    ).format('HH:mm')}`;
  }
  const value = `${moment(record.meetingStartTime).format('YYYY年MM月DD日 HH:mm')} - ${moment(
    record.meetingEndTime,
  ).format('YYYY年MM月DD日 HH:mm')}`;
  return value;
};

const makeMeetings = (record: Meetings) => {
  if (!record) {
    return null;
  }

  return {
    encodedId: record.encodedId,
    name: record.name,
    meetingStatusStr: record.meetingStatusStr,
    meetingStartTime: record.meetingStartTime,
    meetingEndTime: record.meetingEndTime,
    time: makeTime(record),
    meetingAddress: record.meetingAddress,
    explain: record.explain,
    catesStr: record.catesStr,
    mainCateIds: record.mainCateIds?.map(makeMainCateIds).filter(Boolean),
  };
};

const buildMakeIeaObtainMeetings = () => {
  return function makeIeaObtainMeetings(record: Datum) {
    if (!record) {
      return null;
    }

    return {
      dayStr: `${moment().format('YYYY.')}${record.dayStr}`,
      meetings: record.meetings?.map(makeMeetings).filter(Boolean),
    };
  };
};

export default buildMakeIeaObtainMeetings
