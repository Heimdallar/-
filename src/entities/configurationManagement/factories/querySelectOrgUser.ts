import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data, OrgUsers, RoleIds } from '../interface/querySelectOrgUser';

const makeOrgUsers = (record: OrgUsers) => {
  if (!record) {
    return null;
  }

  return {
    value: record.userId,
    label: record.userName,
  };
};

const makeOrgUsersIdList = (record: OrgUsers) => {
  if (!record) {
    return null;
  }

  return record.userId;
};

const buildMakeOrgSelectOrgUser = () => {
  return function makeOrgSelectOrgUser(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/user/org/selectOrgUser',
      configs: [
        {
          key: 'orgId',
          type: 'number',
        },
        {
          key: 'orgUsers',
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
      orgUsers: record.orgUsers?.map(makeOrgUsers).filter(Boolean) || [],
      userIds: record.orgUsers?.map(makeOrgUsersIdList).filter(Boolean) || [],
      roleIds: record.roleIds || [],
    };
  };
};

export default buildMakeOrgSelectOrgUser;
