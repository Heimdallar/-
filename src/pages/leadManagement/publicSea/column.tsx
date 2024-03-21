import { ProColumns } from "@poizon-design/pro-table";
import { Space, Tag, Row, Button } from "poizon-design";
import { IListItem } from "./interface";

export const columns:ProColumns<IListItem>[]=
[
  {
      title: '招商ID',
      dataIndex: 'leadsId',
      key: 'leadsId',
      fixed: 'left',
      width:120,
      render(_: any, record) {
        return (
          <Space size={1}>
              <Tag >
                11451
              </Tag>
          </Space>
        );
      },
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      key: 'enterpriseName',
      render(_: any,render) {
        return (
          <div>
              企业名称
          </div>
        );
      },
    
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'statusList',
      render(_: any, record: any) {
        return <a>status</a>;
      },
      hideInSearch: true,
    },

    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
      hideInSearch: true,

    },
    {
      title: '主营类目',
      dataIndex: 'mainCategory',
      hideInSearch: true,

    },
    {
      title: '剩余处理时效',
      dataIndex: 'leftProcessTimeDesc',
      key: 'leftProcessTimeDesc',

      hideInSearch: true,
    
      render(_: any, record) {
        return <a>time</a>
      },
    },
    {
      title: '招商记录类型',
      dataIndex: 'leadsTypeDesc',
      key: 'leadsType',
      hideInSearch: true,
     
    },
    {
      title: '标签',
      dataIndex: 'labelNames',
      key: 'labelIds',
      render(_: any, record: any) {
        return <span>label</span>;
      },
      hideInSearch: true,
     
    },
    {
      title: '命中标识',
      dataIndex: 'hitTagDesc',
      hideInSearch: true,
    
    },
    {
      title: '信息来源',
      dataIndex: 'source',
      key: 'source',
      render(_: any, record: { source: number; }) {
        const sourceObj = {
          label:'nosign',
          source:'阿美莉卡'
        }
        // 兼容：新增和编辑时，若信息来源未填，保存时会传-1，这里展示需要处理一下
        if (record.source === -1) return '-';
        return sourceObj.label || record.source;
      },
      hideInSearch: true,
    
    },
    {
      title: '跟进人',
      dataIndex: 'followerName',
      key: 'developer',
      hideInSearch: true,
    
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '更新时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      hideInSearch: true,
      fixed: 'right',
      width:120,
    
      render(_: any, record: any) {
        return <Button>操作</Button>;
      },
    },
]


