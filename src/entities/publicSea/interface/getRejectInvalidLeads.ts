/**
 * Result<List<LeadsLabelResponse>>
 */
export interface ClueGetRejectInvalidLeadsRes {
  code?: number;
  data?: Datum[];
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Datum {
  id?: number;
  label?: string;
  next?: { [key: string]: any }[];
}

export interface Error {
  message?: string;
  name?: string;
}

export interface ClueGetRejectInvalidLeadsReq {
  leadsId?: number;
}
