import { request } from '@umijs/max';
import {
  getMockDetailData,
  getMockModalDetailData,
  getMockDrawerDetailData,
  getMockEnums,
} from './mock';

/** 页面详情 */
export const DetailInterface = async () => {
  return (
    request<ReturnType<typeof getMockDetailData>>('/notfound')
      // mock data, you should delete it.
      .catch(() => getMockDetailData())
  );
};

/** 抽屉详情 */
export const DrawerDetailInterface = () => {
  return (
    request<ReturnType<typeof getMockDrawerDetailData>>('/notfound')
      // mock data, you should delete it.
      .catch(() => getMockDrawerDetailData())
  );
};

/** 弹窗详情 */
export const ModalDetailInterface = () => {
  return (
    request<ReturnType<typeof getMockModalDetailData>>('/notfound')
      // mock data, you should delete it.
      .catch(() => getMockModalDetailData())
  );
};

/** 枚举 */
export const EnumsInterface = (params: Parameters<typeof getMockEnums>[0]) => {
  return (
    request<ReturnType<typeof getMockEnums>>('/notfound', { params })
      // mock data, you should delete it.
      .catch(() => {
        return getMockEnums(params);
      })
  );
};
