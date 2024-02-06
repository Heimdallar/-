import moment from 'moment';
import { Datum, SubChannels } from '../interface/queryObtainChannels';

function generateUUID() {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // 使用高精度时钟，如果可用
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const makeSubChannels = (subRecord: SubChannels, record: Datum) => {
  if (!subRecord) {
    return null;
  }

  return {
    channelCode: subRecord.channelCode,
    channelName: subRecord.channelName,
    channel2Code: subRecord.channelCode,
    channel2Name: subRecord.channelName,
    channel1Code: record.channelCode,
    channel1Name: record.channelName,
    canAddSub: record.canAddSub,
    canEdit: record.canEdit,
    id: generateUUID(),
    level: 2,
    children: subRecord.subChannels
      ?.map((item) => makeSubChannels3(item, subRecord, record))
      .filter(Boolean),
  };
};
const makeSubChannels3 = (item: SubChannels, subRecord, record) => {
  if (!item) {
    return null;
  }
  return {
    channelCode: item.channelCode,
    channelName: item.channelName,
    channel3Code: item.channelCode,
    channel3Name: item.channelName,
    channel2Code: subRecord.channelCode,
    channel2Name: subRecord.channelName,
    channel1Code: record.channelCode,
    channel1Name: record.channelName,
    canAddSub: item.canAddSub,
    canEdit: item.canEdit,
    id: item.id,
    updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss'),
    creatorName: item.creatorName,
    creatorId: item.creatorId,
    channelDesc: item.channelDesc,
    level: 3,
  };
};

const buildMakeChannelObtainChannels = () => {
  return function makeChannelObtainChannels(record: Datum) {
    if (!record) {
      return null;
    }

    return {
      channelCode: record.channelCode,
      channelName: record.channelName,
      channel1Code: record.channelCode,
      channel1Name: record.channelName,
      canAddSub: record.canAddSub,
      canEdit: record.canEdit,
      children: record.subChannels
        ?.map((subRecord) => makeSubChannels(subRecord, record))
        .filter(Boolean),
      id: generateUUID(),
      level: 1,
    };
  };
};

export default buildMakeChannelObtainChannels;
