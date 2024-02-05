export interface DelReq {
  spId: number;
}

export interface DelRes {
  code?: number;
  /**
   * Void
   */
  data?: { [key: string]: any };
  domain?: string;
  /**
   * Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * Error
 */
export interface Error {
  message?: string;
  name?: string;
}
