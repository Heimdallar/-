import { Data } from '@/entities/publicSea/interface/detail';
import React, { ReactNode } from 'react';

export const enum Source {
  phone = 1,
  email = 2,
  costomer = 3,
  advertisement = 4,
  firends = 5,
  internet = 6,
  radar = 0,
  business = 8,
  other = -1,
  activity = 10
}

export const enum BrandAuthLinkLevelEnum {
  oneLevel = 1,
  secondLevel = 2,
  Tertiary = 3,
}

export interface IListParams {
  leadsId?: number;
  brandName?: string;
  mainCategoryId?: number;
  source?: number;
  status?: number;
  page?: number;
  pageSize?: number;
  planChannels?: string
  planEnds?: string
  hitTags?: number
  sortParamType?: string
  sortType?: string
  personalInfoType?: number
}

export interface IAddParams {
  brandI?: number;
  brandName?: string;
  hotBrand?: string;
  birthYear?: number;

  brandManual?: string;
  xiaohongshuPostsNum?: number;
  tiktokFansNum?: number;
  mainCategoryId?: number;
  mainCategory: string;
  categoryStyles: string[];
  brandType?: number;
  source?: Source;
  internetSaleInfos: IInternetSaleInfosObj[];
  enterpriseName?: string;
  contactName?: string;
  contactTitle?: string;
  contactMobileNumber?: string;
  contactMobile?: string;
  contactTelephone?: string;
  contactWechat?: string;
  contactWeibo?: string;
  contactEmail?: string;
  status: number;
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  trademarkRegistrationCertificate?: string;
  businessLicense?: string;
  brandQualificationType?: number | undefined | string;
  brandAuthLinkLevel?: BrandAuthLinkLevelEnum;
  createTime?: string;
  creator?: string;
  remark?: string;
  recommenderResponse?: any;
  isCenterVisible?: boolean;
  level2CategoryId?: number;
  level2Category?: string;
  leadsTypeDesc?: string;
  willingSendSample?: number;
  domesticStore?: string;
  [key: string]: any;
}

export interface IUpdateParams extends IAddParams {
  leadsId?: number;
}

export interface IDetailParams {
  leadsId: number;
  formPage: number;
}

export interface IStyleParams {
  mainCategory: string;
}

export interface IImportParams {
  leadsList: ILeadsListObj[];
  leadsKey?: string;
  isEnd?: boolean;
  creator?: string;
}

export interface IImportDataParams {
  ossKey: string;
  // 线索导入4003 申请单导入4002 审批单导入4004
  workType: 4003 | 4002 | 4004;
}

export interface IAllotParams {
  leadsId: number;
  priority: number;
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  operator?: string;
}

export interface IBatchAllotParams {
  leadsIds: (string | number | undefined)[];
  priority: number;
  bindBusinessDeveloper?: string;
  bindBusinessDeveloperId?: number;
  operator?: string;
}

export interface ICategoryListParams {
  pid: number;
  queryType: number;
  treeFlag: boolean;
  spuCountFlag: boolean;
}

export interface IInternetSaleInfosObj {
  storeChannel?: string;
  storeName?: string;
  storeLevel?: string;
  storeUrl?: string;
  mainBrand?: string;
  annualSales?: number;
  fansNum?: number;
}

export interface ILeadsListObj {
  brandName: string;
  mainCategory: string;
  categoryStyles: string[];
  brandType: number;
  source: number;
  internetSaleInfos: IInternetSaleInfosObj[];
  enterpriseName: string;
  contactName: string;
  contactTitle: string;
  contactMobileNumber?: string;
  contactMobile?: string;
  contactTelephone: string;
  contactWechat: string;
  contactWeibo: string;
  contactEmail: string;
}

export interface IManagerInfoParams {
  userName: string;
}

export interface IEventTarget {
  value: string;
}

export interface IBrandListParams {
  name: string;
  pageSize?: number;
  pageNum?: number;
}

export interface IAuthBusinessDeveloperParams {
  leadsId: number;
  businessDeveloperId: number;
}

export interface IAuthManagerParams {
  leadsId: number;
}

export interface IStyleListParams {
  mainCategory?: string | number;
  style?: string;
}

export interface IRejectParams {
  leadsId: number;
  reason: string | undefined;
  operator?: string;
  operatorId?: string;
}

export interface IDeleteLeadsIdParams {
  leadsIds: Array<number>;
}

export interface IOverviewParams {
  leadsId?: string | number;
  brandName?: string;
  mainCategoryId?: number;
  source?: number;
  status?: number;
  style?: string;
  creator?: string;
  outerShopName?: string;
  page?: number;
  pageSize?: number;
}

export interface ILogParams {
  leadsId?: string | number;
  page?: number;
  pageSize?: number;
}

export interface IRejectReasonParams {
  leadsId?: string | number;
}

export interface IRealParams {
  id?: string | number;
  fields: Array<string>;
}

interface kvObj {
  key?: number;
  value?: number;
  label?: string;
}

export interface brandObj {
  key?: string;
  value: string;
  label: string;
  brandId: number;
}

export interface IInitAudit {
  level1CategoryItem: kvObj;
  level2CategoryItem: kvObj;
}

export interface IListItem {
  leadsId: number;
  brandName: string;
  mainCategory: string;
  mainCategoryId: number;
  mainCategoryInfo?: kvObj;
  level2Category: string;
  level2CategoryId: number;
  categoryStyles: string[];
  brandType: number | undefined;
  source: number;
  status: number;
  enterpriseName: string;
  creator: string;
  createTime: string;
  labelIds?: string[];
  labelNames?: string[];
  [key: string]: any;
}

export interface ExpostData {
  total?: number;
  maintained?: number;
  distribute?: number;
}
export interface LogItem {
  operateDesc: string;
  operateTime: string;
  operateType: string;
  operator: string;
}

export interface ApplyItem {
  mainCategory: string
  leadsId: number
  isPass: boolean
}

export interface DetailDrawer {
  detailVisible: boolean;
  formState: Data;
  batchLeadId: number;
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFormState: React.Dispatch<React.SetStateAction<Data>>;
  setBatchLeadId: React.Dispatch<React.SetStateAction<number>>;
  refreshList: () => void;
  invokeUpdateDetail: (value: number) => void
}

export interface InterSaleInfos {
  storeChannel?: string;
  storeName?: string;
  storeLevel?: string;
  storeUrl?: string;
  mainBrand?: string;
  annualSales?: number;
  fansNum?: number;
}