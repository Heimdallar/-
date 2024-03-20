/** 原 YAPI 上的接口返回数据类型定义 */
/**
 * 接口请求分页参数
 */
 interface PageRequest {
    /** 页码 */
    pageNum: number;
    /** 条数 */
    pageSize: number;
  }
  /**
   * 接口返回分页参数
   */
 interface PageReply {
    /** 总条数 */
    total: number;
  }
  
  type Status = 'draft' | 'wait' | 'success' | 'fail';
  export type Item1 = PageRequest&{
    id:number
    categoryCreator:string;
    categoryStyleName:string;
   categoryOperator:string;
   modifyTime:number;
  };
  export type ReturnItem=PageReply&{
    
    id: number;
    categoryCreator: string;//一级类目
    categoryOperator: string;//更新人姓名
    categoryStyleName: string;//风格
    createdTime:number;//创建时间
    modifyTime: number;//更新时间
  }
  