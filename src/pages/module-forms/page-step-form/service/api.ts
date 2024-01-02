import { proRequest as request } from '@/utils/request';
import { IResultProvince } from './interface';
import { getProvince } from './mock';

/** 枚举 */
export const PostSaveForm = (params: {
  step0FormValue: object;
  step1FormValue: object;
  step2FormValue: object;
  step3FormValue: object;
  step4FormValue: object;
  values: object;
}) => {
  return (
    request<ReturnType<typeof getProvince>>('/notfound', { params })
      // mock data, you should delete it.
      .catch(() => {
        return getProvince(params);
      })
  );
};

/**
 * 获取省市区数据
 * @param params
 * @returns
 */
export const getProvinceList = (params?: object): Promise<IResultProvince> => {
  return request<ReturnType<typeof getProvince>>(
    '/merchant/enter/cascadeAddress/getAreaCodeByCodeAndType',
    { params },
  ).catch(() => {
    return getProvince();
  });
};
