import validEntitiesDataAndLogError from '@/utils/armsLogErrorForEntities';
import type { Data } from '../interface/queryyOperatorOverview';

const buildMakeByOperatorGetOverview = () => {
  return function makeByOperatorGetOverview(record: Data) {
    if (!record) {
      return null;
    }

    validEntitiesDataAndLogError({
      path: '/api/v1/h5/merchant-customer/merchant/customer/leads/statistic/byOperator/getOverview',
      configs: [
        {
          key: 'waitClaimTotalAmount',
          type: 'number',
        },
        {
          key: 'waitFirstCommunicateTotalAmount',
          type: 'number',
        },
        {
          key: 'waitCommunicatResultTotalAmount',
          type: 'number',
        },
        {
          key: 'waitEntryTotalAmount',
          type: 'number',
        },
        {
          key: 'waitBiddingTotalAmount',
          type: 'number',
        },
      ],
      data: record,
    });

    return {
      bizDate: record.bizDate,
      waitClaimTotalAmount: record.waitClaimTotalAmount,
      waitFirstCommunicateTotalAmount: record.waitFirstCommunicateTotalAmount,
      waitCommunicatResultTotalAmount: record.waitCommunicatResultTotalAmount,
      waitEntryTotalAmount: record.waitEntryTotalAmount,
      waitBiddingTotalAmount: record.waitBiddingTotalAmount,
    };
  };
};

export default buildMakeByOperatorGetOverview;
