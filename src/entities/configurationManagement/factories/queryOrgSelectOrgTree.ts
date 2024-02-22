import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data } from '../interface/queryOrgSelectOrgTree';

const makeChildrens = (record: Data) => {
  if (!record) {
    return null;
  }
  const { orgId, orgName, spId, parentId, orgType, sort, creator, operator, childrens } = record;
  validEntitiesDataAndLogError({
    path: '/api/v1/h5/youthcamp-mer-customer/merchant/customer/org/org/selectOrgTree',
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
        key: 'creator',
        type: 'string',
      },
      {
        key: 'operator',
        type: 'string',
      },
      {
        key: 'childrens',
        type: 'array',
      },
    ],
    data: record,
  });
  return {
    key: orgId,
    title: orgName,
    orgId,
    orgName,
    spId,
    parentId,
    orgType,
    sort,
    creator,
    operator,
    children: childrens?.map(makeChildrens).filter(Boolean),
  };
};

const buildMakeOrgSelectOrgTree = () => {
  return function makeOrgSelectOrgTree(record: Data) {
    if (!record) {
      return [];
    }
    const { orgId, orgName, spId, parentId, orgType, sort, creator, operator, childrens } = record;
    validEntitiesDataAndLogError({
      path: '/api/v1/h5/youthcamp-mer-customer/merchant/customer/org/org/selectOrgTree',
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
          key: 'creator',
          type: 'string',
        },
        {
          key: 'operator',
          type: 'string',
        },
        {
          key: 'childrens',
          type: 'array',
        },
      ],
      data: record,
    });

    return [
      {
        key: orgId,
        title: orgName,
        orgId,
        orgName,
        spId,
        parentId,
        orgType,
        sort,
        creator,
        operator,
        children: childrens?.map(makeChildrens).filter(Boolean),
      },
    ];
  };
};

export default buildMakeOrgSelectOrgTree;
