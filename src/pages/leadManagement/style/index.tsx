import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@poizon-design/pro-table';
import { ProTable, TableDropdown } from '@poizon-design/pro-table';
import { Button, Checkbox,Input, Modal, Form,Select, message, Space, Tag} from 'poizon-design';
import { useRef, useState ,useEffect} from 'react';
import {Item1,ReturnItem,optionItem} from './service/interface'
import { validateInput, validateInput2} from './utils';
import { addnewItem, deleteItem, editItem, fetchData, fetchTitle } from './service';



const columns: ProColumns<Item1>[] = [
  {
    dataIndex: 'id',
    title:'序号',
    valueType: 'indexBorder',
    width: 60,
    readonly:true,
    editable:false
  },
  {
    title: '一级类目',
    dataIndex: 'categoryName',
    ellipsis: true,
    editable:false
  },
  {
    disable: true,
    title: '风格',
    dataIndex: 'categoryStyleName',
    // copyable: true,
    ellipsis: true,
    tip: '过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required:true,
          validator: validateInput2,
          
        },
      ],
    },
    // render:(text,record)=>{
    //   if (!text) return '--'
    //   const styleList = record.categoryStyleName// ?.join(',').toString()
      // return (
      //   styleList?.map((item: string) => 
      //     <Space key={item}>
      //       <Tag>{item || '--'}</Tag>
      //     </Space>
      //   )
      // )
    // }
  },
  {
    disable: true,
    title: '更新人姓名',
    dataIndex: 'categoryOperator',
    hideInSearch:true,
    readonly:true,
    editable:false
  },
  {
    title: '更新时间',
    key: 'modifyTime',
    dataIndex: 'modifyTime',
    valueType: 'dateTime',
    hideInSearch: true,
    readonly:true,
    editable:false
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    width:'150px',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log('click',record)
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef =useRef(null)
  const [options,setoptions]=useState<optionItem[]>([])
  const [visiabel,setVisiable]=useState(false)
  const [visiabel2,setVisiable2]=useState(false)
  const [selectedRecord,setSelectedRecord]=useState(null)
  const [pagenum,setpagenum]=useState(10)
  const{Option}=Select
 

  
  const showModal = () => {
    setVisiable(true);
   
  };
  const showModal2 = () => {
    setVisiable2(true);
   
  };

  
  const onFinish = async(values: any) => {
   await addnewItem(values)
    setVisiable(false)
    actionRef.current?.reload()
  };

  const onFinishFailed = (errorInfo: any) => {
    alert('添加信息失败!');
    setVisiable(false)
  };
  const cancelEditable=()=>{
    setVisiable(false)
  }
  const cancelEditable2=()=>{
    setVisiable(false)
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
      request={(params={page:1,pageSize:pagenum,categoryName:'',categoryStyleName:['']},sort,filter)=>{
        return fetchData(params)
      }
      }
  
      editable={{
        type: 'multiple',
        
        onSave:(key,row,originRow)=>(editItem({id:row.id,categoryName:row.categoryName,categoryStyleName:row.categoryStyleName})),
        onDelete:(key,row)=>(deleteItem({id:row.id}))
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
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
        onChange: (page) => (setpagenum(page)),
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
                name="categoryName"
                rules={[{ required: true, message: '请选择一级类目名称' }]}
              >
                <Select>
          {options?.map(option => (
            <Option key={option.id} value={option.name}>{option.name}</Option>
          ))}
        </Select>

              </Form.Item>

              <Form.Item
                label="风格"
                name="categoryStyleName"
                rules={[
                  { required: true },
                  { validator: validateInput2 } // 自定义校验规则
                ]}
              >
                <Input />
              </Form.Item>

                <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                      <Button type="primary" htmlType="submit" >
                        提交
                      </Button>
                      <Button onClick={cancelEditable}> 取消</Button>
                    </Form.Item>
                        </Form>
                  
                        </Modal>

   </>
  );
};