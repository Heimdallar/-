import { selectOptionsItem } from '@/entities/interface';
export interface FollowerInfo {
  creator?: string;
  editor?: string;
  followerId: number;
  followerName: string;
  modifyTime?: string;
}
export interface CategoryItem {
  categoryManagerList: FollowerInfoItem[];
  level1CategoryId: number;
  level1CategoryName: string;
  [key: string]: any;
}

export interface editCategoryItem {
  level1Category?: selectOptionsItem;
  followerIdList?: selectOptionsItem[];
}

export interface FollowerInfoItem {
  followType: number;
  followerInfoList: FollowerInfo[];
}

export interface followFormItem {
  level1Category: selectOptionsItem;
  maintain: selectOptionsItem[];
  bd: selectOptionsItem[];
  administrators: selectOptionsItem[];
  outsourcing: selectOptionsItem[];
}

export interface maintianInfo {
  leadsType: number;
  followerInfo: FollowerInfo;
}
