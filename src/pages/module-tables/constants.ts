/** 常量与枚举定义 */

import { buildOptions } from '@/utils/tools';

export enum EditModalType {
  EDIT = '编辑',
  CREATE = '新建',
}

export enum StoreCategoryEnum {
  SHOP = 1,
  WAREHOUSE,
}

export const storeCategoryMap = {
  [StoreCategoryEnum.SHOP]: '店',
  [StoreCategoryEnum.WAREHOUSE]: '仓',
};

export enum SalePriceStatusEnum {
  可用 = 1,
  已删除,
}

export const salePriceStatusOptions = buildOptions(SalePriceStatusEnum);
