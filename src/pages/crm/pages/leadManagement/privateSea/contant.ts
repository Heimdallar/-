export enum HitTagType {
  命中招商名单但不符合激励 = 0,
  命中招商名单且符合激励 = 1,
  未命中招商名单且提报信息 = 2,
  未命中招商名单且未提报信息 = 3,
}

export const HitTagOptions = [
  {
    label: '命中招商名单但不符合激励',
    value: HitTagType.命中招商名单但不符合激励,
  },
  {
    label: '命中招商名单且符合激励',
    value: HitTagType.命中招商名单且符合激励,
  },
  {
    label: '未命中招商名单且提报信息',
    value: HitTagType.未命中招商名单且提报信息,
  },
  {
    label: '未命中招商名单且未提报信息',
    value: HitTagType.未命中招商名单且未提报信息,
  },
];

export const planEndOptions = [
  { label: 'H5', value: 'H5' },
  { label: 'PC', value: 'PC' },
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
  { label: '待招商认领', value: Feedback.待招商认领 },
  { label: '洽谈失败', value: Feedback.洽谈失败 },
  { label: '需继续跟进', value: Feedback.入驻意愿沟通 },
];

export const bdFeedbackOptions = [
  { label: '无效线索', value: Feedback.无效线索 },
  { label: '商家同意入驻', value: Feedback['待提交入驻/新增资质申请'] },
  { label: '洽谈失败', value: Feedback.洽谈失败 },
  { label: '需继续跟进', value: Feedback.需继续跟进 },
];

export const willOptions = [
  { label: '商家未明确表明', value: undefined },
  { label: '商家有初步意愿', value: undefined },
];

export const QUICK_OPTIONS = [
  {
    title: '待确定入住意愿个数',
    key: 'waitEntryWill',
    personalInfoType: 3,
    params: {
      statusList: [9],
    },
  },
  {
    title: '待招商首次沟通个数',
    key: 'wait2Communicate',
    personalInfoType: 4,
    params: {
      statusList: [2],
    },
  },
  {
    title: '待招商反馈洽谈结果个数',
    key: 'waitCommunicateResult',
    personalInfoType: 5,
    params: {
      statusList: [2],
    },
  },
  {
    title: '待提交入驻新增资质申请个数',
    key: 'waitEntry',
    personalInfoType: 6,
    params: {
      statusList: [13],
    },
  },
];

export enum FromPage {
  公海,
  私海,
}

export enum StatusEnum {
  待招商认领 = 1,
  招商洽谈中,
  入驻意愿沟通 = 9,
  洽谈失败 = 10,
  无效线索 = 11,
  '待提交入驻/新增资质申请',
  '入驻完成/新增资质完成',
  已出价,
}

export const validOptions = [
  {
    value: 0,
    label: '无效',
  },
  {
    value: 1,
    label: '有效',
  },
  {
    value: 2,
    label: '待验证',
  },
];

export enum ReasonEnum {
  '联系方式错误-多次未接通' = 6001,
  '联系方式错误-空号、停机' = 6002,
  '联系方式错误-AI-三次未接通' = 6003,
  '联系方式错误-AI-三次未得到有效反馈' = 6004,
  '联系方式错误' = 4,
}

export const statusColor = [
  {
    color: 'red',
    desc: '无效',
  },
  {
    color: 'green',
    desc: '有效',
  },
  {
    color: 'warning',
    desc: '待验证',
  },
];

export const invalidPhoneReasonOptions = [
  {
    value: '多次未接通',
    label: '多次未接通',
  },
  {
    value: '空号、停机',
    label: '空号、停机',
  },
];
