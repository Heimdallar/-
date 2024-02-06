import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { fetchLabelList } from './api/index';
import { LabelItem, EditLabelItem } from './interface';
import { useColumns } from './useColumns';
import { Button } from 'poizon-design';
import LabelModal from './components/labelModal';
import { PlusLine } from '@poizon-design/icons';
import { default20PagiSetting } from '@/config';

const LabelManagement: React.FC<any> = () => {
  const [labelShow, setLabelShow] = useState(false)
  const [row, setRow] = useState<EditLabelItem>()
  const actionRef = useRef<ActionType>();
  const [pageInfo, setPageInfo] = useState(default20PagiSetting);

  const refreshList = () => {
    actionRef.current?.reload()
  }

  const columns = useColumns(setRow, setLabelShow, refreshList);

  return (
    <div data-trackid="473b9a27eeaafe7b-Qt5qme">
      <ProTable<LabelItem>
        columns={columns}
        tableAlertRender={false}
        actionRef={actionRef}
        request={async (params = {}) => {
          const { current, ...rest } = params;
          const resp: any = await fetchLabelList({
            ...rest,
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
          setPageInfo({ ...default20PagiSetting, ...rest });
        }}
        search = {{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        headerTitle="配置列表"
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setLabelShow(true)
            }}
            icon={<PlusLine />}
            key="export"
            type="primary"
          >
            新增标签
          </Button>,
        ]}
        scroll={{ x: 1000 }}
      />
      <LabelModal
        labelShow={labelShow}
        row={row}
        refreshList={refreshList}
        setRow={setRow}
        setLabelShow={setLabelShow}
      />
    </div>
  );
};
export default LabelManagement;
