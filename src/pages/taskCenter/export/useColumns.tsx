import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, Tag } from 'poizon-design';
import { TaskItem } from './interface';
import { IS_COMPLETED, StatusDescMap, taskTypeOptions } from './config'
import { formatDate } from '@/utils/common';
import { findUrlByfileIdAndKey } from './api';
import moment from 'moment';

const useColumns = () => {
  const handleDownload = async (id: number, type: 'success' | 'fail' | 'export') => {
    try {
      const url = await findUrlByfileIdAndKey({ id, type })
      if (!url) return 
      window.open(url)
    } catch (err) {
      console.error('获取下载地址失败', err)
    }
  }
  const columns = useMemo<ProColumns<TaskItem>[]>(() => {
    
    return [
      {
        title: '任务状态',
        dataIndex: 'status',
        key: 'status',
        hideInSearch: true,
        render: (_, record: TaskItem) => {
          return (
            <span>
              <Tag color={StatusDescMap.get(record.status)?.type}>{StatusDescMap.get(record.status)?.label || '--'}</Tag>
            </span>
          )
        },
      },
      { title: '任务编号', dataIndex: 'id', hideInSearch: true },
      { title: '任务名称', dataIndex: 'fileName', hideInSearch: false, fieldProps: {placeholder: '请输入任务名称'} },
      {
        title: '任务类型',
        dataIndex: 'workTypeName',
        hideInSearch: false,
        valueType: 'select',
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '请选择任务类型'
        },
        valueEnum: taskTypeOptions,
      },
      {
        title: '开始时间',
        dataIndex: 'createTime',
        hideInSearch: true,
        render(_, record) {
          return formatDate(record.createTime);
        },
      },
      {
        title: '任务时间',
        dataIndex: 'taskTime',
        valueType: 'dateRange',
        hideInTable: true,
        fieldProps: {
          placeholder: ['开始日期', '结束日期']
        },
        search: {
          transform: (value) => {
            if (!value) return {};
            return {
              createTimeStart: Number(moment(value[0]).format('X')),
              createTimeEnd: Number(moment(value[1]).endOf('day').format('X')),
            };
          },
        },
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
        hideInSearch: true,
        render(_, record) {
          return formatDate(record.endTime)
        },
      },
      {
        title: '下载日志',
        dataIndex: '',
        hideInSearch: true,
        render(_, record) {
          return ( <>
          { record.taskType === 0 && record.status === IS_COMPLETED && record.fileKey ? 
            <Button
              type="link"
              onClick={() => handleDownload(record.id, 'export')}
            >
              下载日志
            </Button> : null
          }
          {
            record.taskType === 1 && record.successFileKey ? 
            <Button
                type="link"
                onClick={() => handleDownload(record.id, 'success')}
              >
                成功日志
              </Button> : null
            }
            {
              record.taskType === 1 && record.errorFileKey ? 
              <Button
                type="link"
                onClick={() => handleDownload(record.id, 'fail')}
              >
                失败日志
              </Button> : null
            }
          </>
          )
        },
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
