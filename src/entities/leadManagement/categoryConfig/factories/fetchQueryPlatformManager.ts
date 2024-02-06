import type { Datum } from '../interface/fetchQueryPlatformManager';

const buildMakePlatformManagerQuery = () => {
  return function makePlatformManagerQuery(record: Datum) {
    if (!record) {
      return null;
    }

    return {
      followerId: record.followerId,
      followerName: record.followerName,
      modifyTime: record.modifyTime,
      creator: record.creator,
      editor: record.editor,
    };
  };
};

export default buildMakePlatformManagerQuery;
