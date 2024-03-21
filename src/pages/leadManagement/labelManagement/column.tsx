import React, { FC, useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Popconfirm, Switch } from 'poizon-design';
import { LabelItem, EditLabelItem } from './interface';
import { labelChannelOptions, statusOptions } from './interface';
import { updateLabelStatus } from './service';


const useColumns = (setRow:FC, setLabelShow: FC, refreshList: () => void) => {
  const columns :ProColumns<LabelItem, "text">[]=
 [
      {
        title: '标签ID',
        dataIndex: 'id',
        key: 'id',
        fieldProps: {
          placeholder: '请输入标签ID',
        },
      },
      {
        title: '标签名称',
        dataIndex: 'labelName',
        key: 'labelName',
        fieldProps: {
          placeholder: '请输入标签名称',
        },
      },
      {
        title: '标签渠道',
        dataIndex: 'labelChannel',
        key: 'labelChannel',
        hideInSearch: false,
        valueType: 'select',
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '请选择标签渠道',
        },
        valueEnum: labelChannelOptions,
      },
      {
        title: '标签状态',
        dataIndex: 'labelStatus',
        key: 'status',
        hideInSearch: false,
        valueType: 'select',
        hideInTable: true,
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '请选择标签状态',
        },
        valueEnum: statusOptions,
        search: {
          transform: (value) => {
            return { status: Number(value) };
          },
        },
      },
      {
        title: '是否启用标签',
        dataIndex: 'status',
        key: 'labelOpen',
        hideInSearch: true,
        render(_, record) {
          return (
            <Popconfirm
              placement="left"
              title={record.status === 0 ? '确认停用吗？' : '确认启用吗？'}
              okText="确定"
              cancelText="取消"
              onConfirm={async () => {
                const { id, status } = record
                const resStatus = status === 0 ? 1 : 0
                const res = await updateLabelStatus({id, status: resStatus})
                if (!res) return
                message.success('标签状态变更成功')
                refreshList()
              }}
            >
              <Switch checked={record.status === 0} />
            </Popconfirm>
          )
        }
      },
      {
        title: '操作',
        dataIndex: '',
        hideInSearch: true,
        fixed: 'right',
        width: 100,
        render(_, record) {
          return (
            <>
              <Button type='link' onClick={ async() => {
                const { status, labelChannel, ...rest } = record
                const initialValues = {
                  ...rest,
                  labelChannel: labelChannel + '',
                  status: status === 0
                }
                setRow(initialValues)
                setLabelShow(true)
              }}>编辑</Button>
            </>
          )
        },
      },
    ];

  return columns;
};

export { useColumns };
