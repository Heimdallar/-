import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@poizon-design/pro-table';
import { ProTable, TableDropdown } from '@poizon-design/pro-table';
import { Button, Checkbox,Input, Modal, Form,Select} from 'poizon-design';
import { useRef, useState ,useEffect} from 'react';
import {Item1,ReturnItem} from './service/interface'
import { validateInput } from './utils';
import { addnewitem, deleteitem, edititem, fetchData, fetchTitle } from './service';

const columns: ProColumns<Item1>[] = [
  {
    dataIndex: 'index',
    title:'序号',
    valueType: 'indexBorder',
    width: 60,
  },
  {
    title: '一级类目',
    dataIndex: 'categoryCreator',
    // copyable: true,
    ellipsis: true,
  },
  {
    disable: true,
    title: '风格',
    dataIndex: 'categoryStyleName',
    // copyable: true,
    ellipsis: true,
    tip: '过长会自动收缩',
    
  },
  {
    disable: true,
    title: '更新人姓名',
    dataIndex: 'categoryOperator',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
  },
  {
    title: '更新时间',
    key: 'showTime',
    dataIndex: 'modifyTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
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
      <a key='delete' onClick={()=>{
        action?.cancelEditable
      }}>取消</a>
    ],
  
  },
];



export default () => {
  const actionRef = useRef<ActionType>();
  const [options,setoptions]=useState([])
  const [visiabel,setvisiable]=useState(false)
  const{Option}=Select
 
  const showModal = () => {
    setvisiable(true);
  };
  

  
  const onFinish = (values: any) => {
    console.log('onfinish')
    addnewitem(values)
    setvisiable(false)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    setvisiable(false)
  };
  const cancelEditable=()=>{
    setvisiable(false)
  }
  useEffect(  ()=>{
    const fetchData = async () => {
      const data = await fetchTitle();
      setoptions(data);
    };
  
    fetchData();
  }, []); // 空数组表示只在组件挂载时请求一次数据
 

  return (
    <>
    <ProTable<Item1>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params={},sort,filter)=>{
        return fetchData(params)
      }
      }
  
      editable={{
        type: 'multiple',
        onSave:(key,row,originRow)=>(edititem(row)),
        onDelete:(key,row)=>(deleteitem(row))
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
      options={false}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
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
         <Modal title="新增类目风格" visible={visiabel}  	footer={null} onCancel={cancelEditable}>
         <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"

              >
              <Form.Item
                label="类目名称"
                name="categoryCreator"
              >
                <Select>
          {options.map(option => (
            <Option key={option.id} value={option.name}>{option.name}</Option>
          ))}
        </Select>

              </Form.Item>

              <Form.Item
                label="风格"
                name="categoryStyleName"
                rules={[
                  { required: true },
                  { validator: validateInput } // 自定义校验规则
                ]}
              >
                <Input />
              </Form.Item>

                <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        提交
                      </Button>
                      <Button onClick={cancelEditable}> 取消</Button>
                    </Form.Item>
                        </Form>
                  
                        </Modal>
         
   </>
  );
};