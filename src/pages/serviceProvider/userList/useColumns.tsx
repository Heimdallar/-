import React, { useMemo } from 'react';
import type { ProColumns } from '@poizon-design/pro-table';
import { Button, Tooltip, Tag, Popconfirm } from 'poizon-design';
import type { Content } from '@/entities/serviceProvider/interface/queryUserPermissionDataList';
import { ServiceTypeEnum } from '../list/constants';
import { StatusEnum, StatusOptions } from './constants';
import { modeEnum } from './components/DialogForm';

interface useColumnsProps {
  refreshList: () => void;
  updateStatusFn: (id: number, status: number) => void;
  setMode: (mode: modeEnum) => void;
  setDetailData: (data: Content) => void;
  setVisible: (visible: boolean) => void;
}

export default function useColumns(props: useColumnsProps) {
  const { updateStatusFn, setMode, setDetailData, setVisible } = props;
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      valueType: 'money',
      fieldProps: {
        maxLength: 15,
        min: 0,
        moneySymbol: false,
        controls: false,
      },
      render: (_, record) => {
        return record?.userId;
      },
    },
    {
      title: '用户姓名',
      dataIndex: 'userName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: StatusOptions,
      },
    },
    {
      title: '服务商ID',
      dataIndex: 'spId',
      hideInTable: true,
      valueType: 'money',
      fieldProps: {
        maxLength: 15,
        min: 0,
        moneySymbol: false,
        controls: false,
      },
    },
    {
      title: '用户角色',
      dataIndex: 'roleName',
      hideInSearch: true,
    },
    {
      title: '关联类目',
      dataIndex: 'categoryList',
      hideInSearch: true,
      width: 260,
      render: (val) => {
        if (val.length === 0) return '-';
        if (val.length <= 3) {
          return val.map((item) => item.label).join('、');
        }
        const allText = val.map((item) => item.label).join('、');
        const top3Text = val
          .slice(0, 3)
          .map((item) => item.label)
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
      title: '关联服务商ID',
      dataIndex: 'spId',
      hideInSearch: true,
    },
    {
      title: '关联服务商名称',
      dataIndex: 'spName',
      hideInSearch: true,
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      hideInSearch: true,
      render: (text: number) => {
        return ServiceTypeEnum[text];
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (text: number) => {
        return <Tag color={text === StatusEnum.启用 ? 'success' : 'error'}>{StatusEnum[text]}</Tag>;
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => {
        const { status, id } = record;

        const text = `是否确认${StatusEnum.启用 === status ? '停用' : '启用'}该用户?`;
        return (
          <>
            <Button
              type="link"
              style={{ paddingLeft: 0 }}
              onClick={() => {
                setMode(modeEnum.编辑);
                setDetailData(record);
                setVisible(true);
              }}
            >
              编辑
            </Button>
            <Popconfirm
              title={text}
              placement="left"
              onConfirm={() =>
                updateStatusFn({
                  id,
                  status: status === StatusEnum.启用 ? StatusEnum.停用 : StatusEnum.启用,
                })
              }
              cancelText="取消"
              okText="确定"
            >
              <Button type="link" danger={status === StatusEnum.启用}>
                {status === StatusEnum.启用 ? '停用' : '启用'}
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return columns;
}
