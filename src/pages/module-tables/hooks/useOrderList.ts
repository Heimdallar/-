import { useState, useCallback, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useRequest } from 'ahooks';
import type { InterfaceReply, InterfaceRequest } from '@/utils/request';
import { cnyUnit, fenToYuan, thousandsFormat } from '@/utils/tools';
import { TableListInterface, UpdateMerchantInterface } from '@/pages/module-tables/service/api';
import { IEntityOrderList } from '@/pages/module-tables/entity';

type DataRequest = InterfaceRequest<typeof TableListInterface>;
type DataReply = InterfaceReply<typeof TableListInterface>;
type DataEntity = IEntityOrderList['contents'];

/** 用于做数据清洗，用于做服务端数据防腐层以及确保视图层纯净 */
const orderListNormalizer = (data: DataReply): DataEntity => {
  return data.contents.map((item) => {
    const { telephone, deposit, remark } = item.details;
    return {
      ...item,
      details: {
        ...item.details,
        telephone: telephone.replace(/-/g, ''),
        deposit: `${cnyUnit} ${thousandsFormat(fenToYuan(Number(deposit)))} 元`,
        remark: remark.replace('[sensitive words]', ''),
        isHNWI: Number(deposit) >= 100000000 ? 'Yes' : 'No',
      },
    };
  });
};

export const useOrderList = (merchantId: string) => {
  /** Entity */
  const [orderList, setOrderList] = useState<DataEntity>({} as DataEntity);

  /** 管理远程异步 GET IO */
  const { data, error, loading, runAsync, cancel } = useRequest(
    (params: { pageSize: number; pageNum: number }) => {
      return TableListInterface(
        Object.assign(params, {
          title: merchantId,
          minAmount: 0,
          maxAmount: 0,
          enable: '1',
        } as DataRequest),
      );
    },
    {
      loadingDelay: 500,
      debounceWait: 500,
      manual: true,
    },
  );

  /** 管理远程异步 POST IO */
  const { loading: updating, runAsync: updateMerchant } = useRequest(
    (params, type) => {
      // 可以在这里处理数据提交前的逻辑，此处省略
      return UpdateMerchantInterface(params, type);
    },
    {
      manual: true,
    },
  );

  /** 固化数据清洗 */
  useMemo(() => {
    if (!isEmpty(data)) {
      setOrderList(orderListNormalizer(data));
    }
  }, [data]);

  /** UseCase 提供给 ProTable 的 request 使用 */
  const requestRunner = useCallback(
    async (params: { current?: number; pageSize?: number }) => {
      try {
        const res = await runAsync({
          ...params,
          pageNum: Number(params.current || 0),
          pageSize: Number(params.pageSize || 0),
        });

        return {
          data: orderListNormalizer(res) || [],
          success: true,
          total: res.total || 0,
        };
      } catch (e) {
        return {
          data: [],
          success: false,
          total: 0,
        };
      }
    },
    [runAsync],
  );

  /** UseCase 本地删除一条数据, 界面上不会生效 */
  const purgeOrderItem = useCallback((recordId: string) => {
    setOrderList((prev: any) => {
      return prev.filter((item: any) => {
        return item.id !== recordId;
      });
    });
  }, []);

  /** UseCase 远程更新一条数据 */
  const updateOrderItem = useCallback(async () => {
    console.log('update');
  }, []);

  return {
    data: orderList,
    error,
    loading,
    updating,
    cancel,
    fetchOrderList: requestRunner,
    purgeOrderItem,
    updateOrderItem,
    updateMerchant,
    mutate: setOrderList,
  };
};
