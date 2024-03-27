import CategorySelect from "@/components/ProSelect/business/CategorySelect";
import { ProColumns } from "@poizon-design/pro-table";
import { Space, Tag } from "poizon-design";
import { timeoutColor, statusOptions } from "../../interface";
import { LabelDisplay } from "../display";

export const columns:ProColumns[]=[
    {
        title: '线索ID',
        dataIndex: 'leadsIds',
        key: 'leadsIds',
        fixed: 'left',
        render(_, record) {
          // console.log(record,'exist',record.timeoutDesc)
          return (
            <Space size={1}>
              {record.timeoutDesc && (
                <Tag color={timeoutColor[record.timeout as '1'|'2'|'3']}>
                  {record.timeoutDesc}
                </Tag>
              )}{' '}
              {record.leadsId}
            </Space>
          );
  
        },
        
      },
      {
        title: '品牌名称',
        dataIndex: 'brandInfo',
        key: 'brandInfo',
      },
      {
        title: '标签',
        dataIndex: 'labelNames',
        key: 'labelNames',
        render(_, record) {
          return <LabelDisplay record={record} />;
        },
       
      },
      {
        title: '主营类目',
        dataIndex: 'mainCategoryId',
        key: 'mainCategoryId',
      },
      {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
        hideInTable: true,
        fieldProps: {
          placeholder: '请输入企业名称',
          maxLength: 50,
        },
        render(_, record) {
          return (
            <div>
              {record.entryStatusDesc && <Tag color="green">{record.entryStatusDesc}</Tag>}{' '}
              {record.enterpriseName}
            </div>
          );
        },
  
      },
      {
        title: '需求ID',
        dataIndex: 'targetId',
        key: 'targetId',
      },
      {
        title: '品牌类型',
        dataIndex: 'brandType',
        key: 'brandType',
      }
  
]
export const outcolumns:ProColumns[]=[
    {
        title: '经营平台',
        dataIndex: 'storeChannel',
        key: 'storeChannel',
      },
      {
        title: '店铺名称',
        dataIndex: 'storeName',
        key: 'storeName',
      },
      {
        title: '店铺链接',
        dataIndex: 'storeUrl',
        key: 'storeUrl',
      },
      {
        title: '月销售额',
        dataIndex: 'recentThirtyTurnover',
        key: 'recentThirtyTurnover',
      },
      {
        title: '粉丝数',
        dataIndex: 'fansNum',
        key: 'fansNum',
      },
]
export const contactcolumns:ProColumns[]=[
    {
        title: '联系人姓名',
        dataIndex: 'contactName',
        key: 'contactName',
      },
      {
        title: '电话号码',
        dataIndex: 'contactMobileNumber',
        key: 'contactMobileNumber',
      },
      {
        title: '微信号码',
        dataIndex: 'contactWechat',
        key: 'contactWechat',
      },
]
export const entercolumns:ProColumns[]=[
    {
        title: '入驻进度',
        dataIndex: 'entryWilling',
        key: 'entryWilling',
      },
      {
        title: '入驻公司名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
      },
      {
        title: '入驻ID',
        dataIndex: 'leadsIds',
        key: 'leadsIds',
      },
      
]