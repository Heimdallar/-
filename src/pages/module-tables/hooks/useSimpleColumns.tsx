import { ComponentProps, useMemo } from 'react';
import { message, Popconfirm, Switch, Tag } from 'poizon-design';
import { ProColumns } from '@poizon-design/pro-table';
import dayjs from 'dayjs';
import { InterfaceReply } from '@/utils/request';
import { salePriceStatusOptions } from '@/pages/module-tables/constants';
import { TableListInterface } from '@/pages/module-tables/service/api';
import { PageStoreContext } from '@/pages/module-tables/store';

type DataReply = InterfaceReply<typeof TableListInterface>['contents'][0];

/** 状态和tags的映射 */
const statusTagMap: Record<DataReply['status'], ComponentProps<typeof Tag>['color']> = {
  draft: 'default',
  wait: 'processing',
  success: 'success',
  fail: 'error',
};

export const useSimpleColumns = () => {
  const { enums } = PageStoreContext.useContainer();

  const columns = useMemo(() => {
    const ret: ProColumns<DataReply>[] = [];

    // search
    const searchColumns: typeof ret = [
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '金额',
        dataIndex: 'amount',
        valueType: 'money',
        tip: '这里是对金额的补充描述',
        search: {
          transform: (value: string) => {
            return {
              money: Number(value) * 100,
            };
          },
        },
      },
      {
        title: '状态`',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: enums.status || {},
      },
      {
        title: '店铺类型`',
        dataIndex: 'storeType',
        valueType: 'select',
        fieldProps: {
          options: salePriceStatusOptions,
        },
      },
      {
        title: '创建时间`',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        initialValue: [dayjs(), dayjs().add(1, 'day')],
        search: {
          transform: (value: string[]) => {
            return {
              createTimeStart: dayjs(value[0]).startOf('day').unix() * 1000,
              createTimeEnd: dayjs(value[1]).endOf('day').unix() * 1000,
            };
          },
        },
      },
    ];

    // columns
    const dataColumns: typeof ret = [
      {
        title: '标题',
        dataIndex: 'title',
        fixed: 'left',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
        sorter: (a, b) => a.createTime - b.createTime,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        filters: true,
        onFilter: true,
        valueEnum: enums.status || {},
        tooltip: '这是对状态的补充描述',
        render: (text, record) => {
          return <Tag color={statusTagMap[record.status] || 'default'}>{text}</Tag>;
        },
      },
      {
        title: '金额（元）',
        dataIndex: 'amount',
        valueType: 'money',
      },
      {
        title: '开关',
        dataIndex: 'enable',
        render: (_, record) => {
          return (
            <Popconfirm
              title={`确认${record.enable ? '关闭' : '打开'}吗？`}
              onConfirm={() => {
                message.info('调用开关接口');
              }}
            >
              <Switch checked={record.enable} />
            </Popconfirm>
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        render: (_, record) => {
          return <span>{record.remark.substring(0, 10)}</span>;
        },
      },
    ];

    ret.push(
      ...searchColumns.map((v) => {
        return { ...v, hideInTable: true };
      }),
      ...dataColumns.map((v) => {
        return { ...v, hideInSearch: true };
      }),
    );

    return ret;
  }, [enums.status]);

  return columns;
};
