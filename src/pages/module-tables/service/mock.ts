// 没有使用mooncake是因为脱离耦合，让业务发开人员删除mock数据就可以立即使用。
// 虽然定义和api.ts里是重复的，但不要在代码中混用，mock.ts是完全独立的。

import { BaseRequest } from '@/utils/request';
import {
  IQueryComplexSearchTable,
  IResultComplexSearchTable,
  IUpdateMerchantType,
} from '@/pages/module-tables/service/interface';

type Status = 'draft' | 'wait' | 'success' | 'fail';

/** 列表数据 */
export const getMockTableList = (params: IQueryComplexSearchTable): IResultComplexSearchTable => {
  const { pageNum = 1, pageSize } = params;

  return {
    total: 102,
    contents: new Array(pageSize).fill(0).map((_, k) => {
      const id = `${pageNum}-${k}`;

      return {
        id,
        title: `标题${id}`,
        createTime: Math.ceil(new Date().getTime()),
        status: ['draft', 'wait', 'success', 'fail'][Math.floor(Math.random() * 4)] as Status,
        amount: Math.ceil(Math.random() * 1000000),
        enable: Math.random() > 0.5 ? '1' : '0',
        remark: `我是一个比较长的备注，用来测试表格横向滚动，以及看看换行的效果。我是一个比较长的备注，用来测试表格横向滚动，以及看看换行的效果。${id}`,
        details: {
          userName: 'Zhou Maomao',
          telephone: '181-0000-000',
          live: 'Hangzhou, Zhejiang',
          remark: '[sensitive words] comments',
          address: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
          deposit: '1000000',
        },
      };
    }),
  };
};

/** 枚举 */
export const getMockEnums = (params: BaseRequest): Record<string, Record<string, string>> => {
  console.log('getMockEnums params', params);
  return {
    status: {
      draft: '草稿',
      wait: '待审核',
      success: '审核通过',
      fail: '审核失败',
    },
    orderType: {
      standard: '标品',
      nonStandard: '非标品',
    },
  };
};

/** 更新 */
export const updateMockMerchant = (params: IUpdateMerchantType): { success: boolean } => {
  console.log('updateMockMerchant params', params);
  return {
    success: true,
  };
};

/** 创建 */
export const createMockMerchant = (params: IUpdateMerchantType): { success: boolean } => {
  console.log('createMockMerchant params', params);
  return {
    success: true,
  };
};
