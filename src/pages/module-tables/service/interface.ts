/** 原 YAPI 上的接口返回数据类型定义 */
/**
 * 接口请求分页参数
 */
interface PageRequest {
  /** 页码 */
  pageNum: number;
  /** 条数 */
  pageSize: number;
}
/**
 * 接口返回分页参数
 */
interface PageReply {
  /** 总条数 */
  total: number;
}

type Status = 'draft' | 'wait' | 'success' | 'fail';

export type IQueryComplexSearchTable = PageRequest & {
  title?: string;
  minAmount?: number;
  maxAmount?: number;
  enable?: '1' | '0';
  createTimeStart?: number;
  createTimeEnd?: number;
};

export type IResultComplexSearchTable = PageReply & {
  contents: {
    id: string;
    /** 标题 */
    title: string;
    /** 创建时间，unixTimeStamp */
    createTime: number;
    /** 状态 */
    status: Status;
    /** 金额（分） */
    amount: number;
    /** 开关 */
    enable: '1' | '0';
    /** 备注 */
    remark: string;
    /** 备注 */
    details: Record<'address' | 'remark' | 'live' | 'telephone' | 'userName' | 'deposit', string>;
  }[];
};
export interface IQuerySceneBalance {
  accountCode?: string;
  accountCurrency?: string;
  accountType?: string;
  accountUse?: string;
  beginTime?: string;
  endTime?: string;
  status?: string;
  username?: string;
}

export interface IResultQuerySceneBalance {
  accountCategory: string;
  accountCode: string;
  accountNature: string;
  accountType: string;
  accountUse: string;
  availableBal: number;
  deficitFlag: string;
  freezeBal: number;
  gmtCreated: string;
  status: number;
  statusDesc: string;
  totalBal: number;
  username: string;
}

export interface MerchantRecord {
  orderType: string;
  businessType: string;
  companyNo: string;
  licenceImg: string;
  companyName: string;
  registerMoney: string;
  introduction: string;
}

export type IUpdateMerchantType = Pick<
  MerchantRecord,
  'orderType' | 'businessType' | 'companyNo' | 'companyName'
> & {
  title?: string;
};
