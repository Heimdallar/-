export interface BrandSearchRes {
  code?:   number;
  data?:   Datum[];
  domain?: string;
  errors?: Error[];
  msg?:    string;
}

export interface Datum {
  /**
   * 品牌名
   */
  name?: string;
  /**
   * 主键id
   */
  id?: number;
}

export interface Error {
  message?: string;
  name?:    string;
}

export interface BrandSearchReq {
  name?:  string;
  pageNum: number,
  pageSize: number,
}

export interface Data {
  id?: number
  name?: string
}

export interface DataRes {
  pageNum: number,
  pageSize: number,
  total: number,
  pages: number,
  contents?: Data[],
}
