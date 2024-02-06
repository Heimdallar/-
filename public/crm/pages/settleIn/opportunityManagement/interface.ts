export interface OpportunityItem {
  brandName: string;
  createTime: string;
  creator: string;
  editor: string;
  id: number;
  mainCategory?: string;
  mainCategoryId?: number;
  modifyTime: string;
  recommendAwardStatus: number;
  recommendAwardStatusDesc: string;
  status: number;
  mainCategoryInfo?: {
    label?: string;
    value?: number;
    key?: number;
  };
  statusDesc: string;
  [key: string]: any;
}

export interface contactItem {
  key?: string
  url?: string
  uid?: string
  [key: string]: any;
}
export interface ConfigItem {
  brandDesc: string;
  contactOperationDoc: string;
  contact1: contactItem[];
  contact2: contactItem[];
  id: number;
  type: number;
}
