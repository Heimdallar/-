/**
* PagingObject
*/
export interface ListResponseData {
  /**
   * 数据 ,T
   */
  contents: IRequirementItem[];
  /**
   * 附加信息(该参数为map)
   */
  extra: ListExtra;
  /**
   * 当前页
   */
  pageNum: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 总元素数
   */
  total: number;
}

/**
* 数据 ,T
*/
export interface IRequirementItem {
  /**
   * 品牌id
   */
  brandId:   number;
  brandName: string;
  /**
   * 资质要求品牌类型,1-品牌方；2-经销商；99-其他（3,4做兼容） ,Integer
   */
  brandType:     number[];
  brandTypeDesc: string;
  /**
   * 是否需要展示备注字段
   */
  canShowRemark: boolean;
  /**
   * 是否存在提交线索的权限
   */
  canSubmitLeads: boolean;
  /**
   * 企业名称
   */
  enterpriseName: string;
  /**
   * 需求id,自增
   */
  id: number;
  /**
   * 需求线索量
   */
  leadsRequireNumber: number;
  mainCategory:       string;
  /**
   * 主营类目id
   */
  mainCategoryId: number;
  /**
   * 优先级,PO(0,"P0"),,P1(1,"P1"),,P2(2,"P2"),,P3(3,"P3"),,P4(4,"P4"),,P5(5,"P5")
   */
  priorityScore:     number;
  priorityScoreDesc: string;
  /**
   * 状态
   */
  status:     number;
  statusDesc: string;
  /**
   *
   * 店铺渠道经营平台,TMALL(0,"天猫"),,TAOBAO(1,"淘宝"),,JD(2,"京东"),,XIAOHONGSHU(3,"小红书"),,LIFEASE(4,"网易严选"),,KAOLA(5,"考拉海购"),,OFFLINE_STORE(6,"线下门店"),,OFFICIAL_WEBSITE(7,"官网平台"),,DOUYIN(8,"抖音"),,PINGDUODUO(9,"拼多多")
   * ,String
   */
  storeChannel:     string[];
  storeChannelDesc: string;
  /**
   * 店铺名称
   */
  storeName: string;
  /**
   * 已提交线索数量
   */
  submitLeadsNumber: number;
  storeUrl: string;
  targetLabelStr: string;
  remark: string;
}

/**
* 附加信息(该参数为map)
*/
export interface ListExtra {
  /**
   * String
   */
  mapKey: { [key: string]: any };
  /**
   * Object
   */
  mapValue: { [key: string]: any };
}

/**
* 错误信息 ,Error
*/
export interface Error {
  message: string;
  name:    string;
}



/**
 * AddMerchantCustomerTargetRequest :AddMerchantCustomerTargetRequest
 */
export interface AddOrUpdateReq {
  /**
   * 品牌id
   */
  brandId?:   number;
  brandName?: string;
  /**
   * 资质要求品牌类型,1-品牌方；2-经销商；99-其他（3,4做兼容） ,Integer
   */
  brandType?: number[];
  /**
   * 企业名称
   */
  enterpriseName?: string;
  /**
   * 需求id,自增
   */
  id?: number;
  /**
   * 需求线索量
   */
  leadsRequireNumber?: number;
  mainCategory?:       string;
  /**
   * 主营类目id
   */
  mainCategoryId?: number;
  /**
   * 优先级,PO(0,"P0"),,P1(1,"P1"),,P2(2,"P2"),,P3(3,"P3"),,P4(4,"P4"),,P5(5,"P5")
   */
  priorityScore?:     number;
  priorityScoreDesc?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   *
   * 店铺渠道经营平台,TMALL(0,"天猫"),,TAOBAO(1,"淘宝"),,JD(2,"京东"),,XIAOHONGSHU(3,"小红书"),,LIFEASE(4,"网易严选"),,KAOLA(5,"考拉海购"),,OFFLINE_STORE(6,"线下门店"),,OFFICIAL_WEBSITE(7,"官网平台"),,DOUYIN(8,"抖音"),,PINGDUODUO(9,"拼多多")
   * ,String
   */
  storeChannel?: string[];
  /**
   * 店铺名称
   */
  storeName?: string;
  /**
   * 已提交线索数量
   */
  submitLeadsNumber?: number;
}


export interface IApiResult {
 success?: boolean;
 message?: string;
 data?: any;
}