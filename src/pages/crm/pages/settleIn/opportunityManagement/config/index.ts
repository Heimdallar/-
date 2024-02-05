export const statusOptions = {
  0: { text: '暂不招商' },
  1: { text: '招商' },
};
export const recommendAwardStatusOptions = {
  0: { text: '否' },
  1: { text: '是' },
};

export const dbStatusOptions = {
  0: { text: '已落库' },
  1: { text: '预落库' },
  '-1': { text: '未落库' },
}

export enum QualificationType {
  个卖 = 13,
  品牌方 = 1,
  经销商 = 12,
  市场贸易商 = 8,
  扫货商 = 9,
}

export const QualificationObj: {
  [k in number]: string
} = {
  [QualificationType.个卖]: '个卖',
  [QualificationType.品牌方]: '品牌方',
  [QualificationType.经销商]: '经销商',
  [QualificationType.市场贸易商]: '市场贸易商',
  [QualificationType.扫货商]: '扫货商',
}

export const QualificationOptions = [
  { label: '个卖', value: QualificationType.个卖 },
  { label: '品牌方', value: QualificationType.品牌方 },
  { label: '经销商', value: QualificationType.经销商 },
  { label: '市场贸易商', value: QualificationType.市场贸易商 },
  { label: '扫货商', value: QualificationType.扫货商 },
]

export enum IncentiveType {
  是 = 1,
  否 = 0
}

export const IncentiveOptions = [
  {
    label: '是',
    value: IncentiveType.是
  },
  {
    label: '否',
    value: IncentiveType.否
  }
]
