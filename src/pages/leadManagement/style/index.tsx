import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@poizon-design/pro-components';
import { ProTable, TableDropdown } from '@poizon-design/pro-components';
import { Button, Checkbox,Input, Modal, Form} from 'poizon-design';
import { useRef, useState } from 'react';
import request from 'umi-request';
import {Item1,ReturnItem} from './service/interface'
import { getMockTableList } from './service/mock';
import Addnew from './Addnew';
const columns: ProColumns<Item1>[] = [
  {
    dataIndex: 'index',
    title:'序号',
    valueType: 'indexBorder',
    width: 60,
  },
  {
    title: '一级类目',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
  },
  {
    disable: true,
    title: '风格',
    dataIndex: 'style',
    copyable: true,
    ellipsis: true,
    tip: '过长会自动收缩',
    
  },
  {
    disable: true,
    title: '更新人姓名',
    dataIndex: 'name',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
  },
  {
    title: '更新时间',
    key: 'showTime',
    dataIndex: 'updated_at',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a   key="delete" onClick={()=>{
        action?.reset
      }}>
        删除
      </a>,
     
    ],
  },
];
const tableListDataSource: ReturnItem[] = [];
for (let i = 0; i < 100; i += 1) {
  tableListDataSource.push({
    total:100,
    id: i,
   name: 'AppName',
    title: 'xxj',
    url: 'addwas',
    updated_at: Date.now() - Math.floor(Math.random() * 100000),
    created_at: Date.now() - Math.floor(Math.random() * 100000),
    style: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
  });
}




export default () => {
  const actionRef = useRef<ActionType>();
  const [visiabel,setvisiable]=useState(false)
 
  const showModal = () => {
    setvisiable(true);
  };
  const handleOk = () => {
    setvisiable(false);
  };

  const handleCancel = () => {
    setvisiable(false);
  };
 

  return (
    <>
    <ProTable<Item1>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        // console.log(sort, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
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
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="类目风格配置"
      toolBarRender={() => [
        <Button key="button" onClick={showModal} icon={<PlusOutlined rev={undefined} />} type="primary">
          新建
        </Button>,
        
      ]}
    />
         <Modal title="新增类目风格" visible={visiabel} onOk={handleOk} onCancel={handleCancel}>
            <Addnew></Addnew>
          </Modal>
         
   </>
  );
};