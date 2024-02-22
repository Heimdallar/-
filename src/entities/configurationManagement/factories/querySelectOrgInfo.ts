import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data } from '../interface/queryaa SelectOrgInfo';

const buildMakeOrgSelectOrgInfo = () => {
  return function makeOrgSelectOrgInfo(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/youthcamp-mer-customer/merchant/customer/org/org/selectOrgInfo',
      configs: [
        {
          key: 'orgId',
          type: 'number',
        },
        {
          key: 'orgName',
          type: 'string',
        },
        {
          key: 'spId',
          type: 'number',
        },
        {
          key: 'parentId',
          type: 'number',
        },
        {
          key: 'orgType',
          type: 'number',
        },
        {
          key: 'sort',
          type: 'number',
        },
        {
          key: 'userId',
          type: 'number',
        },
        {
          key: 'userName',
          type: 'string',
        },
        {
          key: 'data',
          type: 'array',
        },
        {
          key: 'roleIds',
          type: 'array',
        },
      ],
      data: record,
    });

    return {
      orgId: record.orgId,
      orgName: record.orgName,
      spId: record.spId,
      parentId: record.parentId,
      orgStatus: record.orgStatus,
      orgType: record.orgType,
      userId: record.userId,
      userName: record.userName,
      data: record.data || [],
      roleIds: record.roleIds || [],
      sort: record.sort,
      dutyUserOptions: [
        {
          value: record.userId,
          label: record.userName,
        },
      ],
    };
  };
};

export default buildMakeOrgSelectOrgInfo;
