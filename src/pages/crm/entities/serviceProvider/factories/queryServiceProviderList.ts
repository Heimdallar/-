import moment from 'moment';
import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Content } from '../interface/queryServiceProviderList';

const makeCategoryList = (dataIds, dataNames) => {
  return dataIds.map((item, index) => {
    return {
      value: item,
      label: dataNames[index],
    };
  });
};
const buildMakeServiceProviderList = () => {
  return function makeServiceProviderList(record: Content) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/org/service_provider/page',
      configs: [
        {
          key: 'spId',
          type: 'number',
        },
        {
          key: 'spSubType',
          type: 'number',
        },
        {
          key: 'spSubTypeDesc',
          type: 'string',
        },
        {
          key: 'spName',
          type: 'string',
        },
        {
          key: 'spStatus',
          type: 'number',
        },
        {
          key: 'spStatusDesc',
          type: 'string',
        },
        {
          key: 'startEffectiveTime',
          type: 'string',
        },
        {
          key: 'endEffectiveTime',
          type: 'string',
        },
        {
          key: 'operator',
          type: 'string',
        },
        {
          key: 'modifyTime',
          type: 'string',
        },
        {
          key: 'dataIds',
          type: 'array',
        },
        {
          key: 'dataNames',
          type: 'array',
        },
      ],
      data: record,
    });

    const {
      spId,
      spSubType,
      spSubTypeDesc,
      spName,
      spStatus,
      spStatusDesc,
      startEffectiveTime,
      endEffectiveTime,
      operator,
      modifyTime,
      dataIds,
      dataNames,
      spNameAbbr,
    } = record;

    return {
      spId,
      value: spId,
      label: spName,
      spSubType,
      spSubTypeDesc,
      spName,
      spNameAbbr,
      spStatus,
      spStatusDesc,
      startEffectiveTime: moment(startEffectiveTime).format('YYYY-MM-DD'),
      endEffectiveTime: moment(endEffectiveTime).format('YYYY-MM-DD'),
      operator,
      modifyTime: moment(modifyTime).format('YYYY-MM-DD'),
      dataIds,
      dataNames,
      categoryList: makeCategoryList(dataIds, dataNames),
    };
  };
};

export default buildMakeServiceProviderList;
