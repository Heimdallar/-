/**
 * Result<CustomTableConfigResp> :Result
 */
export interface ConfigQueryBaseConfigRes {
  code?: number;
  /**
   * CustomTableConfigResp
   */
  data?: Data;
  domain?: string;
  /**
   * 错误信息 ,Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * CustomTableConfigResp
 */
export interface Data {
  /**
   * 表格列(所有) ,Column
   */
  allColumns?: AllColumn[];
  /**
   * 表格列(用户已选) ,Column
   */
  selectedColumns?: SelectedColumn[];
  /**
   * 1-gondor，2-stark
   */
  sysCode?: number;
  /**
   * 表格唯一标识
   */
  tableKey?: string;
  /**
   * 表格显示名称
   */
  tableName?: string;
}

/**
 * 表格列(所有) ,Column
 */
export interface AllColumn {
  /**
   * 表格列唯一标识
   */
  columnKey?: string;
  /**
   * 表格列显示名称
   */
  columnName?: string;
  /**
   * 是否可移动：0-否，1-是
   */
  movable?: boolean;
  /**
   * 是否强制显示：0-否，1-是
   */
  required?: boolean;
  /**
   * 是否已选中：0-否，1-是
   */
  selected?: boolean;
  /**
   * 排序值：越小越靠前
   */
  sort?: number;
  /**
   * 是否可见：0-否，1-是
   */
  visible?: boolean;
}

/**
 * 表格列(用户已选) ,Column
 */
export interface SelectedColumn {
  /**
   * 表格列唯一标识
   */
  columnKey?: string;
  /**
   * 表格列显示名称
   */
  columnName?: string;
  /**
   * 是否可移动：0-否，1-是
   */
  movable?: boolean;
  /**
   * 是否强制显示：0-否，1-是
   */
  required?: boolean;
  /**
   * 是否已选中：0-否，1-是
   */
  selected?: boolean;
  /**
   * 排序值：越小越靠前
   */
  sort?: number;
  /**
   * 是否可见：0-否，1-是
   */
  visible?: boolean;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * CustomTableQueryReq :CustomTableQueryReq
 */
export interface ConfigQueryBaseConfigReq {
  /**
   * 1-gondor，2-stark3-招商系统
   */
  sysCode?: number;
  /**
   * 表配置唯一标识Key
   */
  tableKey: string;
  /**
   * 用户ID
   */
  userId?: number;
}
