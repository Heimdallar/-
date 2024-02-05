/**
 * AdminCategoryRequest :AdminCategoryRequest
 */
export interface ListReq {
  /**
   * 类目标签
   */
  categoryLabel?: number;
  checkPermissions?: number;
  /**
   * 操作人id
   */
  creator?: number;
  /**
   * 操作者名称
   */
  editName?: string;
  editor?: number;
  editorName?: string;
  /**
   * Long
   */
  firstCategoryIds?: number[];
  /**
   * 新增前台类目ID ,String
   */
  frontShowCategoryIds?: string[];
  id?: number;
  /**
   * Long
   */
  ids?: number[];
  /**
   * 是否隐藏0没有1隐藏
   */
  isHide?: number;
  /**
   * 是否虚拟类目0-否1-是
   */
  isVirtual?: number;
  level?: number;
  name?: string;
  /**
   * 是否需要特殊资质：0-不需要，1-需要
   */
  needSpecialQualification?: number;
  pid?: number;
  /**
   * 0，所有子类目,1，当前子类目,2，批量获取,3,批量获取-上下文,4，名称模糊查询,5，根据等级查询类目
   */
  queryType?: number;
  /**
   * 聚合商品数量标示
   */
  spuCountFlag?: boolean;
  /**
   * 树形结构
   */
  treeFlag?: boolean;
  /**
   * 0：销售商、1：服务商
   */
  type?: number;
}
