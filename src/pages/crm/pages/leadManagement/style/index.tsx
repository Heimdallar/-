import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { fetchCategoryStyleList } from './api/index';
import { StyleItem } from './interface';
import { useColumns } from './useColumns';
import { Button } from 'poizon-design';
import StyleModal from './components/styleModal';
import { default20PagiSetting } from '@/config';

const CategoryStyle: React.FC<any> = () => {
  const [styleShow, setStyleShow] = useState(false)
  const [row, setRow] = useState<StyleItem>()
  const actionRef = useRef<ActionType>();
  const [pageInfo, setPageInfo] = useState(default20PagiSetting);

  const refreshList = () => {
    actionRef.current?.reload()
  }

  const columns = useColumns(setRow, setStyleShow);

  return (
    <div data-trackid="6c7cd7d596092dbc-urEMkx">
      <ProTable<StyleItem>
        columns={columns}
        tableAlertRender={false}
        actionRef={actionRef}
        request={async (params = {}) => {
          const { current, ...rest} = params
          const resp: any = await fetchCategoryStyleList({
            ...rest,
            page: current,
          });
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.datas || [],
            total: resp.total,
          };
        }}
        rowKey="categoryName"
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...default20PagiSetting, ...rest });
        }}
        search = {{
          labelWidth: 'auto'
        }}
        headerTitle='配置列表'
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setStyleShow(true)
            }}
            key='export'
            type='primary'>
            新增配置
          </Button>,
        ]}
        scroll={{ x: 1500 }}
      />
      <StyleModal
        styleShow={styleShow}
        row={row}
        refreshList={refreshList}
        setRow={setRow}
        setStyleShow={setStyleShow}
      />
    </div>
  );
};
export default CategoryStyle;
