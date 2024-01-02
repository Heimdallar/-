import { useState, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { config } from '@/defaultSettings';
import { InterfaceReply } from '@/utils/request';
import { IEntityModalDetail } from '@/pages/module-details/entity';
import { ModalDetailInterface } from '../service/api';

const { globalInfoCacheMillisecond } = config;
type DataReply = InterfaceReply<typeof ModalDetailInterface>;
type DataEntity = IEntityModalDetail;

const modalDetailNormalizer = (data: DataReply): IEntityModalDetail => {
  // 这里做数据清洗
  return {
    ...data,
    extraContent: 'extraContent',
  };
};

/** 全局菜单 */
export const useModalDetail = () => {
  const [detail, setDetail] = useState<DataEntity>({} as DataEntity);

  const { data, run, loading } = useRequest(
    () => {
      return ModalDetailInterface().then((resData: DataReply) => {
        return resData || {};
      });
    },
    {
      loadingDelay: 500,
      staleTime: globalInfoCacheMillisecond,
      cacheTime: globalInfoCacheMillisecond,
    },
  );

  useMemo(() => {
    if (data) {
      setDetail(modalDetailNormalizer(data));
    }
  }, [data]);

  return {
    detailData: detail,
    dispatchDetailData: run,
    detailLoading: loading,
  };
};
