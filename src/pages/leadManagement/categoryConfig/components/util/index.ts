import { selectOptionsItem } from '../../interface';

export function transferKvToFollowInfo(type: number, items: selectOptionsItem[]) {
  return {
    followType: type,
    followerInfoList: items.map((d) => {
      return {
        followerId: d.key,
        followerName: d.label,
      };
    }),
  };
}
export function transferMaintainerInfo(type: number, maintianInfo: selectOptionsItem[]) {
  return {
    leadsType: type,
    followerInfo: {
      followerId: maintianInfo[0].key,
      followerName: maintianInfo[0].label,
    },
  };
}
