// 列表请求参数
export interface IListParams {
  // 品牌名称,模糊查询
  brandName?: string;
  /**
   * 创建时间-结束时间
   */
  createRangeTime?: string;
  /**
   * 创建时间-结束时间
   */
  endRangeTime?: string;
  /**
   * 需求id,自增
   */
  id?: number;
  /**
   * 主营类目id
   */
  mainCategoryId?: number;
  pageNum?:        number;
  pageSize?:       number;
  priorityScore?: number;
  status?: number;
}
// 需求日志
export interface ILogItem {
  // 操作时间
  operateTime: string;
  // 操作人
  operator: string;
  // 操作类型
  operateType: string;
  // 操作描述
  operateDesc: string;
}

// react hooks dispatch
type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export interface IUseColumns {
  setRemarkModelVisible: Dispatch<boolean>;
  setRemarkModelValue: Dispatch<string>;
  setLogModelVisible: Dispatch<boolean>;
  setLogLeadsId: Dispatch<number>;
  setClueModelVisible: Dispatch<boolean>;
  setClueLeadsId: Dispatch<number>;
  setClueUnchangeableValue: Dispatch<{[key: string]: any}>;
  setNewDemandModelVisible: Dispatch<boolean>;
  setRow: React.Dispatch<React.SetStateAction<RequireEditItem | undefined>>;
  handleLink: (leadsId?: number) => void,
}

export interface IBrandItem {
  key?: string;
  value: string;
  label: string;
  brandId: number;
}

export interface TagItem {
  key?: string;
  value: string;
  label: string;
  tagId: number;
}

export interface RequireEditItem {
  id?: number;
  priorityScore: number;
  priorityScoreDesc: string;
  brandId: number;
  brandName: string;
  mainCategoryId: number;
  mainCategory: string;
  storeChannel: number|string[];
  storeChannelDesc?: string;
  leadsRequireNumber: number;
  enterpriseName: string;
  storeName: string;
  submitLeadsNumber: number;
  status?: number;
  statusDesc?: string;
  remark: string;
  canSubmitLeads?: boolean;
  canShowRemark?: boolean;
  createTimeStr?: string;
  createTime?: number;
  targetLabel?: number[];
  targetLabelStr?: string;
  targetOpId?: number;
  targetOpName?: string;
}

export interface IModelBaseProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TargetLabel {
  id: number;
  labelName: string;
  labelChannel: string;
  status: number;
  remark: string;
  creator: string;
  editor: string;
  createTime: string;
}

export interface LogListDataItem {
  operateTime: string;
  operator: string;
  operateType: string;
  operateDesc: string;
}

export interface LogList {
  datas: Array<LogListDataItem>;
  page: number;
  pageSize: number;
  pages: number;
  total: number;

}