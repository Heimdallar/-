import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Popconfirm, Space } from 'poizon-design';
import React, { useMemo } from 'react';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import fetchDeleteBrandService from '@/services/settleIn/deleteBrand';
import { updateStatus } from './api';
import {
  dbStatusOptions,
  IncentiveOptions,
  recommendAwardStatusOptions,
  statusOptions,
} from './config';
import { OpportunityItem } from './interface';
import { queryLabelList } from '@/pages/leadManagement/publicSea/api'
import LabelDisplay from '@/pages/leadManagement/publicSea/components/labelDisplay'

const useColumns = (
  setRow: React.Dispatch<React.SetStateAction<OpportunityItem | undefined>>,
  SetOpportunityShow: React.Dispatch<React.SetStateAction<boolean>>,
  refreshList: () => void,
) => {
  const columns = useMemo<ProColumns<OpportunityItem, 'text'>[]>(() => {
    return [
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 180,
        fieldProps: {
          placeholder: '请输入品牌名称',
          showSearch: true,
        },
      },
      {
        title: '主营类目',
        dataIndex: 'mainCategory',
        key: 'mainCategoryId',
        width: 140,
        hideInSearch: false,
        renderFormItem: () => {
          return <CategorySelect isIdValue placeholder="请选择主营类目" />;
        },
      },
      {
        title: '资质类型',
        dataIndex: 'qualificationType',
        hideInSearch: true,
        render: (_, record) => {
          return record.qualificationTypeDesc;
        },
      },
      {
        title: '品牌中文名',
        dataIndex: 'brandNameCn',
        hideInSearch: true,
        render: (_, record) => {
          return record.brandNameCn;
        },
      },
      {
        title: '品牌英文名',
        dataIndex: 'brandNameEn',
        hideInSearch: true,
        render: (_, record) => {
          return record.brandNameEn;
        },
      },
      {
        title: '是否激励',
        dataIndex: 'incentive',
        valueType: 'select',
        fieldProps: {
          options: IncentiveOptions,
        },
        render: (_, record) => {
          return record.incentive ? '是' : '否';
        },
      },
      {
        title: '招商状态',
        dataIndex: 'statusDesc',
        key: 'status',
        valueType: 'select',
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '请选择招商状态',
        },
        valueEnum: statusOptions,
      },
      {
        title: '是否推荐有奖',
        dataIndex: 'recommendAwardStatusDesc',
        key: 'recommendAwardStatus',
        valueType: 'select',
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '请选择推荐有奖',
        },
        valueEnum: recommendAwardStatusOptions,
      },
      {
        title: '落库状态',
        dataIndex: 'commodityStatus',
        key: 'commodityStatus',
        valueType: 'select',
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '请选择落库状态',
        },
        hideInTable: true,
        valueEnum: dbStatusOptions,
      },
      {
        title: '品牌标签',
        dataIndex: 'labelIds',
        valueType: 'select',
        hideInTable: true,
        request: async () => {
          const ret = await queryLabelList({});
          const res = ret?.map((item: { title: string, value: number }) => ({
            label: item.title,
            value: item.value,
          }));
          return res || [];
        },
        fieldProps: {
          mode: 'multiple',
          placeholder: '全部',
        },
      },
      {
        title: '对接人',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        hideInSearch: true,
      },
      {
        title: '更新人姓名',
        dataIndex: 'editor',
        key: 'editor',
        hideInSearch: true,
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        hideInSearch: true,
      },
      {
        title: '品牌等级',
        dataIndex: 'commodityBrandLevelDesc',
        key: 'commodityBrandLevelDesc',
        hideInSearch: true,
      },
      {
        title: '落库状态',
        dataIndex: 'commodityStatusDesc',
        key: 'commodityStatusDesc',
        hideInSearch: true,
      },
      {
        title: '品牌标签',
        dataIndex: 'labelNames',
        render(_, record) {
          return <LabelDisplay record={record} />;
        },
        hideInSearch: true,
      },
      {
        title: '操作',
        dataIndex: '',
        hideInSearch: true,
        fixed: 'right',
        width: 280,
        render(_, record) {
          return (
            <Space>
              <Popconfirm
                placement="left"
                title="是否确认 招商/暂不招商 该品牌"
                okText="确定"
                cancelText="取消"
                onConfirm={async () => {
                  const { id, status } = record;
                  const resStatus = status === 0 ? 1 : 0;
                  const res = await updateStatus({ id, status: resStatus });
                  if (!res) return;
                  message.success('变更成功');
                  refreshList();
                }}
              >
                <Button type="link">{record.status === 1 ? '暂不招商' : '招商'}</Button>
              </Popconfirm>
              <Button
                type="link"
                onClick={() => {
                  const { mainCategory, mainCategoryId, ...rest } = record;
                  const rowData = {
                    ...rest,
                    mainCategoryInfo: {
                      label: mainCategory,
                      value: mainCategoryId,
                      key: mainCategoryId,
                    },
                  };
                  setRow(rowData);
                  SetOpportunityShow(true);
                }}
              >
                编辑
              </Button>
              <Popconfirm
                placement="left"
                title="您是否确认删除该品牌？"
                okText="确认"
                cancelText="取消"
                onConfirm={async () => {
                  const { id } = record;
                  const res = await fetchDeleteBrandService({ id });
                  if (!res) return;
                  message.success('删除成功');
                  refreshList();
                }}
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            </Space>
          );
        },
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
