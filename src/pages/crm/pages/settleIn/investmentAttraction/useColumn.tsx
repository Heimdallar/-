import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Popconfirm, Space } from 'poizon-design';
import CancelBtn from './cancelBtn'
import ViewLogBtn from './viewLogBtn'
import { formatDate } from '@/utils/common';
import { StautsType, StautsTypeOptions } from './enum'
import { useNavigate } from '@umijs/max';

interface Props {
  refreshList: () => void
}
const useColumns = (
  {
    refreshList
  }: Props
) => {

  const navigate = useNavigate()
  const showEditBtnStatus = [StautsType.WAIT_SUBMIT, StautsType.REJECTED, StautsType.WAIT_ADUIT, StautsType.WAIT_START, StautsType.RUNNING, StautsType.WAIT_START]
  const cancelBtnStatus = [StautsType.WAIT_START, StautsType.RUNNING]

  const handleView = (id: number) => {
    navigate(
      {
        pathname: `/settleIn/investmentAttraction/view?id=${id}`,
      },
      { replace: true },
    );
  }

  const copyH5Link = (encodedId: string) => {
    const textField = document.createElement('textarea');
    textField.innerText = `https://m.dewu.com/h5-deal/merchants-invitation?encodedId=${encodedId}`;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    message.success('链接已复制')
  }

  const handleEdit = (id: number) => {
    navigate(
      {
        pathname: `/settleIn/investmentAttraction/edit?id=${id}`,
      },
      { replace: true },
    );
  }

  const columns = useMemo<ProColumns[]>(() => {
    return [
      {
        title: '活动ID',
        dataIndex: 'id',
        key: 'id',
        width: 120,
        fieldProps: {
          controls: false,
          showCount: true,
          maxLength: 19,
        },
        formItemProps: {
          rules: [{
            message: '请输入数字',
            pattern: /^[0-9]+$/
          }]
        }
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        key: 'name',
        width: 180,
        fieldProps: {
          maxLength: 50,
          showCount: true,
          max: 50
        },
      },
      {
        title: '活动状态',
        dataIndex: 'statusStr',
        key: 'statusStr',
        width: 180,
        valueType: 'select',
        fieldProps: {
          options: StautsTypeOptions,
          defaultValue: ''
        }
      },
      {
        title: '活动时间段',
        dataIndex: 'startTime',
        key: 'startTime',
        valueType: 'dateTimeRange',
        width: 400,
        fieldProps: {
          format: 'YYYY-MM-DD HH:mm:ss',
          showTime: { format: 'HH:mm:ss' },
          style: {
            width: 375
          }
        },
        render: (_, record) => {
          return `${formatDate(record.startTime)} ~ ${formatDate(record.endTime)}`
        }
      },
      {
        title: '邀请码有效时间段',
        dataIndex: 'invitationCodeStartTime',
        key: 'invitationCodeStartTime',
        width: 400,
        valueType: 'dateTimeRange',
        hideInSearch: true,
        fieldProps: {
          format: 'YYYY-MM-DD HH:mm:ss',
          showTime: { format: 'HH:mm:ss' },
          style: {
            width: 375
          }
        },
        render: (_, record) => {
          return `${formatDate(record.invitationCodeStartTime)} ~ ${formatDate(record.invitationCodeEndTime)}`
        }
      },
      {
        title: '驳回原因',
        dataIndex: 'rejectReason',
        width: 300,
        key: 'rejectReason',
        hideInSearch: true,
      },
      {
        title: '操作',
        dataIndex: '',
        hideInSearch: true,
        width: 400,
        fixed: 'right',
        render(_, record) {
          return (
            <Space>
              <Button type='link' onClick={() => { handleView(record.id) }}>查看</Button>
              {showEditBtnStatus.includes(record.status) &&
                <Button type='link' onClick={() => { handleEdit(record.id) }}>编辑</Button>
              }
              {cancelBtnStatus.includes(record.status) && <CancelBtn data={record} refreshList={refreshList} />}
              <ViewLogBtn data={record} />
              {cancelBtnStatus.includes(record.status) && <Button type='link' onClick={() => { copyH5Link(record.encodedId) }}>获取链接</Button>}
            </Space>
          );
        },
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
