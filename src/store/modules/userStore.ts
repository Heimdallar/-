import { UserInfo } from '../interface';
import { makeAutoObservable, runInAction } from 'mobx';

const userStore: any = makeAutoObservable({
  userInfo: {},
  setUserInfo(user: UserInfo) {
    userStore.userInfo = user;
  },
});

export default userStore;