export enum StatusEnum {
  已退出 = 0,
  经营中 = 1,
}

export const StatusOptions = [
  { label: '全部', value: '' },
  { label: '经营中', value: StatusEnum.经营中 },
  { label: '已退出', value: StatusEnum.已退出 },
];

export enum ServiceTypeEnum {
  全包型 = 0,
  资源型 = 1,
}

export const ServiceTypeOptions = [
  { label: '全部', value: '' },
  { label: '资源型', value: ServiceTypeEnum.资源型 },
  { label: '全包型', value: ServiceTypeEnum.全包型 },
];

export enum modeEnum {
  新建 = 'add',
  编辑 = 'edit',
  预览 = 'preview',
}
