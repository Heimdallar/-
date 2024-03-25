  
export type TableMultiItem={
  rankIndex: Number,
  categoryName: string,
  waitClaimAmount: Number,
  waitClaimTimeoutAmount: Number,
  waitFirstCommunicateAmount: Number,
  waitFirstCommunicateTimeoutAmount: Number,
  waitCommunicatResultAmount: Number,
  waitCommunicatResultTimeoutAmount: Number,
  waitEntryAmount: Number,
  waitEntryTimeoutAmount: Number,
  waitBiddingAmount: Number
}
export type TableSingleiItem={
  rankIndex: Number,
  operatorName:string,
  waitFirstCommunicateAmount: Number,
  waitFirstCommunicateTimeoutAmount: Number,
  waitCommunicatResultAmount: Number,
  waitCommunicatResultTimeoutAmount: Number,
  waitEntryAmount: Number,
  waitEntryTimeoutAmount: Number,
  waitBiddingAmount: Number
}


  export const typeList = [
    {
      label: '按类目',
      value: 'category',
    },
    {
      label: '按人员',
      value: 'people',
    },
  ];
  
  export enum RankEnum {
    按完成度 = '0',
    按数量 = '1',
  }
  
  export const rankTypeList = [
    {
      label: '按完成度',
      value: RankEnum.按完成度,
    },
    {
      label: '按数量',
      value: RankEnum.按数量,
    },
  ];
  enum processEnum {
    待认领 = '0',
    待首次沟通 = '1',
    待反馈洽谈结果 = '2',
    待提交入驻 = '3',
    待出价 = '4',
  }
  
  
  export const tagList = [
    {
      label: '待认领',
      key: processEnum.待认领,
      
    },
    {
      label: '待首次沟通',
      key: processEnum.待首次沟通,
      
    },
    {
      label: '待反馈洽谈结果',
      key: processEnum.待反馈洽谈结果,
     
    },
    {
      label: '待提交入驻',
      key: processEnum.待提交入驻,
     
    },
    {
      label: '待出价',
      key: processEnum.待出价,
     
    },
  ];
  