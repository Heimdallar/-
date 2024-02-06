export interface FetchRecommendLinkAndCreateChannelRes {
  code?: number;
  data?: Data;
  domain?: string;
  errors?: Error[];
  msg?: string;
}

export interface Data {
  /**
   * 专属推荐链接
   */
  recommendLink?: string;
}

export interface Error {
  message?: string;
  name?: string;
}
