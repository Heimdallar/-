import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Modal, Popconfirm, Space, Tag } from 'poizon-design';
import { ApplyInfo } from './interface';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import { getStatusTag } from './util';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteTicket, reSubmit, submit } from './api';
import { getDetail } from '../applyCommon/useSettleInDrawer';
import { createSearchParams, useNavigate } from '@umijs/max';
import {
  APPROVAL_STATUS,
  BRAND_LAYER_SELFE_VALUATION_TYPES_MAP,
  BRAND_TYPES_MAP,
  passNopassOptions,
  QUALIFICATION_TYPE_MAP,
  APPLY_ITEM_STATUS,
} from '@/pages/settleIn/applyCommon/config';

const useColumns = (
  activeKey: string,
  isBDAdmin: boolean,
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setDetailInfo: React.Dispatch<any>,
  setCurApplyId: React.Dispatch<React.SetStateAction<number>>,
  currentUserName: string,
  refreshList: () => void,
) => {
  const navigate = useNavigate();
  const columns = useMemo<ProColumns<ApplyInfo, 'text'>[]>(() => {
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
          options: activeKey === '4' ? APPROVAL_STATUS : passNopassOptions,
        },
        render: (_, record) => {
          return (
            <Tag color={getStatusTag(record.status).color}>{getStatusTag(record.status).label}</Tag>
          );
        },
        hideInSearch: activeKey === '1' || activeKey === '2',
      },
     // 删除 评审序号（approvalPeroidId）、填报周期（reportPeriodNo）
      {
        title: '主营类目',
        dataIndex: 'mainCategory',
        key: 'mainCategory',
        hideInTable: true,
        width: 100,
        renderFormItem: () => {
          return <CategorySelect isIdValue />;
        },
        // search: {
        //   transform: ({value}) => {
        //     return { mainCategory: value }
        //   },
        // },
        fieldProps: {
          placeholder: '请选择主营类目',
        },
      },
      {
        title: '提报人',
        dataIndex: 'creator',
        key: 'creator',
        width: 160,
        fieldProps: {
          placeholder: '请输入提报人名称',
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
        dataIndex: 'operate',
        key: 'operate',
        fixed: 'right',
        hideInSearch: true,
        width: 320,
        render: (_, record) => {
          let checkManageEdit = false;
          if (
            isBDAdmin &&
            ![APPLY_ITEM_STATUS.toSubmit, APPLY_ITEM_STATUS.reviewNextTime].includes(record?.status)
          ) {
            checkManageEdit = true;
          }
          if (record?.status === APPLY_ITEM_STATUS.reviewPass && record?.resubmitFlag === 0) {
            checkManageEdit = false;
          }

          let checkResubmit = Boolean(record.resubmitFlag);
          if (record?.status === APPLY_ITEM_STATUS.reviewPass && record?.resubmitFlag === 1) {
            checkResubmit = false;
          }

          return (
            <>
              <Button
                type="link"
                onClick={async () => {
                  setCurApplyId(record.applyId);
                  await getDetail(record.applyId, setDetailInfo);
                  setDetailVisible(true);
                }}
              >
                查看
              </Button>
              {record.status === 0 && record.creator === currentUserName ? (
                <Button
                  type="link"
                  onClick={() => {
                    setCurApplyId(record.applyId);
                    navigate(
                      {
                        pathname: '/settleIn/applyManagement/edit',
                        search: createSearchParams({
                          applyId: record.applyId.toString(),
                        }).toString(),
                      },
                      { replace: true },
                    );
                  }}
                >
                  编辑
                </Button>
              ) : null}
              {checkManageEdit ? (
                <Button
                  type="link"
                  onClick={() => {
                    setCurApplyId(record.applyId);
                    navigate(
                      {
                        pathname: '/settleIn/applyManagement/edit',
                        search: createSearchParams({
                          applyId: record.applyId.toString(),
                          spec: '',
                        }).toString(),
                      },
                      { replace: true },
                    );
                  }}
                >
                  编辑申请单
                </Button>
              ) : null}
              {record.status === 0 && record.creator === currentUserName ? (
                <Popconfirm
                  placement="left"
                  title={() => {
                    return (
                      <>
                        <div className="confirmTitle">确定提交审核申请单？</div>
                        <span className="confirmContent">提交后进入评审，将无法撤回</span>
                      </>
                    );
                  }}
                  onConfirm={async () => {
                    await submit({ applyId: record.applyId });
                    message.success('申请单提交成功！');
                    refreshList();
                  }}
                >
                  <Button type="link"> 提交审核 </Button>
                </Popconfirm>
              ) : null}
              {isBDAdmin ? (
                <Button
                  type="link"
                  onClick={() => {
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
                  删除
                </Button>
              ) : null}
              {checkResubmit ? (
                <Button
                  type="link"
                  onClick={async () => {
                    const res = await reSubmit({ applyId: record.applyId });
                    if (res) {
                      message.success('重新提交成功！');
                      refreshList();
                    }
                  }}
                >
                  再次提交
                </Button>
              ) : null}
            </>
          );
        },
      },
    ];
  }, [activeKey, isBDAdmin]);
  return columns;
};

export { useColumns };
