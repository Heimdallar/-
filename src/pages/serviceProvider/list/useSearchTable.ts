import React, { FC, useState, useRef, useEffect } from 'react';
import ProTable from '@poizon-design/pro-table';
import type { ActionType } from '@poizon-design/pro-table';
import type { ProFormInstance } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import delServiceProvider from '@/services/serviceProvider/delServiceProvider';

export default function useSearchTable(props) {
  useEffect(() => {}, []);
  const actionRef = useRef<ActionType>();
  const searchFormRef = useRef<ProFormInstance>();

  function refreshList() {
    actionRef?.current?.reload();
  }

  const delServiceProviderFn = (parmas) => {
    return new Promise(async (resolve) => {
      const res = await delServiceProvider(parmas);
      if (res.success) {
        refreshList();
        message.success('作废成功');
      }
      resolve();
    });
  };
  return { actionRef, searchFormRef, refreshList, delServiceProviderFn };
}
