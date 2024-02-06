import React, { FC, useState, useRef, useEffect } from 'react';
import ProTable from '@poizon-design/pro-table';
import { Button } from 'poizon-design';
import queryUserPermissionDataList from '@/services/serviceProvider/queryUserPermissionDataList';
import type { Content } from '@/entities/serviceProvider/interface/queryUserPermissionDataList';
import useSearchTable from './useSearchTable';
import useColumns from './useColumns';
import DialogForm, { modeEnum } from './components/DialogForm';

interface ListDataItem {}

interface ListTableProps {}

const ListTable: FC<ListTableProps> = (props) => {
  const [detailData, setDetailData] = useState<Content>();
  const [mode, setMode] = useState<modeEnum>(modeEnum.新建);
  const [visible, setVisible] = useState(false);
  const { actionRef, searchFormRef, refreshList, updateStatusFn } = useSearchTable({ setVisible });
  const tableColumns = useColumns({
    refreshList,
    updateStatusFn,
    setDetailData,
    setMode,
    setVisible,
  });

  return (
    <div>
      <ProTable<ListDataItem>
        formRef={searchFormRef}
        columns={tableColumns}
        actionRef={actionRef}
        options={false}
        form={{
          initialValues: {
            status: '',
            spId: sessionStorage.getItem('spId'),
          },
          defaultCollapsed: false,
        }}
        request={({ current, ...resParams }) => {
          sessionStorage.removeItem('spId');
          return queryUserPermissionDataList({ pageNum: current, ...resParams });
        }}
        scroll={{ x: 1500 }}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setMode(modeEnum.新建);
              setVisible(true);
              setDetailData(undefined);
            }}
          >
            新增用户关联
          </Button>,
        ]}
        pagination={{
          pageSize: 20,
        }}
      />
      {visible && (
        <DialogForm
          detailData={detailData}
          mode={mode}
          refreshList={refreshList}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

export default ListTable;
