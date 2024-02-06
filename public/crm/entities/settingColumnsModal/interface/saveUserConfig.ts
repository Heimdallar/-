/**
 * Result<Boolean> :Result
 */
export interface ConfigSaveUserConfigRes {
  code?: number;
  /**
   * data
   */
  data?: boolean;
  domain?: string;
  /**
   * 错误信息 ,Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * 错误信息 ,Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * CustomTableSaveReq :CustomTableSaveReq
 */
export interface ConfigSaveUserConfigReq {
  /**
   * 表格列(用户已选) ,Column
   */
  selectedColumns?: SelectedColumn[];
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

/**
 * 表格列(用户已选) ,Column
 */
export interface SelectedColumn {
  /**
   * 表格列唯一标识
   */
  columnKey: string;
}
