import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@poizon-design/pro-table';
import { ProTable, TableDropdown } from '@poizon-design/pro-table';
import { Button, Checkbox,Input, Modal, Form,Select, message, Space, Tag} from 'poizon-design';
import { useRef, useState ,useEffect} from 'react';
import {Item1,ReturnItem,optionItem} from './service/interface'
import { validateInput, validateInput2} from './utils';
import { addnewItem, deleteItem, editItem, fetchData, fetchTitle } from './service';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import { FormInstance } from 'poizon-design/es/form/Form';
import { defaultPagiSetting } from '@/config';

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
    editable:false,
    renderFormItem: (item,{type,defaultRender,...rest},form)=>{
      return <CategorySelect placeholder={''} {...rest}></CategorySelect>
    },

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
    render:(text,record)=>{
      if ( !Array.isArray(record.categoryStyleName)) return record.categoryStyleName
      else{
      const styleList = record?.categoryStyleName.join(',')
      return (
  
          <span>{styleList}</span>
        )
      
      }
    }
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
  // const formRef =useRef<FormInstance>()
  const [form ]=Form.useForm<FormInstance>()
  const [options,setoptions]=useState<optionItem[]>([])
  const [visiabel,setVisiable]=useState(false)
  const [visiabel2,setVisiable2]=useState(false)
  const [selectedRecord,setSelectedRecord]=useState()
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);
  const [page,setcurrent]=useState(1)
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
      form={form}
      cardBordered
      
      request={(params={},sort,filter)=>{
        const { current, pageSize } = params;
        const reqParmas = {
          page: current,
          pageSize,
      };
        return  fetchData(reqParmas)
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
        optionRender: (searchConfig, formProps, dom) => [
          dom[0],
          <Button
          type='primary'
            key="out"
            onClick={async (params) => {
              const values = searchConfig?.form?.getFieldsValue();
              // console.log(values);
              const newvalue=await fetchData({...values})
              setSelectedRecord(newvalue?.data)
            }}
          >
              查询
          </Button>,
          
        ],
      }}
      pagination={{
        pageSize: 10,
      }}
      dataSource={selectedRecord}
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
      onPaginationChange={async(current, pageSize) => {
        // 处理用户修改分页时的逻辑
        console.log('Current page:', current);
        console.log('Page size:', pageSize);
        // 可以在这里重新请求数据
        const newvalue=await fetchData({page:current,pageSize:pageSize})
        setSelectedRecord(newvalue?.data)
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
          {Array.isArray(options)  && options?.map(option => (
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