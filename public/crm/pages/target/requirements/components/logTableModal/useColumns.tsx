import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { ILogItem } from '../../interface';

const useColumns = () => {
  const columns = useMemo<ProColumns<ILogItem, 'text'>[]>(() => {
    return [
      {
        title: '操作时间',
        dataIndex: 'operateTime',
        key: 'operateTime',
        width: 200,
        align: 'center',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
        key: 'operator',
        width: 150,
      },
      {
        title: '操作类型',
        dataIndex: 'operateType',
        key: 'operateType',
        width: 150,
      },
      {
        title: '操作描述',
        dataIndex: 'operateDesc',
        key: 'operateDesc',
        width: 300,
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
