import type { DataRecord } from '../interface/obtainPersonalInfo';

const buildMakeClueObtainPersonalInfo = () => {
  return function makeClueObtainPersonalInfo(record: DataRecord) {
    if (!record) {
      return null;
    }

    return {
      name: record.name,
      personalInfoType: record.personalInfoType,
      isVisible: record.visible,
      count: record.count,
      personalInfoSearchConditionResponse: record.personalInfoSearchConditionResponse || {},
    };
  };
};

export default buildMakeClueObtainPersonalInfo;
