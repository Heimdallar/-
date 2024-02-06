export enum StatusEnum {
  停用 = 0,
  启用 = 1,
}

export const StatusOptions = [
  { label: '全部', value: '' },
  { label: '停用', value: StatusEnum.停用 },
  { label: '启用', value: StatusEnum.启用 },
];

export enum RoleTypeEnum {
  线索跟进人 = 1,
  BD跟进人 = 2,
  管理员 = 3,
  审核运营人 = 4,
  平台管理员 = 6,
}

export const RoleTypeOptions = [
  { label: '线索跟进人', value: RoleTypeEnum.线索跟进人 },
  { label: 'BD跟进人', value: RoleTypeEnum.BD跟进人 },
];
