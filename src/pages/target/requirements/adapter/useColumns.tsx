import { ProColumns } from '@poizon-design/pro-table';
import { useMemo } from 'react';
import { IUseColumns, RequireEditItem } from '../interface';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import { Button, Popconfirm, message } from 'poizon-design';
import { IRequirementItem } from '../api/interface';
import { PRIORITY_OPTIONS, REQUIREMENT_STATUS, REQ_STATUS_MAP } from '../config';
import { diasbleDateAfterNow, diasbleTimeAfterNow } from '../utils/date';
const useColumns = ({
  setRemarkModelVisible,
  setRemarkModelValue,
  setLogModelVisible,
  setLogLeadsId,
  setClueModelVisible,
  setClueUnchangeableValue,
  setClueLeadsId,
  setNewDemandModelVisible,
  setRow,
  handleLink,
}: IUseColumns) => {
  const columns = useMemo<ProColumns<IRequirementItem, 'text'>[]>(() => {
    return [
      {
        title: '需求ID',
        dataIndex: 'id',
        key: 'id',
        width: 120,
        fixed: 'left',
        ellipsis: true,
        order: 20,
        fieldProps: {
          placeholder: '请输入需求ID',
        },
        formItemProps: {
          rules: [
            {
              message: '请输入12位以内的数字',
              pattern: /^[0-9]{0,12}$/,
            },
          ],
        },
        render: (_, record) => {
          return record.id || '-';
        },
      },
      {
        title: '优先级',
        order: 5,
        dataIndex: 'priorityScore',
        key: 'priorityScore',
        valueType: 'select',
        width: 100,
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '全部',
          options: PRIORITY_OPTIONS,
        },
        render: (_, record) => {
          return record.priorityScoreDesc;
        },
      },
      {
        title: '需求品牌',
        width: 100,
        search: false,
        dataIndex: 'brandName',
        key: 'brandName',
      },
      {
        // 由于 PRD 要求搜索框的 label 展示的是 品牌名称，而不是需求品牌，所以要分离
        title: '品牌名称',
        width: 100,
        order: 15,
        dataIndex: `brandName_hid`,
        key: `brandName`,
        hideInTable: true,
      },
      {
        title: '需求类目',
        // search: false,
        dataIndex: 'mainCategory',
        key: 'mainCategoryId',
        hideInSearch: false,
        width: 100,
        renderFormItem: () => {
          return <CategorySelect labelInValue isIdValue />;
        },
      },
      {
        title: '资质要求',
        search: false,
        dataIndex: 'brandTypeDesc',
        key: 'brandTypeDesc',
        width: 100,
      },
      {
        title: '经营平台',
        search: false,
        dataIndex: 'storeChannelDesc',
        key: 'storeChannelDesc',
        width: 100,
      },
      {
        title: '店铺名称',
        search: false,
        dataIndex: 'storeName',
        key: 'storeName',
        width: 300,
        render: (_, record) => {
          return (
            <>
              <div>店铺名称：{record.storeName || '-'}</div>
              <div>店铺链接：{record.storeUrl || '-'}</div>
            </>
          );
        },
      },
      {
        title: '需求线索量',
        dataIndex: 'leadsRequireNumber',
        key: 'leadsRequireNumber',
        width: 120,
        search: false,
        valueType: 'digit',
        render: (_, record) => {
          return record.leadsRequireNumber || '-';
        },
      },
      {
        title: '企业名称',
        search: false,
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
        width: 100,
      },
      {
        title: '需求标签',
        search: false,
        dataIndex: 'targetLabelStr',
        width: 100,
        key: 'targetLabelStr',
        render: (_, record) => {
          return record.targetLabelStr || '-';
        },
      },
      {
        title: '已提交线索',
        search: false,
        dataIndex: 'submitLeadsNumber',
        key: 'submitLeadsNumber',
        width: 100,
      },
      {
        title: '状态',
        order: 10,
        dataIndex: 'status',
        valueType: 'select',
        key: 'status',
        width: 100,
        fieldProps: {
          showSearch: true,
          allowClear: true,
          placeholder: '全部',
          options: REQUIREMENT_STATUS,
        },
        render: (_, record) => {
          return record.statusDesc;
        },
      },
      {
        title: '需求对接人',
        dataIndex: 'targetOpName',
        key: 'targetOpName',
        order: 8,
        hideInSearch: true,
        width: 150,
      },
      {
        title: '创建时间段',
        dataIndex: 'rangeTime',
        key: 'rangeTime',
        hideInTable: true,
        order: 9,
        valueType: 'dateTimeRange',
        width: 400,
        fieldProps: {
          format: 'YYYY-MM-DD HH:mm:ss',
          showTime: { format: 'HH:mm:ss' },
          disabledDate: (current) => {
            return diasbleDateAfterNow(current);
          },
          disabledTime: (current: any) => {
            return diasbleTimeAfterNow(current);
          },
          style: {
            width: 375,
          },
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTimeStr',
        hideInSearch: true,
        order: 11,
        width: 200,
      },
      {
        title: '操作',
        dataIndex: 'operate',
        width: 250,
        hideInSearch: true,
        ellipsis: false,
        fixed: 'right',
        render(_, record) {
          const remark = (record as any).remark as string;
          return (
            <>
              {[
                REQ_STATUS_MAP['待处理'],
                REQ_STATUS_MAP['进行中'],
                REQ_STATUS_MAP['已完成'],
                REQ_STATUS_MAP['未开始'],
              ].includes(record.status) && (
                <Button type="link" size="small" onClick={() => handleLink(record.id)}>
                  作废
                </Button>
              )}
              {[REQ_STATUS_MAP['待处理']].includes(record.status) && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    const remark = record as RequireEditItem;
                    setNewDemandModelVisible(true);
                    setRow(remark);
                  }}
                >
                  编辑
                </Button>
              )}
              {record.canShowRemark && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    setRemarkModelVisible(true);
                    setRemarkModelValue(remark);
                  }}
                >
                  查看备注
                </Button>
              )}
              {record.canSubmitLeads && (
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    setClueLeadsId(record.id);
                    setClueModelVisible(true);
                    setClueUnchangeableValue({
                      brandInfo: record.brandName,
                      storeChannel: record.storeChannelDesc,
                      mainCategoryInfo: {
                        key: record.mainCategoryId,
                        label: record.mainCategory,
                        value: record.mainCategoryId,
                      },
                    });
                  }}
                >
                  提交线索
                </Button>
              )}
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setLogModelVisible(true);
                  setLogLeadsId(record.id);
                }}
              >
                查看日志
              </Button>
            </>
          );
        },
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
