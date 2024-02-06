import { useMemo } from 'react';
import { Button, Popconfirm, Tooltip } from 'poizon-design';
import { history } from '@umijs/max';

import type { Content } from '@/entities/serviceProvider/interface/queryServiceProviderList';
import { StatusEnum, StatusOptions, ServiceTypeOptions } from './constants';
import { modeEnum } from './components/DialogForm/index';

interface useColumnsProps {
  refreshList: () => void;
  delServiceProviderFn: ({ id }: { id: number }) => void;
  setDetailData: (data: Content) => void;
  setMode: (mode: string) => void;
  setVisible: (visible: boolean) => void;
}

export default function useColumns(props: useColumnsProps) {
  const { delServiceProviderFn, setMode, setVisible, setDetailData } = props;
  const columns = useMemo(() => {
    return [
      {
        title: '服务商ID',
        dataIndex: 'spId',
        valueType: 'money',
        fieldProps: {
          maxLength: 16,
          min: 0,
          moneySymbol: false,
          controls: false,
        },
        render: (_, record) => {
          return record?.spId;
        },
      },
      {
        title: '服务商名称',
        dataIndex: 'spName',
      },
      {
        title: '服务商缩写',
        dataIndex: 'spNameAbbr',
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'spStatus',
        valueType: 'select',
        fieldProps: {
          options: StatusOptions,
        },
        hideInTable: true,
      },
      {
        title: '服务类型',
        dataIndex: 'spSubType',
        valueType: 'select',
        fieldProps: {
          options: ServiceTypeOptions,
        },
        render: (val, record) => {
          return record?.spSubTypeDesc;
        },
      },
      {
        title: '关联类目',
        dataIndex: 'dataNames',
        hideInSearch: true,
        width: 260,
        render: (val) => {
          if (val.length === 0) return '-';
          if (val.length <= 3) {
            return val.map((item) => item).join('、');
          }
          const allText = val.map((item) => item).join('、');
          const top3Text = val
            .slice(0, 3)
            .map((item) => item)
            .join('、');
          return (
            <>
              {top3Text}
              <Tooltip title={allText}>
                <Button type="link">查看更多</Button>
              </Tooltip>
            </>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'spStatusDesc',
        hideInSearch: true,
      },
      {
        title: '合作期限',
        dataIndex: 'cooperationPeriod',
        hideInSearch: true,
        width: 200,
        render: (_, record) => {
          const { startEffectiveTime, endEffectiveTime } = record;
          return `${startEffectiveTime}至${endEffectiveTime}`;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        hideInSearch: true,
      },
      {
        title: '更新人',
        dataIndex: 'operator',
        hideInSearch: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        hideInSearch: true,
        fixed: 'right',
        width: 230,
        render: (_, record) => {
          const { spStatus } = record;
          if (spStatus === StatusEnum.已退出) return '-';
          return (
            <>
              <Button
                type="link"
                style={{ paddingLeft: 0 }}
                onClick={() => {
                  setMode(modeEnum.编辑);
                  setVisible(true);
                  setDetailData(record);
                }}
              >
                编辑
              </Button>
              <Button
                type="link"
                onClick={() => {
                  history.push(`/serviceProvider/userList`);
                  sessionStorage.setItem('spId', record.spId);
                }}
              >
                关联用户
              </Button>
              <Popconfirm
                title="是否确认作废？"
                placement="left"
                onConfirm={() => delServiceProviderFn({ spId: record.spId })}
                cancelText="取消"
                okText="确定"
              >
                <Button type="link" danger>
                  作废
                </Button>
              </Popconfirm>
            </>
          );
        },
      },
    ];
  }, []);
  return columns;
}
