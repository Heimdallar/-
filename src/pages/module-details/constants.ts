/** 常量与枚举定义 */

import { buildOptions } from '@/utils/tools';

export enum JobRelationEnum {
  全职员工 = 1,
  兼职员工,
  居家员工,
}

export const jobRelationOptions = buildOptions(JobRelationEnum);
