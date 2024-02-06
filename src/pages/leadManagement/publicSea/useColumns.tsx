import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Row, Space, Tag } from 'poizon-design';
import { ProFormInstance } from '@poizon-design/pro-form';
import SettingColumnsModal from '@/components/settingColumnsModal';
import useUserTableConfig from '@/hooks/useUserTableConfig';
import { IListItem } from './interface';
import { sourceOptions } from './config';
import LabelDisplay from './components/labelDisplay';
import StatusDisplay from './components/statusDisplay';
import useSearchColumns from './useSearchColumns';
import Operate from './components/operate';
import { timeoutColor } from './contant';

const useColumns = (
  invokeUpdateDetail: (leadsId: number) => void,
  refreshList: () => void,
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>,
) => {
  const columns = useMemo<ProColumns<IListItem, 'text'>[]>(() => {
    const searchColumns = useSearchColumns({ formRef, showFoloowUp: true });
    return [
      ...searchColumns,
      {
        title: '线索ID',
        dataIndex: 'leadsId',
        key: 'leadsId',
        fixed: 'left',
        hideInSearch: true,
        render(_, record) {
          return (
            <Space size={1}>
              {record.timeoutDesc && (
                <Tag color={timeoutColor[record.timeout as '1' | '2']}>
                  {record.timeoutDesc}
                </Tag>
              )}{' '}
              {record.leadsId}
            </Space>
          );
        },
        columnKey: 'leads_id',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'statusList',
        render(_, record) {
          return <StatusDisplay record={record} />;
        },
        hideInSearch: true,
        columnKey: 'status',
      },
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
        hideInSearch: true,
        columnKey: 'brand_name',
      },
      {
        title: '主营类目',
        dataIndex: 'mainCategory',
        hideInSearch: true,
        columnKey: 'main_category',
      },
      {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
        hideInSearch: true,
        render(_, record) {
          return (
            <div>
              {record.entryStatusDesc && <Tag color="green">{record.entryStatusDesc}</Tag>}{' '}
              {record.enterpriseName}
            </div>
          );
        },
        columnKey: 'enterprise',
      },
      {
        title: '剩余处理时效',
        dataIndex: 'leftProcessTimeDesc',
        key: 'leftProcessTimeDesc',
        width: 180,
        hideInSearch: true,
        columnKey: 'left_process',
        render(_, record) {
          return record.leftProcessTimeDesc && <Tag color="red">{record.leftProcessTimeDesc}</Tag>;
        },
      },
      {
        title: '线索类型',
        dataIndex: 'leadsTypeDesc',
        key: 'leadsType',
        width: 180,
        hideInSearch: true,
        columnKey: 'leads_type',
      },
      {
        title: '标签',
        dataIndex: 'labelNames',
        key: 'labelIds',
        render(_, record) {
          return <LabelDisplay record={record} />;
        },
        hideInSearch: true,
        columnKey: 'label',
      },
      {
        title: '命中标识',
        dataIndex: 'hitTagDesc',
        hideInSearch: true,
        columnKey: 'hit_tag',
      },
      {
        title: '信息来源',
        dataIndex: 'source',
        ellipsis: true,
        key: 'source',
        width: 120,
        render(_, record) {
          const sourceObj = sourceOptions.find((item) => item.value === record.source) || {
            label: '',
            value: 0,
          };
          // 兼容：新增和编辑时，若信息来源未填，保存时会传-1，这里展示需要处理一下
          if (record.source === -1) return '-';
          return sourceObj.label || record.source;
        },
        hideInSearch: true,
        columnKey: 'source',
      },
      {
        title: '跟进人',
        dataIndex: 'followerName',
        key: 'developer',
        hideInSearch: true,
        columnKey: 'follower',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        hideInSearch: true,
        width: 220,
        columnKey: 'create_time',
        sorter: true,
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        hideInSearch: true,
        width: 220,
        columnKey: 'update_time',
        sorter: true,
      },
      {
        title: (
          <Row justify="space-between" align="middle">
            操作
            <SettingColumnsModal
              tableKey="merchant_leads"
              onOk={(values) => setUserTableConfig(values)}
            />
          </Row>
        ),
        dataIndex: 'operate',
        width: 220,
        hideInSearch: true,
        fixed: 'right',
        columnKey: 'settings',
        render(_, record) {
          return <Operate record={record} refreshList={refreshList} buttonType="link"></Operate>;
        },
      },
    ];
  }, []);
  const [selectedColumns, setUserTableConfig] = useUserTableConfig({
    tableKey: 'merchant_leads',
    columns,
  });

  return selectedColumns;
};

export { useColumns };
