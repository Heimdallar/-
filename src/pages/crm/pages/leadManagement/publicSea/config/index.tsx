import React, { useMemo } from 'react';
import { Typography } from 'poizon-design';
import { STORE_CHANNEL_LIST } from '@/entities/storeChannel';
import { ApplyItem, IInternetSaleInfosObj } from '../interface';

const { Link } = Typography;

export const statusOptions = [
  { label: '入驻意愿初筛', value: 9 },
  { label: '待招商认领', value: 1 },
  { label: '招商洽谈中', value: 2 },
  { label: '洽谈失败', value: 10 },
  { label: '无效线索', value: 11 },
  { label: '待商家提交申请', value: 13 },
  { label: '商家申请审核中', value: 14 },
  { label: '资质已开通', value: 15 },
  { label: '已完成首次出价', value: 16 },
];

/* 品牌类别 */
export const brandTypeOptions = [
  { label: '线上线下均无渠道', value: 0 },
  { label: '纯线上', value: 1 },
  { label: '纯线下', value: 2 },
  { label: '全渠道', value: 3 },
];

/* 信息来源 */
export const sourceOptions = [
  { label: '雷达系统', value: 0 },
  // ...createSourceOptions,
  { label: '类目招商', value: 9 },
  { label: '招商活动', value: 10 },
  { label: '招商网站', value: 11 },
  { label: '外包招商', value: 12 },
  { label: '服务商', value: 13 },
];
export const clueSourceOptions = [
  { label: '雷达系统', value: 0, disabled: true },
  // ...createSourceOptions,
  { label: '商家申请', value: 8, disabled: true },
  { label: '招商活动', value: 10, disabled: true },
  { label: '招商网站', value: 11, disabled: true },
  { label: '运营招商', value: 9 },
];

export const statusEnum = {
  0: { text: '待完善' },
  1: { text: '待认领' },
  2: { text: '已认领' },
  5: { text: '待中台初审' },
  6: { text: '中台初审不通过' },
  3: { text: '待类目审核' },
  4: { text: '类目审核不通过' },
};

export const defaultOrder = {
  order: 1,
};

export const tabsSettingOpt = [
  {
    value: 0,
    label: '全部',
  },
  {
    value: 3,
    label: '新品牌新商家',
  },
  {
    value: 4,
    label: '新品牌老商家',
  },
  {
    value: 5,
    label: '老品牌老类目新商家',
  },
  // {
  //   value: 6,
  //   label: '老品牌老类目老商家',
  // },
  {
    value: 7,
    label: '老品牌新类目新商家',
  },
  {
    value: 8,
    label: '老品牌新类目老商家',
  },
];
export const tabsSetting2Opt = [
  {
    value: 1,
    label: '全部',
  },
  {
    value: 3,
    label: '新品牌新商家',
  },
  {
    value: 4,
    label: '新品牌老商家',
  },
];
export const tabsSetting3Opt = [
  {
    value: 2,
    label: '全部',
  },
  {
    value: 5,
    label: '老品牌老类目新商家',
  },
  // {
  //   value: 6,
  //   label: '老品牌老类目老商家',
  // },
  {
    value: 7,
    label: '老品牌新类目新商家',
  },
  {
    value: 8,
    label: '老品牌新类目老商家',
  },
];

export const priorityOptions = [
  { label: 'P0', value: 0 },
  { label: 'P1', value: 1 },
  { label: 'P1狂上货', value: 6 },
  { label: 'P2', value: 2 },
  { label: 'P3', value: 3 },
  { label: 'P4', value: 4 },
  { label: 'P5', value: 5 },
];

export const tabOptions = [
  {
    key: '0',
    tab: <span>全部</span>,
  },
  {
    key: '1',
    tab: <span>新品牌</span>,
  },
  {
    key: '2',
    tab: <span>老品牌</span>,
  },
];

export const initInternetSaleInfos = {
  storeChannel: undefined,
  storeName: '',
  storeLevel: '',
  storeUrl: '',
  mainBrand: '',
  annualSales: undefined,
  fansNum: undefined,
};

export const initFormState = {
  leadsId: undefined,
  brandId: undefined,
  hotBrand: '',
  birthYear: undefined,
  brandName: undefined,
  brandManual: '',
  xiaohongshuPostsNum: undefined,
  tiktokFansNum: undefined,
  mainCategoryId: 0,
  mainCategory: '',
  mainCategoryInfo: undefined,
  categoryStyles: [],
  brandType: undefined,
  source: undefined,
  internetSaleInfos: [],
  enterpriseName: '',
  contactName: '',
  contactTitle: '',
  contactMobileNumber: '',
  contactTelephone: '',
  contactWechat: '',
  contactWeibo: '',
  contactEmail: '',
  status: 0,
  trademarkRegistrationCertificate: '',
  businessLicense: '',
  brandQualificationType: undefined,
  brandAuthLinkLevel: undefined,
  creator: '',
  createTime: '',
  remark: '',
  labelNames: [],
  brandAuths: [],
  recommenderResponse: {
    name: '',
    type: undefined,
    recommendEnterpriseName: '',
    idCard: '',
    phone: '',
  },
  level2Category: '',
  level2CategoryId: undefined, // new add
  leadsTypeDesc: '',
  isCenterVisible: false,
  willingSendSample: undefined,
  domesticStore: '',
  extProps: '',
  labelIds: [],
  leadsType: undefined,
};

export const enum BrandAuthLinkLevelEnum {
  oneLevel = 1,
  secondLevel = 2,
  Tertiary = 3,
}

export const BrandLinkLevelMsg = {
  [BrandAuthLinkLevelEnum.oneLevel]: '一级链路',
  [BrandAuthLinkLevelEnum.secondLevel]: '二级链路',
  [BrandAuthLinkLevelEnum.Tertiary]: '三级及以上链路',
  empty: '',
};

export const initApplyInfo: ApplyItem = { mainCategory: '', leadsId: 0, isPass: true };

export const initRequstParams = {
  brandNameList: [],
  labelIds: [],
  leadsType: 0,
  statusList: [],
  styleList: [],
  subCategoryOptions: [],
};

export const storeChannelOptions = STORE_CHANNEL_LIST.map((channel) => {
  return {
    label: channel.label,
    value: channel.label, // 这里确实是 label，也就是中文名
  };
});

export const defaultItemCol = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

export const WillingnessOptions = [
  {
    label: '愿意',
    value: 1,
  },
  {
    label: '不愿意',
    value: 2,
  },
  {
    label: '未明确表明',
    // value: 99, // by 王思思，要改动
    value: 0,
  },
];

export const willingnessMap = WillingnessOptions.reduce((pre, current) => {
  pre[current.value] = current.label;
  return pre;
}, {} as { [value: number]: string });

export const WillingnessSelectOptions = [
  {
    label: '愿意',
    value: 1,
  },
  {
    label: '不愿意',
    value: 2,
  },
  {
    label: '未明确表明',
    // value: 99, // by 王思思，要改动
    value: 0,
  },
  {
    label: '类目错误',
    value: 3,
  },
  {
    label: '联系方式错误',
    value: 4,
  },
];

export const willingnessSelectMap = WillingnessSelectOptions.reduce((pre, current) => {
  pre[current.value] = current.label;
  return pre;
}, {} as { [value: number]: string });

export enum OperatesEnum {
  认领 = '认领',
  转移 = '转移',
  分配 = '分配',
  驳回 = '驳回',
}

export enum FollowProgressOptionsEnum {
  首次建联 = 4,
  反馈洽谈结果 = 5,
}
// 跟进进度
export const FollowProgressOptions = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '首次建联',
    value: FollowProgressOptionsEnum.首次建联,
  },
  {
    label: '反馈洽谈结果',
    value: FollowProgressOptionsEnum.反馈洽谈结果,
  },
];
