export interface FollowerInfo {
  followerId: number
  followerName: string
}
export interface CategoryItem {
  level1CategoryName: string
  modifyTime: string
  operator: string
  followerInfoList: FollowerInfo[]
  style: string
  [key: string]: any
}

interface selectOptionsItem {
  key: number
  label: string
  value: number
}


export interface editCategoryItem {
  level1Category?: selectOptionsItem,
  followerIdList?: selectOptionsItem[],
}