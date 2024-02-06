import { ProDescriptionsItemProps } from '@poizon-design/pro-descriptions';
import { Popover, Space, Tag } from 'poizon-design';
import { useMemo } from 'react';
import { isArray } from 'lodash';
import { statusColor, timeoutColor } from '@/pages/leadManagement/publicSea/contant';
import { CustomerSeaResponse } from '@/entities/publicSea/interface/detail';
import { TimeoutModeEnum, statusColorFn } from '../../config';
import { StatusEnum } from '../../contant';

interface InProps {
  data: CustomerSeaResponse;
}

const useBasicsColumns = ({ data = {} }: InProps) => {
  const columns = useMemo<ProDescriptionsItemProps[]>(() => {
    return [
      {
        title: '线索ID',
        dataIndex: 'leadsId',
        span: 3,
        render(_, record) {
          if (!record.leadsId) return '-';
          return (
            <div style={{ display: 'flex' }}>
              <span style={{ flex: 'none', marginRight: 8 }}>{record.leadsId}</span>
              <Space wrap size={8}>
                {record.statusName && (
                  <Tag color={statusColor[record.status] || ''}>{record.statusName}</Tag>
                )}
                {record.hitTagDesc && <Tag>{record.hitTagDesc}</Tag>}
                {record.entryWillingDesc && <Tag>{record.entryWillingDesc}</Tag>}
                {record.sourceName && <Tag>{record.sourceName}</Tag>}
                {record.leadsTypeName && <Tag>{record.leadsTypeName}</Tag>} 
              </Space>
            </div>
          );
        },
      },
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '主营类目',
        dataIndex: 'mainCategory',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '资质类型',
        dataIndex: 'qualificationTypeDesc',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '标签',
        dataIndex: 'labelNames',
        render(_, record) {
          if (!isArray(record.labelNames) || !record.labelNames.length) {
            return '-';
          }
          if (record.labelNames.length > 2) {
            return (
              <Popover
                trigger={'click'}
                content={() => {
                  return record.labelNames.map((item: string) => (
                    <Space key={item} direction="horizontal" className="popover-space">
                      <Tag>{item}</Tag>
                    </Space>
                  ));
                }}
              >
                <a>查看全部</a>
              </Popover>
            );
          }
          return record.labelNames.slice(0, 2).map((v) => {
            return <Tag key={v}>{v}</Tag>;
          });
        },
      },
      {
        title: '跟进人',
        dataIndex: 'developer',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '投放渠道',
        dataIndex: 'planChannelDesc',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '投放终端',
        dataIndex: 'planEnd',
        ellipsis: true,
        contentStyle: {
          maxWidth: 140,
        },
      },
      {
        title: '需求ID',
        dataIndex: 'targetId',
        ellipsis: true,
        render(_, record) {
          return record.targetId === -1 ? '-' : record.targetId;
        },
      },
      {
        title: '活动ID',
        dataIndex: 'invitationActivityId',
        ellipsis: true,
        render(_, record) {
          return record.invitationActivityId === -1 ? '-' : record.invitationActivityId;
        },
      },
      {
        title: '活动邀请码',
        dataIndex: 'invitationCode',
        ellipsis: true,
      },
      {
        title: '洽谈失败原因',
        dataIndex: 'feedbackTalkFail',
        ellipsis: true,
        hideInDescriptions: data?.status !== StatusEnum.洽谈失败,
        contentStyle: {
          maxWidth: 110,
        },
      },
      {
        title: '洽谈失败补充描述',
        dataIndex: 'feedbackTalkFailDesc',
        span: 3,
        ellipsis: true,
        hideInDescriptions: data?.status !== StatusEnum.洽谈失败,
      },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record) => {
          if (!record.leftProcessTime) return [];
          return [
            <div>
              {Boolean(record.timeoutDesc) && (
                <Tag color={timeoutColor[record.timeout as 1 | 2]}>
                  {record.timeoutDesc}
                </Tag>
              )}
              剩余处理时效 {record.leftProcessTimeDesc}
            </div>,
          ];
        },
      },
      {
        title: '服务商名称',
        dataIndex: 'serviceProvider',
        span: 3,
        ellipsis: true,
      },
      {
        title: '创建人名称',
        dataIndex: 'creator',
        span: 3,
        ellipsis: true,
      },
    ];
  }, [data]);
  return columns;
};

export default useBasicsColumns;
