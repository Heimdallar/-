import React, { useMemo } from 'react';
import { ProFormInstance } from '@poizon-design/pro-form';
import moment from 'moment';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import fetchPrivateSeaGetFeedbackTalkFailsService from '@/services/publicSea/getFeedbackTalkFails';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import { HitTagOptions, TimeoutOptions, planEndOptions } from './contant';
import {
  priorityOptions,
  sourceOptions,
  statusOptions,
  tabsSettingOpt,
  FollowProgressOptions,
} from './config';
import { queryLabelList, getObtainChannels } from './api';
import { transBrandName } from './util';

interface InProps {
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;
  showFoloowUp?: boolean;
}

const useSearchColumns = ({ formRef, showFoloowUp }: InProps) => {
  return [
    {
      title: '线索ID',
      dataIndex: 'leadsIds',
      key: 'leadsIds',
      fixed: 'left',
      valueType: 'input',
      fieldProps: {
        controls: false,
        placeholder: '请输入线索ID，多个线索ID使用中文逗号分隔，最多可输入100个',
      },
      search: {
        transform: (value) => {
          if (!value) return;
          const regex = /[,，]/;
          const idList = value
            .split(regex)
            .filter((item) => item !== '' && typeof Number(item) === 'number')
            .map((item) => Number(item));
          return {
            leadsIds: idList,
          };
        },
      },
      hideInTable: true,
    },
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
      fieldProps: {
        placeholder: '多个品牌名称使用中文逗号分隔，最多可输入20个',
      },
      search: {
        transform: (value) => {
          const nameList = transBrandName(value);
          const { brandName, ...rest } = formRef?.current?.getFieldsValue();
          if (nameList.length === 20) {
            const values = { ...rest, brandName: nameList.join('，') };
            formRef?.current?.setFieldsValue(values);
          }
          return {
            brandNameList: nameList,
          };
        },
      },
      hideInTable: true,
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
        return <CategorySelect isIdValue />;
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
    },
    {
      title: '跟进人',
      dataIndex: 'developer',
      key: 'developer',
      fieldProps: {
        placeholder: '请输入跟进人',
      },
      hideInTable: true,
      renderFormItem() {
        return (
          <UserSelect
            placeholder="请输入跟进人名字(拼音)搜索"
            showSearch
            allowClear
            dynamicLoad
            isShowOutwardCallRobot
          />
        );
      },
    },
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
        transform: (value) => {
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
      valueType: 'cascader',
      dataIndex: 'feedbackTalkFail',
      request: async () => (await fetchPrivateSeaGetFeedbackTalkFailsService()).data || [],
      hideInTable: true,
      fieldProps: {
        placeholder: '全部',
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
      valueType: 'cascader',
      request: async () => {
        const res = await getObtainChannels();
        return res || [];
      },
      search: {
        transform: (value) => {
          const list = value?.map((item) => {
            return item.join('.');
          });
          return {
            planChannels: list,
          };
        },
      },
      fieldProps: {
        multiple: true,
        showCheckedStrategy: 'SHOW_CHILD',
        fieldNames: {
          label: 'channelName',
          value: 'channelCode',
          children: 'subChannels',
        },
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
        transform: (value) => {
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
      hideInSearch: !showFoloowUp,
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
        transform: (value) => {
          if (!value) return {};
          return {
            modifyTimeStart: Number(moment(value[0]).valueOf()),
            modifyTimeEnd: Number(moment(value[1]).valueOf()),
          };
        },
      },
    },
  ];
};

export default useSearchColumns;
