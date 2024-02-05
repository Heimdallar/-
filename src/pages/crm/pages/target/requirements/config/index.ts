import { STORE_CHANNEL_LIST } from "@/entities/storeChannel";

// 优先级
export const PRIORITY_OPTIONS = [
  { label: 'P0', value: 0 },
  { label: 'P1', value: 1 },
  { label: 'P2', value: 2 },
  { label: 'P3', value: 3 },
  { label: 'P4', value: 4 },
  { label: 'P5', value: 5 },
];

// 经营平台列表
export const STORE_CHANNELS = STORE_CHANNEL_LIST.map(channel => {
  return {
    label: channel.label,
    value: channel.id, // 这里传的是 id， by 王思思
  }
}).filter(channel => {
  if (['线下门店', '官网平台', '小红书', '网易严选', '考拉海购'].includes(channel.label)) {
    return false;
  }
  return true;
});

// 资质类型列表
export const QUALIFICATION_TYPES = [
  { label: '品牌方', value: 1 },
  { label: '经销商', value: 2 },
  { label: '其他', value: 99 },
];

// 需求状态列表
export const REQUIREMENT_STATUS = [
  { label: '待处理', value: 2 },
  { label: '未开始', value: 3 },
  { label: '进行中', value: 4 },
  { label: '已完成', value: 1 },
  { label: '已作废', value: 5 },
  { label: '待完成', value: 0 }
];

export const REQ_STATUS_MAP = {
  '已完成': 1,
  '待处理': 2,
  '未开始': 3,
  '进行中': 4,
  '已作废': 5,
  '待完成': 0
}

export const initRequstParams = {
  brandNameList: [],
  labelIds: [],
  leadsType: 0,
  statusList: [],
  styleList: [],
  subCategoryOptions: [],
};


export const defaultItemCol = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};