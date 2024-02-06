import React, { useEffect, useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button, Card, message, Modal, Space } from 'poizon-design';
import { DownloadLine, Export, Import, PlusLine } from '@poizon-design/icons';
import { isEmpty } from 'lodash';
import duTrack from '@du/track';
import './index.less';
import moment from 'moment';
import { useNavigate } from '@umijs/max';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { handleNotify } from '@/components/handleNotify';
import { default20PagiSetting } from '@/config';
import ProUpload, { UploadScene } from '@/components/ProUpload/index';
import { useRequest } from 'ahooks';
import store from '@/store';
import { detailField, TABS_CONFIG, TABS_MAP_CONFIG } from '../applyCommon/config';
import DetailDrawer from '../applyCommon/detailDrawer';
import { initDetail } from '../applyCommon/useSettleInDrawer';
import { IDetail } from '../applyCommon/interface';
import { brandHotColumns, fetchIsBDAdmin, fullName, getStatusTag, saleInfoColumns } from './util';
import { ApplyInfo } from './interface';
import { batchSubmit, importTask, query, closeSwitch } from './api/index';
import { useColumns } from './useColumns';

const ApplyManagement: React.FC<any> = () => {
  const [isBDAdmin, setIsBDAdmin] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [searchParams, setSearchParams] = useState<any>();
  const tableRef = useRef();
  const actionRef = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState('1');
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailInfo, setDetailInfo] = useState<IDetail>(initDetail);
  const [approvalRecordId, setApprovalRecordId] = useState('');
  const [curApplyId, setCurApplyId] = useState(0);
  const saleColumns = saleInfoColumns();
  const brandColumns = brandHotColumns(detailInfo);
  const navigate = useNavigate();
  const { userStore } = store.modules;
  const currentUserName = fullName(userStore.userInfo);
  const [pageInfo, setPageInfo] = useState(default20PagiSetting);

  const { data } = useRequest(() => closeSwitch()) 

  const refreshList = () => {
    actionRef.current?.reload();
  };
  const columns = useColumns(
    activeKey,
    isBDAdmin,
    setDetailVisible,
    setDetailInfo,
    setCurApplyId,
    currentUserName,
    refreshList,
  );

  const initApplyIdAndTab = () => {
    const searchParams = location.search;
    const queryParams = new URLSearchParams(searchParams);
    const theApplyId = queryParams.get('id');
    const currentKey = queryParams.get('tab');
    if (!theApplyId || !currentKey) return;
    setCurApplyId(theApplyId);
    setActiveKey(currentKey);
    tableRef.current?.setFieldsValue({ applyId: curApplyId });
    tableRef.current?.submit();
  };

  useEffect(() => {
    fetchIsBDAdmin(setIsBDAdmin);
  }, []);

  useEffect(() => {
    initApplyIdAndTab();
  }, [curApplyId]);

  return (
    <div data-trackid="ef316f15abdfc26b-DpHIsi">
      <div data-trackid="ef316f15abdfc26b-OeozHr">
        <Card
          className="apply-card-tabs"
          tabList={TABS_CONFIG}
          size="small"
          tabProps={{
            size: 'small',
          }}
          activeTabKey={activeKey}
          onTabChange={(key) => {
            setActiveKey(key);
            actionRef.current?.reloadAndRest();
          }}
        />
      </div>
      <ProTable<ApplyInfo>
        columns={columns}
        tableAlertRender={false}
        actionRef={actionRef}
        formRef={tableRef}
        request={async (params = {}) => {
          const { current, pageSize, ...rest } = params;
          const requestParams = {
            ...rest,
            statusList: TABS_MAP_CONFIG[activeKey].status,
          };
          setSearchParams(requestParams);
          const resp: any = await query({ ...requestParams, page: current, pageSize });
          if (isEmpty(resp.datas)) {
            return {
              data: [],
              total: 0,
            };
          }
          const firstApprovalRecordId = resp?.datas[0]?.approvalRecordId ?? '';
          firstApprovalRecordId && setApprovalRecordId(firstApprovalRecordId);
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.datas || [],
            total: resp.total,
          };
        }}
        rowKey="applyId"
        rowSelection={{ 
          selectedRowKeys,
          fixed: true,
          onChange: setSelectedRowKeys,
          getCheckboxProps: (record: ApplyInfo) => ({
            disabled: record.creator !== currentUserName || record.status !== 0,
          }),
        }}
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...default20PagiSetting, ...rest });
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: true,
          span: 8,
        }}
        headerTitle="申请单列表"
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Space key={'1'}>
            { data && <>
              <Button
                type="link"
                onClick={() => {
                  duTrack.sendClick({
                    nodeId: 'applyManagement_download_template',
                    nodeType: 'NODE',
                    nodeName: '申请单-下载模板',
                  });
                  window.open(
                    'https://h5static.dewucdn.com/node-common/c62c4069-6879-5321-49ee-5009350fb0c6.xlsx',
                  );
                }}
              >
                <DownloadLine />
                下载模板
              </Button>
              <ProUpload
                bizCode="merchant_entry"
                accept=".xlsx"
                customBtn 
                btnText="导入申请单"
                buttonProps={{
                  type: 'link',
                  icon: <Import />,
                }}
                size={30}
                scene={UploadScene.crm}
                maxCount={1}
                onUploadSuccess={async (file) => {
                  if (isEmpty(file)) return;
                  const param = {
                    importFile: file.key,
                    extInfo: {},
                  };
                  const result = await importTask({
                    taskTemplateCode: `merchant_apply_info_import`,
                    taskName: `招商系统-导入申请单`,
                    param,
                  });
                  if (result) {
                    handleNotify('导入任务创建成功');
                  } else {
                    message.error('导出失败，请稍后再试');
                  }
                }}
              />
            </>} 
            <Button
              onClick={async () => {
                try {
                  const param = Object.keys(searchParams).reduce(
                    (s: any, c: string) => {
                      const cv = searchParams[c];
                      if (cv !== null && cv !== undefined && cv !== '') {
                        s[c] = cv;
                      }
                      return s;
                    },
                    {
                      statusList: TABS_MAP_CONFIG[activeKey].status,
                    },
                  );
                  if (param.approvalRecordId ?? '' !== '') {
                    param.approvalRecordId = approvalRecordId;
                  }

                  const result = await importTask({
                    taskTemplateCode: `merchant_apply_info_export`,
                    taskName: `招商系统申请单导出-${moment().format('YYYY-MM-DD HH:mm')}`,
                    param,
                  });
                  if (result) {
                    handleNotify('导入任务创建成功');
                  } else {
                    message.error('导出失败，请稍后再试');
                  }
                } catch (error) {
                  console.error('导出失败', error);
                }
              }}
              icon={<Export />}
              type="link"
            >
              导出申请单
            </Button>
            {data && <Button 
              onClick={() => {
                navigate(
                  {
                    pathname: '/settleIn/applyManagement/edit',
                  },
                  { replace: true },
                );
              }}
              icon={<PlusLine />}
              type="primary"
            >
              新增申请单
            </Button> } 
          </Space>,
        ]}
        scroll={{ x: 1500 }}
      />
      {selectedRowKeys.length ? (
        <div className="batchOpFooter sticky" data-trackid="ef316f15abdfc26b-405ajt">
          <div className="buttonGroup" data-trackid="ef316f15abdfc26b-V2U15Y">
            <Space size={12}>
              <Button
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: '是否确认提交审核申请单？',
                    content: '是否确认提交审核申请单？',
                    centered: true,
                    icon: <ExclamationCircleOutlined />,
                    onOk: async () => {
                      try {
                        const res = await batchSubmit({
                          applyIdList: selectedRowKeys,
                        });
                        if (res) {
                          if (res.successList.length === selectedRowKeys.length) {
                            message.success('申请单提交成功！');
                            setSelectedRowKeys([]);
                            refreshList();
                          } else {
                            message.warning(`以下申请单提交失败：${res.failList.join()}`);
                            throw new Error('申请单提交失败');
                          }
                        }
                      } catch (e) {
                        console.warn(e);
                      }
                    },
                  });
                }}
              >
                提交审核
              </Button>
            </Space>
          </div>
        </div>
      ) : null}
      <DetailDrawer
        detailVisible={detailVisible}
        detailInfo={detailInfo}
        title="查看申请单"
        setDetailVisible={setDetailVisible}
        statusInfo={getStatusTag(detailInfo.status)}
        detailField={detailField}
        saleColumns={saleColumns}
        curApplyId={curApplyId}
        showFooter={true}
        fromManager={true}
        setDetailInfo={setDetailInfo}
        brandColumns={brandColumns}
        refreshList={refreshList}
      />
    </div>
  );
};
export default ApplyManagement;
