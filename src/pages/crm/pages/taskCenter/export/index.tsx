import React, { useState } from 'react';
import ProTable from '@poizon-design/pro-table';
import store from '@/store';
import { defaultPagiSetting } from '@/config';
import { fetchTaskList } from './api/index';
import { TaskItem } from './interface';
import { useColumns } from './useColumns';

const TaskCenter: React.FC = () => {
  const { userStore } = store.modules;
  const { id } = userStore.userInfo;
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);

  const columns = useColumns();

  return (
    <div data-trackid="2851d2e320816522-kCIhrp">
      <ProTable<TaskItem>
        columns={columns}
        tableAlertRender={false}
        request={async (params = {}) => {
          const { workTypeName, current, ...rest } = params;
          const resp: any = await fetchTaskList({
            ...rest,
            fileType: workTypeName,
            creator: id,
            pageNum: current,
          });
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.contents || [],
            total: resp.total,
          };
        }}
        rowKey="id"
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...defaultPagiSetting, ...rest });
        }}
        headerTitle={false}
        toolbar={{
          settings: [],
        }}
      />
    </div>
  );
};
export default TaskCenter;
