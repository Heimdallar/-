/**
 * 流程名称
 */
export const StepsList = ['企业信息', '入驻审核', '品牌类目', '签署合同', '支付保证金', '入驻成功'];

export enum BusinessTypeEum {
  COMPANY = 'company',
  GETI = 'geti',
  DUZI = 'duzi',
}

export const BusinessTypeMap = new Map([
  [BusinessTypeEum.COMPANY, '企业'],
  [BusinessTypeEum.GETI, '个体工商户'],
  [BusinessTypeEum.DUZI, '个体独资企业'],
]);

export enum IdcardTypeEum {
  ID = 'id',
  GAO = 'gao',
  TAIWAN = 'taiwan',
  FOREIGN = 'foreign',
  PASSPORT = 'passport',
}

// eslint-disable-next-line
export const IdcardTypeMap = new Map([
  [IdcardTypeEum.ID, '身份证'],
  [IdcardTypeEum.GAO, '港澳居民往来内地通行证'],
  [IdcardTypeEum.FOREIGN, '外国人居留证'],
  [IdcardTypeEum.TAIWAN, '台湾同胞往来大陆通行证'],
  [IdcardTypeEum.PASSPORT, '护照'],
]);
