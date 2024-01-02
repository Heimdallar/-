import { useState, useMemo } from 'react';
import { useRequest } from 'ahooks';
import { config } from '@/defaultSettings';
import { InterfaceReply } from '@/utils/request';
import { IEntityDetail } from '@/pages/module-details/entity';
import { DetailInterface } from '../service/api';

const { globalInfoCacheMillisecond } = config;
type DataReply = InterfaceReply<typeof DetailInterface>;
type DataEntity = IEntityDetail;

const detailNormalizer = (data: DataReply): DataEntity => {
  // 这里做数据清洗
  return {
    ...data,
    extraContent: 'extraContent',
  };
};

/** 全局菜单 */
export const useDetail = () => {
  const [detail, setDetail] = useState<DataEntity>({} as DataEntity);

  const { data, run, loading } = useRequest(
    () => {
      return DetailInterface().then((resData: DataReply) => {
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
      setDetail(detailNormalizer(data));
    }
  }, [data]);

  return {
    detailData: detail,
    dispatchDetailData: run,
    detailLoading: loading,
    updateDetail: setDetail,
  };
};
