import moment from 'moment';
import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data } from '../interface/queryOperatorRate';

const buildMakeByOperatorGetRate = () => {
  return function makeByOperatorGetRate(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/youthcamp-mer-customer/merchant/customer/leads/statistic/byOperator/getRate',
      configs: [
        {
          key: 'bizDate',
          type: 'string',
        },
        {
          key: 'targetTotalAmount',
          type: 'number',
        },
        {
          key: 'achievedTotalAmount',
          type: 'number',
        },
        {
          key: 'achievedTotalRate',
          type: 'number',
        },
      ],
      data: record,
    });

    return {
      bizDate: record.bizDate ? moment(record.bizDate).format('YYYY-MM-DD HH:mm:ss') : '',
      targetTotalAmount: record.targetTotalAmount,
      achievedTotalAmount: record.achievedTotalAmount,
      achievedTotalRate: Number(record.achievedTotalRate || 0),
    };
  };
};

export default buildMakeByOperatorGetRate;
