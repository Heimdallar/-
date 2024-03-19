/** 原 YAPI 上的接口返回数据类型定义 */

import { Params } from "ahooks/lib/usePagination/types";

/**
 * 接口请求分页参数
 */
 interface PageRequest {
    /** 页码 */
    page: number;
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
  // 类目查询传参
  export type Item1 = PageRequest&{
    id:string
    categoryName:string;
   categoryStyleName:string[];
   categoryOperator?:string;
   editorName?:string;
   modifyTime?:Date;
  };
  // 显示类目列表
  export type ReturnItem=PageReply&{
    
    id:string;
    categoryName: string;//一级类目
    categoryOperator: string;//创建人姓名
    categoryStyleName: string[];//风格
    createTime:Date;//创建时间
    modifyTime: Date;//更新时间
  }
  
  //类目选项 
  export type optionItem={
    categoryDescription: string;
    estimateAnnualGmv: number;
    estimateOnShelfCount: number;
    id: number;
    isDel: number;
    isHide: number;
    level: number;
    name: string;
    pid: number;
    rootId: number;
    sort: number;
    type: number;
  }
// 查询函数规范
interface ParamsType {
  pageSize: number;
  current?: number;
  keyword?: string;
}

export interface FetchDataParams extends ParamsType {
  page: number;
  categoryName?: string;
  categoryStyleName?: string[];
}
