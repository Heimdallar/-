import React, { useRef, useState } from 'react';
import ProTable from '@poizon-design/pro-table';
import { Button } from 'poizon-design';
import fetchChannelObtainPlanChannelPageableService from '@/services/channelManagement/queryObtainPlanChannelPageable';
// fetchChannelObtainChannelsApi
import fetchChannelObtainChannelsService from '@/services/channelManagement/queryObtainChannels';
import OpportunityModal from './components/opportunityModal';

import { useColumns } from './useColumns';

export default function Index() {
  const [opportunityShow, SetOpportunityShow] = useState(false);
  const [row, setRow] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const actionRef = useRef();
  const refreshList = () => {
    actionRef.current?.reload();
  };
  const columns = useColumns(setRow, SetOpportunityShow, setIsEdit, setIsAdd);

  return (
    <div>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        tableAlertRender={false}
        request={async (params = {}) => {
          const { current, ...rest } = params;
          const resp: any = await fetchChannelObtainChannelsService({
            ...rest,
          });
          console.log('resp', resp);
          return {
            data: resp.data || [],
            total: resp.data.total,
          };
        }}
        rowKey="id"
        pagination={false}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        headerTitle="渠道管理"
        toolbar={{
          settings: [],
        }}
        expandIconColumnIndex={1}
      />
      <OpportunityModal
        opportunityShow={opportunityShow}
        row={row}
        refreshList={refreshList}
        setRow={setRow}
        SetOpportunityShow={SetOpportunityShow}
        isEdit={isEdit}
        isAdd={isAdd}
      />
    </div>
  );
}
