/**
 * Result<CustomTableDisplayResp> :Result
 */
export interface ConfigQueryUserConfigRes {
  code?: number;
  /**
   * CustomTableDisplayResp
   */
  data: Data;
  domain?: string;
  /**
   * 错误信息 ,Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * CustomTableDisplayResp
 */
export interface Data {
  /**
   * 表格列(用户已选) ,Column
   */
  selectedColumns: SelectedColumn[];
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
  /**
   * 是否是用户自定义配置
   */
  userConfig?: boolean;
}

/**
 * 表格列(用户已选) ,Column
 */
export interface SelectedColumn {
  /**
   * 表格列唯一标识
   */
  columnKey: string;
  /**
   * 表格列显示名称
   */
  columnName?: string;
  /**
   * 是否可移动：0-否，1-是
   */
  movable?: boolean;
  /**
   * 排序值：越小越靠前
   */
  sort?: number;
  /**
   * 是否可见：0-否，1-是
   */
  visible?: boolean;

  required?: boolean;
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
export interface ConfigQueryUserConfigReq {
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

export interface SelectedColumnsType {
  [key: string]: any;
}