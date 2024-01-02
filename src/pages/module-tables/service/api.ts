import { getApiUrl, proRequest as request } from '@/utils/request';
import {
  getMockEnums,
  getMockTableList,
  updateMockMerchant,
  createMockMerchant,
} from '@/pages/module-tables/service/mock';
import { EditModalType } from '../constants';
import { IQuerySceneBalance, IResultQuerySceneBalance, IUpdateMerchantType } from './interface';

/** 远程枚举 */
export const EnumsInterface = (params: Parameters<typeof getMockEnums>[0]) => {
  return (
    request<ReturnType<typeof getMockEnums>>(getApiUrl('/notfound'), params)
      // mock data, you should delete it.
      .catch(() => {
        return getMockEnums();
      })
  );
};

/** 列表 */
export const TableListInterface = (params: Parameters<typeof getMockTableList>[0]) => {
  return new Promise<ReturnType<typeof getMockTableList>>((resolve) =>
    /* eslint no-promise-executor-return: "off" */
    setTimeout(() => {
      request(getApiUrl('/notfound'), params)
        // mock data, you should delete it.
        .catch(() => {
          resolve(getMockTableList(params));
        });
    }, 1000),
  );
};

/** 表单 */
export const UpdateMerchantInterface = (params: IUpdateMerchantType, type: EditModalType) => {
  return new Promise((resolve) =>
    /* eslint no-promise-executor-return: "off" */
    setTimeout(() => {
      request<ReturnType<typeof getMockTableList>>(getApiUrl('/notfound'), params, 'POST')
        // mock data, you should delete it.
        .catch(() => {
          resolve(
            type === EditModalType.EDIT ? updateMockMerchant(params) : createMockMerchant(params),
          );
        });
    }, 2000),
  );
};

/**
 * 其他接口
 */
export const QueryBalanceInterface = (params: IQuerySceneBalance) =>
  request<IResultQuerySceneBalance[]>(getApiUrl('/notfound'), params);
