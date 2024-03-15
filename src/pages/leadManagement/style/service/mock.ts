// 没有使用mooncake是因为脱离耦合，让业务发开人员删除mock数据就可以立即使用。
// 虽然定义和api.ts里是重复的，但不要在代码中混用，mock.ts是完全独立的。

import { BaseRequest } from '@/utils/request';
import { Item1 ,ReturnItem} from './interface';





/** 列表数据 */
export const getMockTableList = (params:Item1):ReturnItem => {
  const { pageNum = 15, pageSize } = params;
   
       const date:ReturnItem= {
                total:100,
                url:'adad',
                id: 12,
                title: 'test',//一级类目
                name: 'wang',//更新人姓名
                style: 'cool',//风格
                created_at: 123134,//创建时间
                updated_at: 786868,//更新时间
        } 
        
        console.log(date)
      
        return date
  }

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
export const updateMockMerchant = (): { success: boolean } => {
  return {
    success: true,
  };
};

/** 创建 */
export const createMockMerchant = (): { success: boolean } => {
  return {
    success: true,
  };
};
