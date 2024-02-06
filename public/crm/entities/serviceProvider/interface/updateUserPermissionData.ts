/**
 * Result<?>
 */
export interface UpdateRes {
  code?: number;
  data?: { [key: string]: any };
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Error {
  message?: string;
  name?: string;
}
