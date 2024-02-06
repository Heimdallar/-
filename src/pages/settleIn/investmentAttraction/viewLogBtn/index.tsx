import { Button, Modal } from 'poizon-design'
import React, { useEffect, useState } from 'react'
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { datasProps } from '../type'
import fetchObtainIeaOperLogPageable from '@/services/fetchObtainIeaOperLogPageable/fetchObtainIeaOperLogPageable'

interface Props {
  data: datasProps
}

const defaultPagiSetting = {
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100],
  total: 0
};

export default function index({ data }: Props) {
  const [visible, setIsVisible] = useState(false)
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);

  const columns = [{
    title: '操作时间',
    dataIndex: 'opTimeStr',
    key: 'opTimeStr',
    width: 120,
  }, {
    title: '操作人',
    dataIndex: 'opUserInfo',
    key: 'opUserInfo',
    width: 120,
  },
  {
    title: '操作描述',
    dataIndex: 'desc',
    key: 'desc',
    width: 120,
  },]

  const onCancel = () => {
    setIsVisible(false)
  }

  const openModal = async () => {
    setIsVisible(true)
  }

  return (
    <>
      <Button type='link' onClick={openModal}>查看日志</Button>
      {visible &&
        <Modal width={800} visible={visible} title="查看日志" footer={false} onCancel={onCancel}>
          <ProTable
            columns={columns}
            tableAlertRender={false}
            request={async (params = {}) => {
              const { current, id, name, status, ...rest } = params;
              const newParams = {
                ...rest,
                activityId: data.id,
                activityName: name,
                statuses: status ? [status] : [],
                page: current
              }
              const res = await fetchObtainIeaOperLogPageable(newParams)
              if (!res.success) {
                return
              }
              setPageInfo({ ...pageInfo, total: res.data.total });
              return {
                data: res.data.datas || [],
                total: res.data.total,
              };
            }}
            rowKey="id"
            pagination={pageInfo}
            onChange={(params) => {
              const { current, ...rest } = params;
              setPageInfo({ ...defaultPagiSetting, ...rest });
            }}
            search={false}
            toolbar={{
              settings: [],
            }}
            toolBarRender={() => [
            ]}
            scroll={{ y: 300 }} />
        </Modal>
      }
    </>
  )
}
