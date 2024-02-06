// 页面模式
export enum PageModeEnum {
  欢迎模式 = 'none',
  单类目模式 = 'singleCategory',
  多类目模式 = 'multiCategory',
}

// 数量标签
enum CountTagEnum {
  待认领 = 'waitClaimTotalAmount',
  待首次沟通 = 'waitFirstCommunicateTotalAmount',
  待反馈洽谈结果 = 'waitCommunicatResultTotalAmount',
  待提交入驻 = 'waitEntryTotalAmount',
  待出价 = 'waitBiddingTotalAmount',
}

export const tagList = [
  {
    label: '待认领',
    key: CountTagEnum.待认领,
    url: '/leadManagement/publicSea?statusList=1',
  },
  {
    label: '待首次沟通',
    key: CountTagEnum.待首次沟通,
    url: '/leadManagement/publicSea?statusList=2&personalInfoType=4',
  },
  {
    label: '待反馈洽谈结果',
    key: CountTagEnum.待反馈洽谈结果,
    url: '/leadManagement/publicSea?statusList=2&personalInfoType=5',
  },
  {
    label: '待提交入驻',
    key: CountTagEnum.待提交入驻,
    url: '/leadManagement/publicSea?statusList=13',
  },
  {
    label: '待出价',
    key: CountTagEnum.待出价,
    url: '/leadManagement/publicSea?statusList=15',
  },
];

export enum TypeEnum {
  按类目 = 'category',
  按人员 = 'person',
}

export const typeList = [
  {
    label: '按类目',
    value: TypeEnum.按类目,
  },
  {
    label: '按人员',
    value: TypeEnum.按人员,
  },
];

export enum RankTypeEnum {
  按完成度 = 'complete',
  按数量 = 'amount',
}

export const rankTypeList = [
  {
    label: '按完成度',
    value: RankTypeEnum.按完成度,
  },
  {
    label: '按数量',
    value: RankTypeEnum.按数量,
  },
];

export const allCategory = 'ALL';
