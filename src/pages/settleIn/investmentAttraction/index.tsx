import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import fetchIeaObtainIeaInfoPageableService from '@/services/fetchObtainIeaInfoPageable/fetchObtainIeaInfoPageable'
import { useColumns } from './useColumn'
import { useNavigate } from '@umijs/max';
import { Button } from 'poizon-design';
import _ from 'lodash'
import moment from 'moment';

const defaultPagiSetting = {
  pageSize: 20,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100],
  total: 0
};

export default function index() {
  const actionRef = useRef<ActionType>();
  const navigate = useNavigate()
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);


  const refreshList = () => {
    actionRef.current?.reload();
  };

  const columns = useColumns({
    refreshList
  })

  const handleCreate = () => {
    navigate(
      {
        pathname: '/settleIn/investmentAttraction/create',
      },
      { replace: true },
    );
  }

  return (
    <div data-trackid="f1d84af759b4ec90-H7cJAL">
      <ProTable
        columns={columns}
        actionRef={actionRef}
        tableAlertRender={false}
        request={async (params = {}) => {
          const { current, id, name, statusStr, startTime, pageSize, ...rest } = params;
          const newstartTime = startTime ? moment(startTime[0]).valueOf() : null
          const newendTime = startTime ? moment(startTime[1]).valueOf() : null
          const newParams = {
            activityId: id ? Number(id) : null,
            activityName: name,
            statuses: !_.isUndefined(statusStr) && statusStr !== '' ? [statusStr] : [],
            startTime: newstartTime,
            endTime: newendTime,
            page: current,
            pageSize
          }
          const res = await fetchIeaObtainIeaInfoPageableService(newParams)
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
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        form={{
          ignoreRules: false,
        }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...defaultPagiSetting, ...rest });
        }}
        headerTitle="招商邀约入驻"
        toolbar={{
          settings: [
            <Button type="primary" onClick={handleCreate}>新建活动</Button>
          ],
        }}
        toolBarRender={() => [
        ]}
        scroll={{ x: 1500 }} />
    </div>
  )
}
