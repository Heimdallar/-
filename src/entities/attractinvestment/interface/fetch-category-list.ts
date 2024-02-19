/**
 * CategoryListRequest :CategoryListRequest
 */
export interface CategoryListReq {
  name?: string;
}

export interface Datum {
  id: number
  isDel: number
  isHide: number
  level: number
  name: string
  pid: number
  rootId: number
  sort: number
  type: number
  items: Datum[]
}
