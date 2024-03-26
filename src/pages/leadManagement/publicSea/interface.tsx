export interface IListItem {
    leadsId: number;
    brandName: string;
    mainCategory: string;
    brandType: number | undefined;
    source: number;
    status: number;
    enterpriseName: string;
    creator: string;
    createTime: string;
    labelIds?: string[];
    leftProcessTimeDesc:string;
    labelNames?: string[];
    leadsTypeDesc:string;
    hitTagDesc:string;
    modifyTime:string;
    operate:string[]
    timeoutDesc?:string;
    timeout?:string
  }

  export enum HitTagType {
    命中招商名单但不符合激励 = 0,
    命中招商名单且符合激励 = 1,
    未命中招商名单且提报信息 = 2,
    未命中招商名单且未提报信息 = 3
  }
  
  export const HitTagOptions = [
    {
      label: '普通招商品牌',
      value: 0
    },
    {
      label: '核心招商品牌',
      value: 1
    },
    {
      label: '未命中招商品牌',
      value: 2
    },
    {
      label: '未命中招商品牌且未提报店铺',
      value: 3
    }
  ]
  
  export const planEndOptions = [
    {label: 'H5', value: 'H5'},
    {label: 'PC', value: 'PC'},
  ]
  

  
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
  
  export const categoryIOption=[
    {
      label:'nono',
      value:1
    },
    {
      label:'yeye',
      value:2
    },
  ]
  

  export const storeChannelOptions=[
    {
      label:'淘宝',
      value:1
    },
    {
      label:'天猫',
      value:2
    },
    {
      label:'美团',
      value:3
    }
  ]



  export const failedOptions=[
    {
      label:'出价不符',
      value:0
    },
    {
      label:'其它',
      value:1
    }
  ]
 


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
  { label: '类目招商', value: 1 },
  { label: '招商活动', value: 2 },
  { label: '招商网站', value: 3 },
  { label: '外包招商', value: 4 },
  { label: '服务商', value: 5 },
];
export const clueSourceOptions = [
  { label: '雷达系统', value: 0, disabled: true },
  // ...createSourceOptions,
  { label: '商家申请', value: 6, disabled: true },
  { label: '招商活动', value: 2, disabled: true },
  { label: '招商网站', value: 3, disabled: true },
  { label: '运营招商', value: 9 },
];

export const statusEnum = {
  0:  '待完善',
  1:  '待认领' ,
  2: '已认领' ,
  5:  '待中台初审' ,
  6:  '中台初审不通过' ,
  3:  '待类目审核' ,
  4:  '类目审核不通过' ,
};
export const statusOptions = [
  { label: '入驻意愿初筛', value: 0 },
  { label: '待招商认领', value: 1 },
  { label: '招商洽谈中', value: 2 },
  { label: '洽谈失败', value: 3 },
  { label: '无效线索', value: 4 },
  { label: '待商家提交申请', value: 5 },
  { label: '商家申请审核中', value: 6 },
  { label: '资质已开通', value: 7 },
  { label: '已完成首次出价', value: 8 },
];
export const statusColor = {
  0: 'red',
  1: 'volcano',
  2: 'orange',
  3: 'magenta',
  4: '',
  5: 'gold',
  6: 'blue',
  7: 'green',
  8: 'cyan',
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

export const initApplyInfo = { mainCategory: '', leadsId: 0, isPass: true };

export const initRequstParams = {
  brandNameList: [],
  labelIds: [],
  leadsType: 0,
  statusList: [],
  styleList: [],
  subCategoryOptions: [],
};


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

export const enum Source {
  phone = 1,
  email = 2,
  costomer = 3,
  advertisement = 4,
  firends = 5,
  internet = 6,
  radar = 0,
  business = 8,
  other = -1,
  activity = 10
}


export interface IListParams {
  leadsId?: number;
  brandName?: string;
  mainCategoryId?: number;
  source?: number;
  status?: number;
  page?: number;
  pageSize?: number;
  planChannels?: string
  planEnds?: string
  hitTags?: number
  sortParamType?: string
  sortType?: string
  personalInfoType?: number
}

export interface IAddParams {
  brandI?: number;
  brandName?: string;
  hotBrand?: string;
  birthYear?: number;

  brandManual?: string;
  xiaohongshuPostsNum?: number;
  tiktokFansNum?: number;
  mainCategoryId?: number;
  mainCategory: string;
  categoryStyles: string[];
  brandType?: number;
  source?: Source;
  internetSaleInfos: IInternetSaleInfosObj[];
  enterpriseName?: string;
  contactName?: string;
  contactTitle?: string;
  contactMobileNumber?: string;
  contactMobile?: string;
  contactTelephone?: string;
  contactWechat?: string;
  contactWeibo?: string;
  contactEmail?: string;
  status: number;
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  trademarkRegistrationCertificate?: string;
  businessLicense?: string;
  brandQualificationType?: number | undefined | string;
  brandAuthLinkLevel?: BrandAuthLinkLevelEnum;
  createTime?: string;
  creator?: string;
  remark?: string;
  recommenderResponse?: any;
  isCenterVisible?: boolean;
  level2CategoryId?: number;
  level2Category?: string;
  leadsTypeDesc?: string;
  willingSendSample?: number;
  domesticStore?: string;
  [key: string]: any;
}

export interface IUpdateParams extends IAddParams {
  leadsId?: number;
}

export interface IDetailParams {
  leadsId: number;
  formPage: number;
}

export interface IStyleParams {
  mainCategory: string;
}

export interface IImportParams {
  leadsList: ILeadsListObj[];
  leadsKey?: string;
  isEnd?: boolean;
  creator?: string;
}

export interface IImportDataParams {
  ossKey: string;
  // 线索导入4003 申请单导入4002 审批单导入4004
  workType: 4003 | 4002 | 4004;
}

export interface IAllotParams {
  leadsId: number;
  priority: number;
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  operator?: string;
}

export interface IBatchAllotParams {
  leadsIds: (string | number | undefined)[];
  priority: number;
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  operator?: string;
}

export interface ICategoryListParams {
  pid: number;
  queryType: number;
  treeFlag: boolean;
  spuCountFlag: boolean;
}

export interface IInternetSaleInfosObj {
  storeChannel?: string;
  storeName?: string;
  storeLevel?: string;
  storeUrl?: string;
  mainBrand?: string;
  annualSales?: number;
  fansNum?: number;
}

export interface ILeadsListObj {
  brandName: string;
  mainCategory: string;
  categoryStyles: string[];
  brandType: number;
  source: number;
  internetSaleInfos: IInternetSaleInfosObj[];
  enterpriseName: string;
  contactName: string;
  contactTitle: string;
  contactMobileNumber?: string;
  contactMobile?: string;
  contactTelephone: string;
  contactWechat: string;
  contactWeibo: string;
  contactEmail: string;
}

export interface IManagerInfoParams {
  userName: string;
}

export interface IEventTarget {
  value: string;
}

export interface IBrandListParams {
  name: string;
  pageSize?: number;
  pageNum?: number;
}

export interface IAuthBusinessDeveloperParams {
  leadsId: number;
  businessDeveloperId: number;
}

export interface IAuthManagerParams {
  leadsId: number;
}

export interface IStyleListParams {
  mainCategory?: string | number;
  style?: string;
}

export interface IRejectParams {
  leadsId: number;
  reason: string | undefined;
  operator?: string;
  operatorId?: string;
}

export interface IDeleteLeadsIdParams {
  leadsIds: Array<number>;
}

export interface IOverviewParams {
  leadsId?: string | number;
  brandName?: string;
  mainCategoryId?: number;
  source?: number;
  status?: number;
  style?: string;
  creator?: string;
  outerShopName?: string;
  page?: number;
  pageSize?: number;
}

export interface ILogParams {
  leadsId?: string | number;
  page?: number;
  pageSize?: number;
}

export interface IRejectReasonParams {
  leadsId?: string | number;
}

export interface IRealParams {
  id?: string | number;
  fields: Array<string>;
}

interface kvObj {
  key?: number;
  value?: number;
  label?: string;
}

export interface brandObj {
  key?: string;
  value: string;
  label: string;
  brandId: number;
}

export interface IInitAudit {
  level1CategoryItem: kvObj;
  level2CategoryItem: kvObj;
}

export interface IListItem {
  leadsId: number;
  brandName: string;
  mainCategory: string;
  mainCategoryId: number;
  mainCategoryInfo?: kvObj;
  level2Category: string;
  level2CategoryId: number;
  categoryStyles: string[];
  brandType: number | undefined;
  source: number;
  status: number;
  enterpriseName: string;
  creator: string;
  createTime: string;
  labelIds?: string[];
  labelNames?: string[];
  [key: string]: any;
}

export interface ExpostData {
  total?: number;
  maintained?: number;
  distribute?: number;
}
export interface LogItem {
  operateDesc: string;
  operateTime: string;
  operateType: string;
  operator: string;
}

export interface ApplyItem {
  mainCategory: string
  leadsId: number
  isPass: boolean
}

export interface DetailDrawer {
  detailVisible: boolean;
  formState: any;
  batchLeadId: number;
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFormState: any
  setBatchLeadId: React.Dispatch<React.SetStateAction<number>>;
  refreshList: () => void;
  invokeUpdateDetail: (value: number) => void
}

export interface InterSaleInfos {
  storeChannel?: string;
  storeName?: string;
  storeLevel?: string;
  storeUrl?: string;
  mainBrand?: string;
  annualSales?: number;
  fansNum?: number;
}
