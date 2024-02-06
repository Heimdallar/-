import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Popover, Row, Space, Tag } from 'poizon-design';
import SettingColumnsModal from '@/components/settingColumnsModal';
import useUserTableConfig from '@/hooks/useUserTableConfig';
import fetchClueCancelTopService from '@/services/privateSea/cancelTop';
import fetchClueSetTopService from '@/services/privateSea/setTop';
import { getPublicSeaClueDetail } from '../publicSea/api';
import { sourceOptions } from '../publicSea/config';
import StatusDisplay from '../publicSea/components/statusDisplay';
import useSearchColumns from '../publicSea/useSearchColumns';
import { IListItem } from './interface';
import { FromPage } from './contant';
import { timeoutColor } from '../publicSea/contant';

const hasTop = 1;
const useColumns = ({
  setBatchLeadId,
  setInitLabel,
  setLabelVisible,
  refreshList,
  setRow,
  setClueShow,
  formRef,
}: {
  setRow: React.Dispatch<React.SetStateAction<IListItem | undefined>>;
  setLabelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setInitLabel: React.Dispatch<React.SetStateAction<number[]>>;
  setBatchLeadId: React.Dispatch<React.SetStateAction<number>>;
  setClueShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;
}) => {
  const columns = useMemo<ProColumns<IListItem, 'text'>[]>(() => {
    let searchColumns = useSearchColumns({ formRef });
    searchColumns = searchColumns.filter(item => item.dataIndex !== 'feedbackTalkFail')
    return [
      ...searchColumns,
      {
        title: '线索ID',
        dataIndex: 'leadsId',
        width: 120,
        fixed: 'left',
        ellipsis: true,
        hideInSearch: true,
        columnKey: 'leads_id',
        render(_, record) {
          return (
            <Space size={1}>
              {Number(record.top) === hasTop && <Tag color="success">置顶</Tag>}
              {record.timeoutDesc && (
                <Tag color={timeoutColor[record.timeout as '1' | '2']}>
                  {record.timeoutDesc}
                </Tag>
              )}{' '}
              {record.leadsId}
            </Space>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        hideInSearch: true,
        ellipsis: true,
        width: 140,
        columnKey: 'status',
        render(_, record) {
          return <StatusDisplay record={record} />;
        },
      },
      {
        title: '品牌名称',
        dataIndex: 'brandName',
        ellipsis: true,
        width: 140,
        hideInSearch: true,
        columnKey: 'brand_name',
        render(_, record) {
          return (
            <>
              <div
                style={{
                  width: '140px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {record.brandName}
              </div>
            </>
          );
        },
      },
      {
        title: '主营类目',
        dataIndex: 'mainCategory',
        ellipsis: true,
        width: 100,
        hideInSearch: true,
        columnKey: 'main_category',
      },
      {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        key: 'enterpriseName',
        ellipsis: true,
        hideInSearch: true,
        width: 160,
        fieldProps: {
          placeholder: '请输入企业名称',
        },
        columnKey: 'enterprise',
        render(_, record) {
          let name = record.enterpriseName;
          if (record.enterpriseName && record.enterpriseName.length > 10) {
            name = `${record.enterpriseName?.substring(0, 9)}...`;
          }
          return (
            <div title={record.enterpriseName}>
              {record.entryStatusDesc && (
                <Tag color="green">
                  {record.entryStatusDesc}
                </Tag>
              )}{' '}
              {name}
            </div>
          );
        },
      },
      {
        title: '剩余处理时效',
        dataIndex: 'leftProcessTimeDesc',
        hideInSearch: true,
        width: 150,
        columnKey: 'left_process',
        render(_, record) {
          return record.leftProcessTimeDesc && <Tag color="red">{record.leftProcessTimeDesc}</Tag>;
        },
      },
      {
        title: '线索类型',
        dataIndex: 'leadsTypeDesc',
        hideInSearch: true,
        ellipsis: true,
        width: 100,
        columnKey: 'leads_type',
      },
      {
        title: '标签',
        dataIndex: 'labelNames',
        ellipsis: true,
        width: 220,
        hideInSearch: true,
        columnKey: 'label',
        render(_, record) {
          return (
            <>
              <div style={{ display: 'flex' }}>
                <Space direction="horizontal">
                  {record.labelNames &&
                    record.labelNames.slice(0, 2).map((item: any) => (
                      <Space key={item + Math.random()} direction="horizontal">
                        <Tag>{item}</Tag>
                      </Space>
                    ))}
                </Space>
                {record.labelNames && record.labelNames.length > 2 && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <Popover
                      trigger="click"
                      content={() =>
                        record.labelNames &&
                        record.labelNames.length > 2 &&
                        record.labelNames.map((item: any) => (
                          <Space key={item + Math.random()} direction="horizontal">
                            <Tag>{item}</Tag>
                          </Space>
                        ))
                      }
                    >
                      <Button type="link">查看全部</Button>
                    </Popover>
                  </div>
                )}
              </div>
            </>
          );
        },
      },
      {
        title: '命中标识',
        dataIndex: 'hitTag',
        hideInSearch: true,
        ellipsis: true,
        width: 100,
        columnKey: 'hit_tag',
        render: (_, record) => {
          return record.hitTagDesc;
        },
      },
      {
        title: '信息来源',
        dataIndex: 'source',
        hideInSearch: true,
        ellipsis: true,
        width: 120,
        columnKey: 'source',
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
      },
      {
        title: '跟进人',
        dataIndex: 'followerName',
        key: 'developer',
        ellipsis: true,
        hideInSearch: true,
        width: 100,
        columnKey: 'follower',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        ellipsis: true,
        key: 'createTime',
        hideInSearch: true,
        width: 180,
        columnKey: 'create_time',
        sorter: true,
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        hideInSearch: true,
        width: 180,
        columnKey: 'update_time',
        sorter: true,
      },
      {
        title: (
          <Row justify="space-between" align="middle">
            操作
            <SettingColumnsModal
              tableKey="merchant_customer_seas"
              onOk={(values) => setUserTableConfig(values)}
            />
          </Row>
        ),
        dataIndex: 'operate',
        ellipsis: true,
        width: 220,
        hideInSearch: true,
        fixed: 'right',
        columnKey: 'settings',
        render(_, record) {
          return (
            <>
              <div onClick={(e) => e.stopPropagation()}>
                {record.operates?.includes('置顶') && (
                  <Button
                    type="link"
                    size="small"
                    onClick={async () => {
                      const params = {
                        leadsId: record.leadsId,
                      };
                      const { data } =
                        Number(record.top) === 1
                          ? await fetchClueCancelTopService(params)
                          : await fetchClueSetTopService(params);
                      if (data) {
                        message.success(Number(record.top) === 1 ? '取消成功' : '置顶成功');
                      }
                      refreshList();
                    }}
                  >
                    {Number(record.top) === 1 ? '取消置顶' : '置顶'}
                  </Button>
                )}
                {record.operates?.includes('打标') && (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      setBatchLeadId(record.leadsId);
                      setInitLabel(record.labelIds);
                      setLabelVisible(true);
                    }}
                  >
                    打标
                  </Button>
                )}
                {record.operates?.includes('编辑') && (
                  <Button
                    type="link"
                    size="small"
                    onClick={async () => {
                      const {
                        customerSeaResponse = {},
                        outSidePlatformInfos = [],
                        leadsContactInfoResponseList = [],
                      } = await getPublicSeaClueDetail({
                        leadsId: record.leadsId,
                        fromPage: FromPage.私海,
                      });
                      const {
                        mainCategoryId,
                        mainCategory: mainCategoryName,
                        brandId,
                        brandName,
                        status,
                        statusName,
                        ...rest
                      } = customerSeaResponse;
                      const initialValues = {
                        ...rest,
                        leadsContactInfoRequestList: leadsContactInfoResponseList.length ? leadsContactInfoResponseList : [{}],
                        brandId,
                        brandName,
                        brandInfo: brandName,
                        mainCategoryInfo: {
                          key: mainCategoryId,
                          label: mainCategoryName,
                          value: mainCategoryId,
                        },
                        internetSaleInfos: outSidePlatformInfos.map((item) => {
                          return {
                            ...item,
                            storeName: item.shopName,
                            storeUrl: item.shopLink,
                            storeChannel: item.shopChannel,
                          };
                        }),
                      };
                      setRow(initialValues);
                      setClueShow(true);
                    }}
                  >
                    编辑
                  </Button>
                )}
              </div>
            </>
          );
        },
      },
    ];
  }, []);
  const [selectedColumns, setUserTableConfig] = useUserTableConfig({
    tableKey: 'merchant_customer_seas',
    columns,
  });
  return selectedColumns;
};

export { useColumns };
