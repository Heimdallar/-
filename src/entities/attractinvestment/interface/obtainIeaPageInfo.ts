/**
 * Result<InvitationEnterActivityPage> :Result
 */
export interface IeaObtainIeaPageInfoRes {
  code?: number;
  /**
   * InvitationEnterActivityPage
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
 * InvitationEnterActivityPage
 */
export interface Data {
  /**
   * -顶部banner，非必填项，支持上传不超过2M的jpg、png格式的10张图片，尺寸为XY，邀约页面图片轮播顺序按照配置页面上传顺序轮播。 ,String
   */
  bannerImgs?: string[];
  endTime?: number;
  /**
   * -招商说明，非必填项，格式无限制，不超过300字符。
   */
  explain?: string;
  /**
   * -商家需填写内容，下拉多选框，可选择枚举值及格式要求见邀约表字段，默认选中字段必然展示在邀约页面中，邀约页面字段展示顺序按照邀约表字段顺序展示。 ,Integer
   */
  needFill?: number[];
  startTime?: number;
  /**
   * -页面标题，必填项，格式无限制，不超过50字符
   */
  title?: string;
  mainCateIds?: number[]
}

/**
 * 错误信息 ,Error
 */
export interface Error {
  message?: string;
  name?: string;
}

export interface IeaObtainIeaPageInfoReq {
  /**
   * (String)
   */
  encodedId: string;
}

