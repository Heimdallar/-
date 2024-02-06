import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Content, CategoryList } from '../interface/queryUserPermissionDataList';

const buildMakeCategoryList = () => {
  return function makeMakeCategoryList(record: Content) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/user/permission_data/page',
      configs: [
        {
          key: 'id',
          type: 'number',
        },
        {
          key: 'spId',
          type: 'number',
        },
        {
          key: 'spName',
          type: 'string',
        },
        {
          key: 'serviceType',
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
          key: 'roleId',
          type: 'number',
        },
        {
          key: 'roleName',
          type: 'string',
        },
        {
          key: 'categoryList',
          type: 'array',
        },
        {
          key: 'status',
          type: 'number',
        },
      ],
      data: record,
    });

    const {
      id,
      spId,
      spName,
      serviceType,
      userId,
      userName,
      roleId,
      roleName,
      categoryList = [],
      status,
    } = record;

    return {
      id,
      spId,
      spName,
      serviceType,
      userId,
      value: userId,
      label: userName,
      userName,
      roleId,
      roleName,
      categoryList:
        categoryList?.map((item: CategoryList) => {
          const { id, name } = item;
          return {
            id,
            name,
            label: name,
            value: id,
          };
        }) || [],
      status,
    };
  };
};

export default buildMakeCategoryList;
