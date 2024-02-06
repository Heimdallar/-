import React, { FC, useState, useRef, useEffect } from 'react';
import ProTable from '@poizon-design/pro-table';
import { message } from 'poizon-design';
import type { ActionType } from '@poizon-design/pro-table';
import type { ProFormInstance } from '@poizon-design/pro-form';
import { reject } from 'lodash';
import updateStatus from '@/services/serviceProvider/updateStatus';
import useColumns from './useColumns';

interface useSearchTableProps {}

export default function useSearchTable(props: useSearchTableProps) {
  useEffect(() => {}, []);
  const actionRef = useRef<ActionType>();
  const searchFormRef = useRef<ProFormInstance>();

  function refreshList() {
    actionRef?.current?.reload();
  }

  const updateStatusFn = (val) => {
    return new Promise(async (resolve) => {
      const res = await updateStatus(val);
      if (res.success) {
        message.success('操作成功');
        refreshList();
      }
      resolve();
    });
  };

  return { actionRef, searchFormRef, refreshList, updateStatusFn };
}
