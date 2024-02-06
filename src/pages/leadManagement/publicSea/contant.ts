export enum HitTagType {
  命中招商名单但不符合激励 = 0,
  命中招商名单且符合激励 = 1,
  未命中招商名单且提报信息 = 2,
  未命中招商名单且未提报信息 = 3
}

export const HitTagOptions = [
  {
    label: '普通招商品牌',
    value: HitTagType.命中招商名单但不符合激励
  },
  {
    label: '核心招商品牌',
    value: HitTagType.命中招商名单且符合激励
  },
  {
    label: '未命中招商品牌',
    value: HitTagType.未命中招商名单且提报信息
  },
  {
    label: '未命中招商品牌且未提报店铺',
    value: HitTagType.未命中招商名单且未提报信息
  }
]

export const planEndOptions = [
  {label: 'H5', value: 'H5'},
  {label: 'PC', value: 'PC'},
]

export const statusColor = {
  9: 'red',
  1: 'volcano',
  2: 'orange',
  10: 'magenta',
  11: '',
  13: 'gold',
  14: 'blue',
  15: 'green',
  16: 'cyan',
};

export enum QualificationType {
  个卖 = 13,
  品牌方 = 1,
  经销商 = 12,
  市场贸易商 = 8,
  扫货商 = 9,
}

export const QualificationOptions = [
  { label: '品牌方', value: QualificationType.品牌方 },
  { label: '经销商', value: QualificationType.经销商 },
  { label: '市场贸易商', value: QualificationType.市场贸易商 },
  { label: '个卖', value: QualificationType.个卖 },
]

export const TimeoutOptions = [
  {
    value: 0,
    label: '未超时'
  },
  {
    value: 1,
    label: '即将超时'
  },
  {
    value: 2,
    label: '已超时'
  },
  {
    value: 3,
    label: '即将被回收'
  },
]

export const QUICK_OPTIONS =[
  {
    title: '待线索维护人认领',
    key: 'waitClueFollowerClaim',
    personalInfoType: 1,
    params: {
      statusList: [9],
    }
  },
  {
    title: '待招商认领',
    key: 'waitClaim',
    personalInfoType: 2,
    params: {
      statusList: [1],
    }
  },
];

export const timeoutColor = {
  1: 'blue',
  2: 'magenta',
  3: 'warning'
}

export const applyIntentionOptions =[
  {
    label: '明确表明',
    value: 1,
  },
  {
    label: '未明确表明',
    value: 0,
  },
];

export enum Feedback {
  待招商认领 = 1,
  需继续跟进 = 2,
  入驻意愿沟通 = 9,
  洽谈失败 = 10,
  无效线索 = 11,
  '待提交入驻/新增资质申请' = 13,
  '入驻/新增资质审核中' = 14,
  '入驻/新增资质完成' = 15,
  已出价 = 16,
}

export const accendantFeedbackOptions = [
  { label: '无效线索', value: Feedback.无效线索 },
  { label: '洽谈失败', value: Feedback.洽谈失败 },
];

export const bdFeedbackOptions = [
  { label: '无效线索', value: Feedback.无效线索 },
  { label: '洽谈失败', value: Feedback.洽谈失败 },
];

export const willOptions = [
  { label: '商家未明确表明', value: undefined },
  { label: '商家有初步意愿', value: undefined },
];
