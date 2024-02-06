export const rootId = 0;
export enum OrgTypeEnums {
  其他部门 = 0,
  招商部门 = 1,
  中台部门 = 2,
}

export const orgTypeList = [
  { label: '其他部门', value: OrgTypeEnums.其他部门 },
  { label: '招商部门', value: OrgTypeEnums.招商部门 },
  { label: '中台部门', value: OrgTypeEnums.中台部门 },
];

export enum RoleTypeEnums {
  线索维护人 = 1,
  类目BD = 2,
  类目管理员 = 3,
  平台管理员 = 6,
}

export const roleTypeList = [
  { label: '线索维护人', value: RoleTypeEnums.线索维护人 },
  { label: '类目BD', value: RoleTypeEnums.类目BD },
  { label: '类目管理员', value: RoleTypeEnums.类目管理员 },
  { label: '平台管理员', value: RoleTypeEnums.平台管理员 },
];

export enum TabKeyEnums {
  部门详情 = '1',
  新增子部门 = '2',
  关联用户 = '3',
}
