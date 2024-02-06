export interface IListParams {
  leadsId?: number
  brandName?: string
  enterpriseName?: string
  mainCategoryId?: number
  priority?: number
  source?: number
  status?: number
  developer?: string
  page?: number
  pageSize?: number
  planChannels?: string
  planEnds?: string
  hitTags?: number
}
export const enum BrandAuthLinkLevelEnum {
  oneLevel = 1,
  secondLevel = 2,
  Tertiary = 3,
}

export interface IDetail {
  customerSeaResponse: ICustomerSeaResponse
  outSidePlatformInfos: IOutSidePlatformInfos[]
  enterpriseInfoResponse: IEnterpriseInfoResponse
  followUpInfoResponse: IFollowUpInfoResponse
  enterpriseEnterInfoResponse: IEnterpriseEnterInfoResponse
  recommenderResponse?: IFrecommenderResponse
  [key: string]: any
}

interface IFrecommenderResponse {
  type: number
  name: string
  idCard: string
  phone: string
  recommendEnterpriseName: string
}
interface ICustomerSeaResponse {
  labelNames: any[]
  isPopover?: boolean
  top?: number
  customerSeasRemark?: string
  customerSeaResponse: string
  applyId?: number
  applyStatus?: any
  leadsId: number
  brandAuthLinkLevel: number
  customerSeaId: number
  brandName: string
  mainCategoryId: number
  mainCategory: string
  enterpriseName: string
  categoryStyle: string[]
  priorityName: string
  sourceName: string
  brandTypeName: string
  leadsTypeName: string
  status: number
  statusName: string
  developer: string
  modifyTimeStr: string
  leadsOperator: string
  trademarkRegistrationCertificate?: string
  businessLicense?: string
  brandQualificationType?: string
  brandQualificationTypeCode?: number
  recommenderResponse?: any
  birthYear: number
  brandManual: string
  xiaohongshuPostsNum: number
  tiktokFansNum?: number
  hotBrand: string
  level2CategoryId?: number
  level2Category?: string
  hideFollowEntryButton?: boolean
  [key: string]: any
}

interface IOutSidePlatformInfos {
  shopChannel: string
  shopName: string
  shopLevel: string
  shopLink: string
  mainBrand: string
  yearSellerMoney: number
  fansNum: number
  [key: string]: any
}

interface IEnterpriseInfoResponse {
  enterpriseName: string
  contactName: string
  contactTitle: string
  contactMobile: string
  contactTelephone: string
  contactWechat: string
  contactWeibo: string
  contactEmail: string
  customerSeasRemark: string
  [key: string]: any
}

interface IFollowUpInfoResponse {
  status: number
  statusName: string
  flowBD: string
  modifyTimeStr: string
  visitTimes: string
  remark?: string
  [key: string]: any
}

interface IEnterpriseEnterInfoResponse {
  enterStatus?: number
  enterStatusName: string
  merchantId?: number | string
  userId?: number | string
  enterEnterpriseName: string
  enterEnterpriseAccount?: number | string
  enterEnterpriseLegalName: string
  merchantType?: number
  remark: string
  sellerName?: string
  directorName?: string
  brandType?: string
  customerSeasRemark?: string
  bindUrl?: string
  [key: string]: any
}

export interface ITransferParams {
  developerId?: number
  developer?: string
  customerSeaId?: number
  operatorId?: number
  operator?: string
}

export interface IBatchTransferParams {
  developerId?: number
  developer?: string
  customerSeaIds?: (string | number | undefined)[]
  operatorId?: number
  operator?: string
}

export interface IFeedBackParams {
  enterpriseName?: string
  contactName?: string
  contactTitle?: string
  contactMobile?: string
  contactTelephone?: string
  contactWechat?: string
  contactWeibo?: string
  contactEmail?: string
  feedBackResultId?: number
  feedBackResultName?: string
  remark?: string
  reason?: string
  customerSeaId?: number
  operatorId?: number
  operator?: string
}

export interface IFollowUpParams {
  enterStatus?: number
  enterStatusName?: string
  merchantId?: number | string
  userId?: number | string
  enterEnterpriseName?: string
  enterEnterpriseAccount?: number | string
  enterEnterpriseLegalName?: string
  remark?: string
  customerSeaId?: number
  operatorId?: number
  operator?: string
}

export interface IReviewParams {
  reviewResultId?: number
  reviewResult?: string
  reason?: string
  customerSeaId?: number
  operatorId?: number
  operator?: string
}

export interface IDetailParams {
  customerSeaId?: number
}

export interface ICategoryListParams {
  pid: number
  queryType: number
  treeFlag: boolean
  spuCountFlag: boolean
}

export interface IManagerInfoParams {
  userName: string
}

export interface IAuthParams {
  customerSeaId: number
}

export interface IAuthTargetBdParams {
  customerSeaId: number
  targetBdId: number
}

export interface IAuthBusinessDeveloperParams {
  leadsId: number
  businessDeveloperId: number
}

export interface ITopParams {
  leadsId: number | string
}

export interface IQueryMsgParams {
  id: number
  fields: Array<string>
}

export interface IExportParams {
  leadsId?: number
  brandName?: string
  brandNameList?: Array<string>
  enterpriseName?: string
  mainCategoryId?: number
  priority?: number
  source?: number
  status?: number
  statusList?: Array<number>
  developer?: string
  categoryStyle?: string
  categoryStyleList?: Array<string>
  storeName?: string
  page?: number
  pageSize?: number
}

export interface IEntryInfoParams {
  enterEnterpriseAccount?: number | string
  customerSeaId: number
}

export interface ISaveAccountParams {
  enterEnterpriseAccount?: number | string
  remark?: string
  customerSeaId: number
  operatorId?: number
  operator?: string
  operatorChineseName?: string
}

export interface IListItem {
  leadsId: number;
  brandName: string;
  mainCategory: string;
  categoryStyles: string[];
  brandType: number;
  source: number;
  status: number;
  enterpriseName: string;
  creator: string;
  createTime: string;
  leadsType: number;
  [key: string]: any;
}

export interface DetailDrawer {
  detailVisible: boolean;
  formState: IDetail;
  batchLeadId: number;
  batchCustomerSeaId: number;
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setFormState: React.Dispatch<React.SetStateAction<IDetail>>;
  invokeUpdateDetail: (leadsId: number) => void;
  setBatchCustomerSeaId: React.Dispatch<React.SetStateAction<number>>;
}

export interface DataElement {
  /**
   * 操作描述
   */
  operateDesc: string;
  /**
   * 操作人角色
   */
  operateRole?: string;
  /**
   * 操作时间
   */
  operateTime?: string;
  /**
   * 操作类型
   */
  operateType?: string;
  /**
   * 操作人
   */
  operator?: string;
}

export interface OperateDescListType {
  type : string;
  content: string;
  title?: string
}