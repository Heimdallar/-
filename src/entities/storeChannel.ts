// 店铺渠道相关信息
// 按照整洁架构的约定，可以在应用见复用的各种业务逻辑【不限于形式】，都需放在 entities 里面
export enum STORE_CHANNEL_KEY {
  Tmall = 'tmall',
  TaoBao = 'taobao',
  JD = 'jd',
  LittleRedBook = 'littleRedBook',
  NeteaseCarefullySelected = 'neteaseCarefullySelected',
  KoalaOverseas = 'koalaOverseas',
  OfflineStore = 'offlineStore',
  Platform = 'platform',
  DouYin = 'douyin',
  PinDuoDuo = 'pinduoduo',
  KuaiShou = 'KuaiShou',
  WeiPinHui = 'WeiPinHui',
  JiYouJia = 'JiYouJia',
  SuNingYiGou = 'SuNingYiGou',
  WeiXinXiaoChengXu = 'WeiXinXiaoChengXu',
}

// 店铺渠道列表
// ref: https://mooncake-v2.shizhuang-inc.com/project/interface?categoryId=bb3e85c2-ee85-447a-83d8-79aca81c71a4&id=434438&newIds=434436%2C434437%2C434438%2C&projectId=2540
export const STORE_CHANNELS_MAP: {
  [id: number]: {
    label: string;
    key: STORE_CHANNEL_KEY;
  };
} = {
  0: {
    label: '天猫',
    key: STORE_CHANNEL_KEY.Tmall,
  },
  1: {
    label: '淘宝',
    key: STORE_CHANNEL_KEY.TaoBao,
  },
  2: {
    label: '京东',
    key: STORE_CHANNEL_KEY.JD,
  },
  3: {
    label: '小红书',
    key: STORE_CHANNEL_KEY.LittleRedBook,
  },
  4: {
    label: '网易严选',
    key: STORE_CHANNEL_KEY.NeteaseCarefullySelected,
  },
  5: {
    label: '考拉海购',
    key: STORE_CHANNEL_KEY.KoalaOverseas,
  },
  6: {
    label: '线下门店',
    key: STORE_CHANNEL_KEY.OfflineStore,
  },
  7: {
    label: '官网平台',
    key: STORE_CHANNEL_KEY.Platform,
  },
  8: {
    label: '抖音',
    key: STORE_CHANNEL_KEY.DouYin,
  },
  9: {
    label: '拼多多',
    key: STORE_CHANNEL_KEY.PinDuoDuo,
  },
};

// 申请单店铺
export const STORE_CHANNELS_MAP_APPLY: {
  [id: number]: {
    label: string;
    key: STORE_CHANNEL_KEY;
  };
} = {
  0: {
    label: '天猫',
    key: STORE_CHANNEL_KEY.Tmall,
  },
  1: {
    label: '淘宝',
    key: STORE_CHANNEL_KEY.TaoBao,
  },
  2: {
    label: '京东',
    key: STORE_CHANNEL_KEY.JD,
  },
  3: {
    label: '小红书',
    key: STORE_CHANNEL_KEY.LittleRedBook,
  },
  4: {
    label: '网易严选',
    key: STORE_CHANNEL_KEY.NeteaseCarefullySelected,
  },
  5: {
    label: '考拉海购',
    key: STORE_CHANNEL_KEY.KoalaOverseas,
  },
  6: {
    label: '线下门店',
    key: STORE_CHANNEL_KEY.OfflineStore,
  },
  7: {
    label: '官网平台',
    key: STORE_CHANNEL_KEY.Platform,
  },
  8: {
    label: '抖音',
    key: STORE_CHANNEL_KEY.DouYin,
  },
  9: {
    label: '拼多多',
    key: STORE_CHANNEL_KEY.PinDuoDuo,
  },

  10: {
    label: '快手',
    key: STORE_CHANNEL_KEY.KuaiShou,
  },
  11: {
    label: '唯品会',
    key: STORE_CHANNEL_KEY.WeiPinHui,
  },
  12: {
    label: '极有家',
    key: STORE_CHANNEL_KEY.JiYouJia,
  },
  13: {
    label: '苏宁易购',
    key: STORE_CHANNEL_KEY.SuNingYiGou,
  },
  14: {
    label: '微信小程序',
    key: STORE_CHANNEL_KEY.WeiXinXiaoChengXu,
  },
};

// 申请单管理
export const STORE_CHANNEL_APPLY_LIST = Object.keys(STORE_CHANNELS_MAP_APPLY).map((id) => {
  return {
    id,
    ...STORE_CHANNELS_MAP_APPLY[+id],
  };
});

export const STORE_CHANNEL_LIST = Object.keys(STORE_CHANNELS_MAP).map((id) => {
  return {
    id,
    ...STORE_CHANNELS_MAP[+id],
  }
});

export enum ChannelColumn {
  // 中文名
  Label = 'label',
  // 英文的key
  Key = 'key',
  Id = 'id',
}
export const getChannelMap = (keyColumn: ChannelColumn, valueColumn: ChannelColumn) => {
  const map: any = {};
  STORE_CHANNEL_LIST.forEach(channel => {
    map[channel[keyColumn]] = channel[valueColumn];
  });
  return map;
}