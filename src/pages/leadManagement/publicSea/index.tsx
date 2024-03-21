import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@poizon-design/pro-table';
import { ProTable, TableDropdown } from '@poizon-design/pro-table';
import { Button, Dropdown, Menu, Space, Tag } from 'poizon-design';
import { useRef } from 'react';
import request from 'umi-request';
import { columns } from './column';
import { IListItem } from './interface';

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<IListItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered

      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined rev={undefined} />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" >
          <Button>
            <EllipsisOutlined rev={undefined} />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};