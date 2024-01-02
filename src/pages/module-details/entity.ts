/** 页面与组件消费的 Entity 类型定义 */

import {
  IResultDetailData,
  IResultModalDetailData,
} from '@/pages/module-details/service/interface';

export type IEntityDetail = IResultDetailData & {
  extraContent: NonNullable<string>;
};

export type IEntityModalDetail = IResultModalDetailData & {
  extraContent: NonNullable<string>;
};
