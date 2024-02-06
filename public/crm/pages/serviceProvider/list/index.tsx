import React, { FC, useState, useRef, useEffect } from 'react';
import ProTable from '@poizon-design/pro-table';
import { Button } from 'poizon-design';
import fetchServiceProviderPageService from '@/services/serviceProvider/queryServiceProviderList';
import type { Content } from '@/entities/serviceProvider/interface/queryServiceProviderList.ts';
import useSearchTable from './useSearchTable';
import useColumns from './useColumns';
import DialogForm, { modeEnum } from './components/DialogForm';

interface ListDataItem {}

interface ListTableProps {}

const ListTable: FC<ListTableProps> = () => {
  const [detailData, setDetailData] = useState<Content>();
  const [mode, setMode] = useState<modeEnum>(modeEnum.新建);
  const [visible, setVisible] = useState(false);
  const { actionRef, searchFormRef, refreshList, delServiceProviderFn } = useSearchTable({});
  const tableColumns = useColumns({
    refreshList,
    delServiceProviderFn,
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
            spSubType: '',
            spStatus: '',
          },
          defaultCollapsed: false,
        }}
        request={async ({ current, ...resParams }) => {
          const data = await fetchServiceProviderPageService({ page: current, ...resParams });
          return data;
        }}
        rowKey="id"
        search={{
          defaultCollapsed: false,
        }}
        scroll={{ x: 1500 }}
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
            新增服务商
          </Button>,
        ]}
        pagination={{
          pageSize: 20,
        }}
      />
      {visible && (
        <DialogForm
          detailData={detailData}
          refreshList={refreshList}
          mode={mode}
          setVisible={setVisible}
        />
      )}
    </div>
  );
};

export default ListTable;
