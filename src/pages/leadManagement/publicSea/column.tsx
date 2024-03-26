import { ProColumns } from "@poizon-design/pro-table";
import { Space, Tag, Row, Button } from "poizon-design";
import { HitTagOptions, IListItem, TimeoutOptions, failedOptions, planEndOptions } from "./interface";
import moment from 'moment';
import { timeoutColor } from './interface';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import {
  priorityOptions,
  sourceOptions,
  statusOptions,
  tabsSettingOpt,
  FollowProgressOptions,
} from './interface';
import { queryLabelList, getObtainChannels } from './service';
import { StatusDisplay, LabelDisplay } from "./components/display";
import Operate from "./components/operate";
export const columns:ProColumns[]=
[
  
    {
      title: '线索ID',
      dataIndex: 'leadsIds',
      key: 'leadsIds',
      fixed: 'left',
      fieldProps: {
        controls: false,
        placeholder: '请输入线索ID,多个线索ID使用逗号分隔,最多可输入100个',
      },
      // search: {
      //   transform: (value:any) => {
      //     if (!value) return;
      //     const regex = /[,，]/;
      //     const idList = value
      //       .split(regex)
      //       .filter((item:any) => item !== '' && typeof Number(item) === 'number')
      //       .map((item:any) => Number(item));
      //     return {
      //       leadsIds: idList,
      //     };
      //   },
      // },
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
      // hideInTable: true,
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
      fieldProps: {
        placeholder: '多个品牌名称使用逗号分隔,最多可输入20个',
      },
      // search: {
      //   transform: (value) => {
      //     const nameList = transBrandName(value);
      //     const { brandName, ...rest } = formRef?.current?.getFieldsValue();
      //     if (nameList.length === 20) {
      //       const values = { ...rest, brandName: nameList.join('，') };
      //       formRef?.current?.setFieldsValue(values);
      //     }
      //     return {
      //       brandNameList: nameList,
      //     };
      //   },
      // },
    },
    {
      title: '状态',
      dataIndex: 'statusList',
      key: 'statusList',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        showSearch: true,
        allowClear: true,
        placeholder: '全部',
        options: statusOptions,
      },
      hideInTable: true,

    },
    {
      title: '主营类目',
      dataIndex: 'mainCategoryId',
      key: 'mainCategoryId',
      renderFormItem: () => {
        return <CategorySelect placeholder={""}  />;
      },
      fieldProps: {
        placeholder: '全部',
      },
      hideInTable: true,
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
    // {
    //   title: '跟进人',
    //   dataIndex: 'developer',
    //   key: 'developer',
    //   fieldProps: {
    //     placeholder: '请输入跟进人',
    //   },
    //   hideInTable: true,
    //   renderFormItem() {
    //     return (
    //       <UserSelect
    //         placeholder="请输入跟进人名字(拼音)搜索"
    //         showSearch
    //         allowClear
    //         dynamicLoad
    //         isShowOutwardCallRobot
    //       />
    //     );
    //   },
    // },
    {
      title: '需求ID',
      dataIndex: 'targetId',
      key: 'targetId',
      hideInTable: true,
      valueType: 'money',
      fieldProps: {
        min: 0,
        maxLength: 15,
        moneySymbol: false,
        placeholder: '请输入需求ID',
        controls: false,
      },
    },

    {
      title: '命中标识',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: HitTagOptions,
      },
      search: {
        transform: (value:any) => {
          return {
            hitTags: value,
          };
        },
      },
      dataIndex: 'hitTags',
      hideInTable: true,
    },
    {
      title: '洽谈失败原因',
      valueType: 'select',
      dataIndex: 'feedbackTalkFail',
      hideInTable: true,
      fieldProps: {
        placeholder: '请选择',
        options:failedOptions
      },
    },
    {
      title: '标签',
      dataIndex: 'labelNames',
      key: 'labelIds',
      valueType: 'select',
      request: async () => {
        const ret: any = await queryLabelList({});
        const res = ret?.map((item: any) => ({
          label: item.title,
          value: item.value,
        }));
        return res || [];
      },
      fieldProps: {
        mode: 'multiple',
        placeholder: '全部',
      },
      hideInTable: true,
    },
    {
      title: '线索类型',
      dataIndex: 'leadsType',
      key: 'leadsType',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        allowClear: true,
        defaultValue: 0,
        placeholder: '全部',
        options: tabsSettingOpt,
      },
      hideInTable: true,
    },
    {
      title: '线索来源',
      dataIndex: 'source',
      key: 'source',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        allowClear: true,
        placeholder: '全部',
        options: sourceOptions,
      },
      hideInTable: true,
    },
    {
      title: '投放终端',
      dataIndex: 'planEnds',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: planEndOptions,
      },
      hideInTable: true,
    },
    {
      title: '活动ID',
      dataIndex: 'invitationActivityId',
      key: 'invitationActivityId',
      ellipsis: true,
      fieldProps: {
        controls: false,
        showCount: true,
        maxLength: 19,
      },
      formItemProps: {
        rules: [
          {
            message: '请输入数字',
            pattern: /^[0-9]+$/,
          },
        ],
      },
      hideInTable: true,
    },
    {
      title: '投放渠道',
      dataIndex: 'planChannels',
      valueType: 'select',
      fieldProps: {
        placeholder: '全部',
        options: planEndOptions,
      },
      hideInTable: true,
    },
    {
      title: '超时状态',
      dataIndex: 'timeout',
      valueType: 'select',
      hideInTable: true,
      fieldProps: {
        placeholder: '全部',
        options: TimeoutOptions,
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      valueType: 'select',
      fieldProps: {
        placeholder: '全部',
        options: priorityOptions,
      },
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
      fieldProps: {
        placeholder: ['开始日期', '结束日期'],
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      search: {
        transform: (value:any) => {
          if (!value) return {};
          return {
            createTimeStart: Number(moment(value[0]).valueOf()),
            createTimeEnd: Number(moment(value[1]).valueOf()),
          };
        },
      },
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      fieldProps: {
        placeholder: '请输入创建人',
      },
      hideInTable: true,
    },
    {
      title: '服务商ID',
      dataIndex: 'serviceProviderId',
      key: 'serviceProviderId',
      valueType: 'money',
      fieldProps: {
        placeholder: '请输入服务商ID',
        maxLength: 15,
        min: 0,
        moneySymbol: false,
        controls: false,
      },
      hideInTable: true,
    },
    {
      title: '跟进进度',
      dataIndex: 'personalInfoType',
      key: 'personalInfoType',
      valueType: 'select',
      fieldProps: {
        placeholder: '全部',
        options: FollowProgressOptions,
        defaultValue: '',
      },
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'modifyTime',
      valueType: 'dateRange',
      hideInTable: true,
      fieldProps: {
        placeholder: ['开始日期', '结束日期'],
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
      search: {
        transform: (value:any) => {
          if (!value) return {};
          return {
            modifyTimeStart: Number(moment(value[0]).valueOf()),
            modifyTimeEnd: Number(moment(value[1]).valueOf()),
          };
        },
      },
    },
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
                {record.leadsId}
              </Tag>
          </Space>
        );
      },
    },
    {
      title: '企业名称',
      dataIndex: 'enterpriseName',
      key: 'enterpriseName',
      hideInSearch:true,
      render(_: any,render) {
        return (
          <div>{render.enterpriseName}</div>
        );
      },
    
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'statusList',
      render(_, record) {
        return <StatusDisplay record={record} />;
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
    
      render(_, record) {
        return record.leftProcessTimeDesc && <Tag color="red">{record.leftProcessTimeDesc}</Tag>;
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
      render(_, record) {
        return <LabelDisplay record={record} />;
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
      render(_, record) {
        const sourceObj = sourceOptions.find((item) => item.value === record.source) || {
          label: '',
          value: 0,
        };

        // 兼容：新增和编辑时，若信息来源未填，保存时会传-1，这里展示需要处理一下
        if (record.source === -1) return '-';
        return sourceObj.label || record.source;
      },
      hideInSearch: true,
    
    },
    // {
    //   title: '跟进人',
    //   dataIndex: 'followerName',
    //   key: 'developer',
    //   hideInSearch: true,
    
    // },
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
      title: (
        <Row justify="space-between" align="middle">
          操作
        </Row>
      ),
      dataIndex: 'operate',
      width: 220,
      hideInSearch: true,
      fixed: 'right',
      key: 'settings',
      render(_, record) {
        return <Operate record={record} buttonType="link"></Operate>;
      },
    },]


