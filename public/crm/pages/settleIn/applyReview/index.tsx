import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { getApprovalList, importTask, remarkReview } from './api';
import { useColumns } from './useColumns';
import { Button, Card, message, Space } from 'poizon-design';
import { Export } from '@poizon-design/icons';
import { ModalForm, ProFormTextArea } from '@poizon-design/pro-form';
import './index.less';
import { default20PagiSetting } from '@/config';
import {
  detailField,
  TABS_CONFIG_REVIEW,
  TABS_MAP_CONFIG,
  TABS_MAP_CONFIG_REVIEW,
} from '../applyCommon/config';
import { ApplyReviewInfo } from './interface';
import { handleNotify } from '@/components/handleNotify';
import moment from 'moment';
import { brandHotColumns, getStatusTag, saleInfoColumns } from './util';
import { getDetail, initDetail } from '../applyCommon/useSettleInDrawer';
import DetailDrawer from '../applyCommon/detailDrawer';
import TableFooter from './components/tableFooter';
import { CHANNEL_MAPS } from '../applyManagement/config/const';

const applyReview: React.FC<any> = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useState<any>();
  const actionRef = useRef<ActionType>();
  const [activeKey, setActiveKey] = useState('2');
  const [detailVisible, setDetailVisible] = useState(false);
  const [reMarkVisible, setReMarkVisible] = useState<boolean | undefined>(false);
  const [curRemark, setCurRemark] = useState('')
  const [detailInfo, setDetailInfo] = useState<any>(initDetail);
  const [approvalRecordId, setApprovalRecordId] = useState('');
  const [curApplyId, setCurApplyId] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const [isTable, setIsTable] = useState(false);
  const [pageInfo, setPageInfo] = useState(default20PagiSetting);

  const saleColumns = saleInfoColumns();
  const brandColumns = brandHotColumns(detailInfo);
  const refreshList = () => {
    actionRef.current?.reload();
  };
  const columns = useColumns(
    activeKey,
    setCurApplyId,
    setCurrentId,
    setIsTable,
    setReMarkVisible,
    setCurRemark,
    refreshList,
  );

  return (
    <div data-trackid="01054838501efb55-UOA26L">
      <div data-trackid="01054838501efb55-jdWWUN">
        <Card
          className="apply-card-tabs"
          tabList={TABS_CONFIG_REVIEW}
          size="small"
          tabProps={{
            size: 'small',
          }}
          activeTabKey={activeKey}
          onTabChange={(key) => {
            setActiveKey(key);
            actionRef.current?.reloadAndRest()
          }}
        />
      </div>
      <ProTable<ApplyReviewInfo>
        columns={columns}
        actionRef={actionRef}
        tableAlertRender={false}
        request={async (params = {}) => {
          const { current, pageSize, ...rest } = params;
          const requestParams = {
            ...rest,
            statusList: TABS_MAP_CONFIG_REVIEW[activeKey].status,
          };
          setSearchParams(requestParams);
          const resp: any = await getApprovalList({
            ...requestParams,
            page: current || 1,
            pageSize: pageSize || 20,
          });
          const firstApprovalRecordId = resp?.datas[0]?.approvalRecordId ?? '';
          firstApprovalRecordId && setApprovalRecordId(firstApprovalRecordId);
          const rets = resp.datas?.map(item => {
            return {
              ...item.applyInfo,
              ...item.applyInfo.internetSaleInfos?.reduce(
                (s: any, c: any, index: number) => {
                  const baseKey = CHANNEL_MAPS[c.storeChannel]
                  return {
                    ...s,
                    [`${baseKey}`]: index,
                    [`${baseKey}Sales`]: c.annualSales,
                    [`${baseKey}Fans`]: c.fansNum,
                  }
                },
                {},
              ),
              ...item,
            }
          })
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: rets || [],
            total: resp.total,
          };
        }}
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          fixed: true,
          onChange: setSelectedRowKeys,
          getCheckboxProps: (record) => ({
            disabled: record.status !== 10,
          }),
        }}
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...default20PagiSetting, ...rest });
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
          span: 8,
        }}
        headerTitle="评审单列表"
        onRow={(record) => {
          return {
            onClick: async () => {
              setCurApplyId(record.applyId);
              setCurrentId(record.id);
              await getDetail(record.applyId, setDetailInfo, record.status);
              setCurRemark(record.remark)
              setDetailVisible(true);
            },
          };
        }}
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Space>
            <Button
              onClick={async () => {
                try {
                  let param = Object.keys(searchParams).reduce(
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
                    taskTemplateCode: `export_approve_data`,
                    taskName: `招商系统评审单导出-${moment().format('YYYY-MM-DD HH:mm')}`,
                    param,
                  });
                  if (result) {
                    handleNotify('导出任务创建成功');
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
              导出评审单
            </Button>
          </Space>,
        ]}
        scroll={{ x: 1500 }}
      />
      <DetailDrawer
        detailVisible={detailVisible}
        detailInfo={detailInfo}
        title="查看申请单"
        setDetailVisible={setDetailVisible}
        statusInfo={getStatusTag(detailInfo.status)}
        detailField={detailField}
        saleColumns={saleColumns}
        curApplyId={curApplyId}
        currentId={currentId}
        showFooter={true}
        fromManager={false}
        setDetailInfo={setDetailInfo}
        setReMarkVisible={setReMarkVisible}
        brandColumns={brandColumns}
        showRemark
        refreshList={refreshList}
      />
      {selectedRowKeys.length ? (
        <TableFooter selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} refreshList={refreshList} />
      ) : null}
      <ModalForm
        visible={reMarkVisible}
        title="备注"
        width={520}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remark: curRemark }}
        onVisibleChange={(val) => {
          if (!val) {
            setReMarkVisible(false);
          }
        }}
        modalProps={{
          maskClosable: false,
          centered: true,
          destroyOnClose: true,
        }}
        layout="horizontal"
        onFinish={async (values) => {
          const { remark } = values;
          const requestParams = {
            remark,
            id: currentId,
          };
          await remarkReview(requestParams);
          message.success('备注成功');
          isTable ? refreshList() : await getDetail(curApplyId, setDetailInfo);
          setIsTable(false);
          setReMarkVisible(false);
          setDetailVisible(false);
          refreshList()
        }}
      >
        <ProFormTextArea
          name="remark"
          label="备注"
          fieldProps={{
            showCount: true,
            rows: 6,
            maxLength: 200,
          }}
          rules={[{ required: true, message: '请输入备注' }]}
          placeholder="请输入备注"
        />
      </ModalForm>
    </div>
  );
};
export default applyReview;
