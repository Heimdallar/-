import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { fetchLabelList } from './service';
import { LabelItem, EditLabelItem } from './interface';
import { useColumns } from './column';
import { Button } from 'poizon-design';
import LabelModal from './labelModal';
import { PlusLine } from '@poizon-design/icons';
import { default20PagiSetting, defaultPagiSetting } from '@/config';

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
<>
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
          setPageInfo({  defaultPagiSetting
             });
        }}
        search = {{
          labelWidth: 'auto',
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
</>
  );
};
export default LabelManagement;
