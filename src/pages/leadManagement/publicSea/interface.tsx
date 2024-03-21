export interface IListItem {
    leadsId: number;
    brandName: string;
    mainCategory: string;
    brandType: number | undefined;
    source: number;
    status: number;
    enterpriseName: string;
    creator: string;
    createTime: string;
    labelIds?: string[];
    leftProcessTimeDesc:string;
    labelNames?: string[];
    leadsTypeDesc:string;
    hitTagDesc:string;
    followerName:string;
    modifyTime:Date;
    operate:string
  }