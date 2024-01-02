/** 页面与组件消费的 Entity 类型定义 */

import type { InterfaceReply } from '@/utils/request';
import { TableListInterface } from '@/pages/module-tables/service/api';

type DataReply = InterfaceReply<typeof TableListInterface>;

export type IEntityOrderList = DataReply & {
  contents: {
    details: {
      isHNWI: string;
    };
  }[];
};
