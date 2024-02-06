import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data } from '../interface/querySelectOrgDataRole';

const buildMakeOrgSelectOrgDataRole = () => {
  return function makeOrgSelectOrgDataRole(record: Data) {
    if (!record) {
      return null;
    }

    return {
      categoryIdList: record.data || [],
      roleIds: record.roleIds || [],
    };
  };
};

export default buildMakeOrgSelectOrgDataRole;
