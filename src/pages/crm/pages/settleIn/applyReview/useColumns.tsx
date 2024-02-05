import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Modal, Space, Tag } from 'poizon-design';
import { ApplyReviewInfo } from './interface';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteTicket, getBrandApplyCategoryList } from './api';
import { createSearchParams, useNavigate } from '@umijs/max';
import dayjs from 'dayjs';
import {
  BRAND_LAYER_SELFE_VALUATION_TYPES_MAP,
  BRAND_TYPES_MAP,
  QUALIFICATION_TYPE_MAP,
} from '../applyCommon/config';
import { getStatusTag, handleApprovalBatchReview } from './util';
import { resultOptions, splitResultOptions } from './config';
import { isEmpty } from 'lodash';

const useColumns = (
  activeKey: string,
  setCurApplyId: React.Dispatch<React.SetStateAction<number>>,
  setCurrentId: React.Dispatch<React.SetStateAction<number>>,
  setIsTable: React.Dispatch<React.SetStateAction<boolean>>,
  setReMarkVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  setCurRemark: React.Dispatch<React.SetStateAction<string>>,
  refreshList: () => void,
) => {
  const navigate = useNavigate();

  const columns = useMemo<ProColumns<ApplyReviewInfo, 'text'>[]>(() => {
    return [
      {
        title: '申请单ID',
        dataIndex: 'applyId',
        key: 'applyId',
        width: 150,
        valueType: 'money',
        fieldProps: {
          min: 0,
          moneySymbol: false,
          placeholder: '请输入申请单ID',
        },
        render: (_, record) => {
          return record.applyId || '-';
        },
      },
      {
        title: '评审结果',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        valueType: 'select',
        fieldProps: {
          allowClear: true,
          placeholder: '请选择评审结果',
          options: activeKey === '4' ? resultOptions : splitResultOptions,
        },
        render: (_, record) => {
          return (
            <Tag color={getStatusTag(record.status).color}>{getStatusTag(record.status).label}</Tag>
          );
        },
        hideInSearch: activeKey === '2',
      },
      {
        title: '主营类目',
        dataIndex: 'mainCategory',
        key: 'mainCategory',
        hideInTable: true,
        width: 100,
        search: {
          transform: ({ label, value }) => {
            return { mainCategory: label, mainCategoryId: value };
          },
        },
        fieldProps: {
          placeholder: '请选择主营类目',
          labelInValue: true,
        },
        valueType: 'select',
        request: async () => {
          const resp: any = await getBrandApplyCategoryList();
          if (isEmpty(resp)) return [];
          return resp.map((item: any) => {
            return {
              label: item.categoryName,
              value: item.categoryId,
            };
          });
        },
      },
      {
        title: '提报时间',
        dataIndex: 'createTime',
        key: 'createTime',
        hideInSearch: true,
        width: 200,
        render: (_, record) => {
          return <div>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>;
        },
      },
      {
        title: '提报人',
        dataIndex: 'creator',
        key: 'creator',
        width: 160,
        formItemProps: {
          label: '提报人姓名',
        },
        fieldProps: {
          placeholder: '请输入提报人姓名',
        },
      },
      {
        title: '一级类目名称',
        dataIndex: 'mainCategory',
        key: 'mainCategory',
        hideInSearch: true,
        width: 200,
      },
      {
        title: '品牌官方名',
        dataIndex: 'brandName',
        formItemProps: {
          label: '品牌名称',
        },
        key: 'brandName',
        width: 200,
        fieldProps: {
          placeholder: '请输入品牌名称',
        },
      },
      {
        title: '企业名称',
        dataIndex: 'enterpriseName',
        formItemProps: {
          label: '企业全称',
        },
        key: 'enterpriseName',
        width: 200,
        fieldProps: {
          placeholder: '请输入企业全称',
        },
      },
      {
        title: '品牌类型',
        dataIndex: 'brandType',
        key: 'brandType',
        hideInSearch: true,
        width: 120,
        render: (_, record) => {
          return BRAND_TYPES_MAP[record.brandType] || '-';
        },
      },
      {
        title: '资质类型',
        dataIndex: 'qualificationType',
        key: 'qualificationType',
        hideInSearch: true,
        width: 120,
        render: (_, record) => {
          return QUALIFICATION_TYPE_MAP[record.qualificationType] || '-';
        },
      },
      {
        title: '品牌分层自评',
        dataIndex: 'brandLayerSelfEvaluation',
        key: 'brandLayerSelfEvaluation',
        hideInSearch: true,
        width: 200,
        render: (_, record) => {
          return BRAND_LAYER_SELFE_VALUATION_TYPES_MAP[record.brandLayerSelfEvaluation] || '-';
        },
      },
      {
        title: '操作',
        dataIndex: '',
        key: '',
        width: 400,
        hideInSearch: true,
        fixed: 'right',
        render: (_, record) => {
          return (
            <>
              {record.status === 10 ? (
                <Space>
                  <Button
                    className="ml10 mini"
                    type="primary"
                    size="small"
                    onClick={async (e) => {
                      handleApprovalBatchReview([record.id].join(','), 40, e, refreshList);
                    }}
                  >
                    通过
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    className="next-btn mini"
                    onClick={async (e) => {
                      handleApprovalBatchReview([record.id].join(','), 20, e, refreshList);
                    }}
                  >
                    下次评审
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    className="mini"
                    danger
                    onClick={async (e) => {
                      handleApprovalBatchReview([record.id].join(','), 30, e, refreshList);
                    }}
                  >
                    不通过
                  </Button>
                </Space>
              ) : null}
              {record.status !== 0 && record.status !== 20 ? (
                <Button
                  className="pl28 mini"
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurApplyId(record.applyId);
                    navigate(
                      {
                        pathname: '/settleIn/applyManagement/edit',
                        search: createSearchParams({
                          applyId: record.applyId.toString(),
                          spec: '',
                          from: 'applyReview',
                        }).toString(),
                      },
                      { replace: true },
                    );
                  }}
                >
                  编辑申请单
                </Button>
              ) : null}
              <>
                <Button
                  type="link"
                  className="mini"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsTable(true);
                    setCurrentId(record.id);
                    setCurRemark(record.remark);
                    setReMarkVisible(true);
                  }}
                >
                  {record.remark ? '修改备注' : '备注'}
                </Button>
                <Button
                  type="link"
                  className="mini"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    Modal.confirm({
                      title: '数据删除',
                      content: '是否确认删除该数据？删除后无法恢复，请谨慎操作',
                      centered: true,
                      icon: <ExclamationCircleOutlined />,
                      onOk: async () => {
                        try {
                          const res = await deleteTicket({
                            applyId: record.applyId,
                          });
                          if (res) {
                            message.success('申请单删除成功！');
                            refreshList();
                          }
                        } catch (e) {
                          console.warn(e);
                        }
                      },
                    });
                  }}
                >
                  {' '}
                  删除{' '}
                </Button>
              </>
            </>
          );
        },
      },
    ];
  }, [activeKey]);
  return columns;
};

export { useColumns };
