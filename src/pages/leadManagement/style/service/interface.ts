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
   title:string;
   style:string
  };
  export type ReturnItem=PageReply&{
    url: string;
    id: number;
    title: string;//一级类目
      name: string;//更新人姓名
    style: string;//风格
    created_at:number;//创建时间
    updated_at: number;//更新时间
  }