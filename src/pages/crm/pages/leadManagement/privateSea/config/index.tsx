import React, { useMemo } from 'react';
import { Image, Space } from 'poizon-design';
import { SortOrder } from 'poizon-design/lib/table/interface';
import { STORE_CHANNEL_KEY, STORE_CHANNEL_LIST } from '@/entities/storeChannel';
import LabelDisplay from '@/pages/leadManagement/publicSea/components/labelDisplay'

export const statusOptions = [
  { label: '待沟通', value: 10 },
  { label: '沟通中', value: 11 },
  { label: '暂不合作', value: 12 },
  { label: '待评审', value: 20 },
  { label: '评审不通过', value: 21 },
  { label: '评审通过', value: 22 },
  { label: '未入驻', value: 23 },
  { label: '入驻中', value: 30 },
  { label: '入驻完成', value: 31 },
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
  { label: '商家申请', value: 8 },
  { label: '运营招商', value: 9 },
  { label: '招商活动', value: 10 },
  { label: '招商网站', value: 11 },
];
export const clueSourceOptions = [
  { label: '雷达系统', value: 0, disabled: true },
  // ...createSourceOptions,
  { label: '商家申请', value: 8, disabled: true },
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

export const priorityOptions = [
  { label: 'P0', value: 0 },
  { label: 'P1', value: 1 },
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
  customerSeaResponse: {
    customerSeaResponse: '',
    leadsId: 0,
    customerSeaId: 0,
    brandName: '',
    mainCategoryId: 0,
    mainCategory: '',
    enterpriseName: '',
    categoryStyle: [],
    priorityName: '',
    sourceName: '',
    brandTypeName: '',
    leadsTypeName: '',
    status: 0,
    statusName: '',
    developer: '',
    modifyTimeStr: '',
    leadsOperator: '',
    labelNames: [],
    brandAuths: [],
    birthYear: 0,
    brandManual: '',
    xiaohongshuPostsNum: 0,
    hotBrand: '',
    brandAuthLinkLevel: 0,
    level2Category: '',
    willingSendSample: '',
    domesticStore: '',
  },
  recommenderResponse: {
    type: 0,
    name: '',
    phone: '',
    idCard: '',
    recommendEnterpriseName: '',
  },
  outSidePlatformInfos: [],
  enterpriseInfoResponse: {
    enterpriseName: '',
    contactName: '',
    contactTitle: '',
    contactMobile: '',
    contactTelephone: '',
    contactWechat: '',
    contactWeibo: '',
    contactEmail: '',
    customerSeasRemark: '',
  },
  entryBindResponse: {
    bindUrl: '',
    bindUrlInvalid: false,
    hideFollowEntryButton: false,
  },
  followUpInfoResponse: {
    status: 0,
    statusName: '',
    flowBD: '',
    modifyTimeStr: '',
    visitTimes: '',
  },
  enterpriseEnterInfoResponse: {
    enterStatus: undefined,
    enterStatusName: '',
    merchantId: undefined,
    userId: undefined,
    enterEnterpriseName: '',
    enterEnterpriseAccount: undefined,
    enterEnterpriseLegalName: '',
    remark: '',
    merchantType: 0,
  },
};

export const useColumns = () =>
  useMemo(() => {
    return [
      {
        title: '经营平台',
        dataIndex: 'shopChannel',
        key: 'shopChannel',
        width: 120,
      },
      {
        title: '店铺名称',
        dataIndex: 'shopName',
        key: 'shopName',
        width: 120,
      },
      {
        title: '外网链接',
        dataIndex: 'shopLink',
        key: 'shopLink',
        width: 150,
        ellipsis: true,
        render: (_: any, record: any) => {
          if (
            record.shopLink &&
            record.shopLink !== '' &&
            record.shopLink &&
            (record.shopLink.indexOf('.com') !== -1 || record.shopLink.indexOf('http') !== -1)
          )
            return (
              <a
                href={`${
                  record.shopLink.includes('http') ? record.shopLink : `http://${record.shopLink}`
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {record.shopLink}
              </a>
            );

          return `${record.shopLink || ''}`;
        },
      },
      {
        title: '月销售额/万',
        dataIndex: 'recentThirtyTurnover',
        key: 'recentThirtyTurnover',
        width: 160,
      },
      {
        title: '粉丝数/人',
        dataIndex: 'fansNum',
        key: 'fansNum',
        width: 120,
      },
      {
        title: '月商品数',
        dataIndex: 'spuCount',
        key: 'spuCount',
        width: 120,
      },
      {
        title: '店铺类型',
        dataIndex: 'storeType',
        width: 120,
      },
      {
        title: '销量',
        dataIndex: 'recentThirtySales',
        width: 120,
      },
      {
        title: '店铺标签',
        dataIndex: 'storeTags',
        render(_, record) {
          return <LabelDisplay record={{...record, labelNames: record.storeTags }}></LabelDisplay>
        },
      },
      {
        title: '店铺等级',
        dataIndex: 'shopLevel',
        width: 120,
      },
      {
        title: '综合体验分',
        dataIndex: 'experienceScore',
        width: 120,
      },
      {
        title: '件单价',
        dataIndex: 'averagePrice',
        width: 120,
      },
      // 后端无字段 暂时隐藏
      // {
      //   title: '主要商品',
      //   dataIndex: 'storeCatalogs',
      //   key: 'storeCatalogs',
      //   width: 250,
      //   render: (_: any, record: any) => {
      //     return (
      //       record.storeCatalogs && (
      //         <div className="storeCatalogs-img-group">
      //           <Image.PreviewGroup>
      //             <Space>
      //               {record.storeCatalogs.map((v: any, index: number) => {
      //                 return (
      //                   <Image
      //                     key={v + Math.random()}
      //                     width={50}
      //                     height={50}
      //                     style={{ objectFit: 'contain' }}
      //                     src={v}
      //                   />
      //                 );
      //               })}
      //             </Space>
      //           </Image.PreviewGroup>
      //         </div>
      //       )
      //     );
      //   },
      // },
    ];
  }, []);

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
  customerSeasRemark: undefined,
  leadsType: 0,
  leadsId: undefined,
  brandName: '',
  brandNameList: [],
  enterpriseName: '',
  mainCategoryId: undefined,
  level2CategoryId: undefined,
  priority: undefined,
  source: undefined,
  status: undefined,
  statusList: [],
  developer: undefined,
  categoryStyle: undefined,
  categoryStyleList: [],
  storeName: undefined,
  labelIds: [],
  subCategoryOptions: [],
};

export const storeChannelOptions = STORE_CHANNEL_LIST.map((channel) => {
  return {
    label: channel.label,
    value: channel.label, // 这里确实是 label，也就是中文名
  };
});

export const defaultItemCol = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export enum reviewTypeMsg {
  '待提交' = 0,
  '待评审' = 10,
  '下次评审' = 20,
  '评审不通过' = 30,
  '评审通过' = 40,
}

/* BD结果 */
export const processOptions = [
  { label: '继续沟通', value: 11 },
  { label: '暂不合作', value: 12 },
  { label: '可以评审', value: 20 },
  { label: '直接入驻', value: 30 },
];

export const REASON_OPTIONS = [
  {
    value: '商家暂无意向',
    label: '商家暂无意向',
  },
  {
    value: '平台暂无意向',
    label: '平台暂无意向',
  },
  {
    value: '商务条款问题',
    label: '商务条款问题',
  },
  {
    value: '其他',
    label: '其他',
  },
];

export enum PrivateSeaStatusEnum {
  '待沟通' = 10,
  '沟通中' = 11,
  '暂不合作' = 12,
  '待评审' = 20,
  '评审不通过' = 21,
  '评审通过' = 22,
  '未入驻' = 23,
  '入驻中' = 30,
  '入驻完成' = 31,
}

export enum TimeoutModeEnum {
  全部 = -1,
  为超时,
  即将超时,
  已超时,
}

export const timeoutModeMap = new Map([
  [TimeoutModeEnum.全部, '全部'],
  [TimeoutModeEnum.即将超时, '即将超时'],
  [TimeoutModeEnum.已超时, '已超时'],
]);

export const statusColorFn = (val: number) => {
  if (
    [
      PrivateSeaStatusEnum.评审通过,
      PrivateSeaStatusEnum.入驻中,
      PrivateSeaStatusEnum.入驻完成,
    ].includes(val)
  ) {
    return 'success';
  }
  if (
    [
      PrivateSeaStatusEnum.暂不合作,
      PrivateSeaStatusEnum.评审不通过,
      PrivateSeaStatusEnum.未入驻,
    ].includes(val)
  ) {
    return 'red';
  }
  if ([PrivateSeaStatusEnum.待沟通, PrivateSeaStatusEnum.待评审].includes(val)) {
    return 'warning';
  }
  return 'default';
};

export const columnKeyMap = new Map([
  [STORE_CHANNEL_KEY.Tmall, 1],
  [STORE_CHANNEL_KEY.TaoBao, 2],
  [STORE_CHANNEL_KEY.JD, 3],
]);

export function getColumnKey(key: STORE_CHANNEL_KEY | string) {
  return columnKeyMap.get(key) || 4;
}

export function getSortType(key: SortOrder | null) {
  if (key === 'ascend') {
    return 1;
  }
  if (key === 'descend') {
    return 2;
  }
  return 0;
}
