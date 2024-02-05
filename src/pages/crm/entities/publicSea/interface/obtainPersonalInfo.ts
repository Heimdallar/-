/**
 * Result<PersonalInfoResponse> :Result
 */
export interface ClueObtainPersonalInfoRes {
  code?: number;
  /**
   * PersonalInfoResponse
   */
  data?: Data;
  domain?: string;
  /**
   * 错误信息 ,Error
   */
  errors?: Error[];
  msg?: string;
}

/**
 * PersonalInfoResponse
 */
export interface Data {
  name: string,
  personalInfoType: number,
  isVisible: boolean,
  count: number,
  personalInfoSearchConditionResponse: {
    status: number[]
  }
}
export interface DataRecord {
  name: string,
  personalInfoType: number,
  visible: boolean,
  count: number,
  personalInfoSearchConditionResponse: {
    status: number[]
  }
}

/**
 * 错误信息 ,Error
 */
export interface Error {
  message?: string;
  name?: string;
}

/**
 * PersonalInfoRequest :PersonalInfoRequest
 */
export interface ClueObtainPersonalInfoReq {
  /**
   * 0公海1私海
   */
  fromPage?: number;
  operatorId?: number;
  operatorName?: string;
}
