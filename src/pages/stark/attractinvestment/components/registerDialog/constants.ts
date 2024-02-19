export const categoriesOptions = [
  { label: '鞋', value: 1 },
  { label: '服装', value: 2 },
  { label: '配件', value: 3 },
  { label: '箱包', value: 4 },
]

export const qualificationOptions = [
  { label: '品牌方', value: 1 },
  { label: '经销商', value: 12 },
  { label: '市场贸易商', value: 8 },
  { label: '扫货商', value: 9 },
]

export const brandTypeOptions = [
  { label: '全渠道', value: 3 },
  { label: '纯线上', value: 1 },
  { label: '纯线下', value: 2 },
  { label: '线上线下均无渠道', value: 0 },
]

export const storeChannelOptions = [
  { label: '天猫', value: '天猫'},
  { label: '淘宝', value: '淘宝' },
  { label: '京东', value: '京东'},
  { label: '小红书', value: '小红书' },
  { label: '网易严选', value: '网易严选'},
  { label: '考拉海购', value: '考拉海购' },
  { label: '线下门店', value: '线下门店' },
]

export const Column_Type = {
  'enterpriseName': 0,
  'brandId': 1,
  'mainCategoryId': 2,
  'contactName': 3,
  'contactMobileNumber': 4,
  'manageType': 5,
  'brandType': 6,
  'storeChannel': 7,
  'storeName': 8,
  'storeUrl': 9,
  'annualSales': 10,
  'xiaohongshuPostsNum': 11,
  'tiktokFansNum': 12,
}

export enum SubmitFromType {
  h5 = 0,
  stark = 1
}