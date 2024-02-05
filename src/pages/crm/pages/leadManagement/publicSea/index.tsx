import React, { useRef, useState, useEffect } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button, Space } from 'poizon-design';
import { ProFormInstance } from '@poizon-design/pro-form';
import QuickOptions from '../../../components/quickOptions';
import { pagination } from '@/config';
import fetchClueDetailService from '@/services/publicSea/detail';
import { Data } from '@/entities/publicSea/interface/detail';
import { FromPage } from '../privateSea/contant';
import { getPublicSeaClueList } from './api/index';
import { IListItem } from './interface';
import { useColumns } from './useColumns';
import ClueModal from './components/clueModal';
import { transfrom, useQuery, sortHandleFn } from './util';
import styles from './index.less';
import { initRequstParams } from './config';
import DetailDrawer from './components/detailDrawer';
import BatchModal from './components/batchModal';
import ExportTemplate from './components/exportTemplate';
import DownloadTemplate from './components/downloadTemplate';
import ImportLeads from './components/importLeads';
import ClueTransfer from './components/clueTransfer';
import ClueAllocation from './components/clueAllocation';

const ClueManagement: React.FC = () => {
  const [clueShow, setClueShow] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [batchLeadId, setBatchLeadId] = useState(0);
  const [row, setRow] = useState<IListItem>();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [formState, setFormState] = useState<Data>({});
  const [reqParams, setReqParams] = useState({});
  const query = useQuery();
  const quickOptionsRef = useRef<{
    setActive: (value: string) => void;
    queryOrdersQueryCountBySceneService: () => void;
  }>();
  const type = Number(query.personalInfoType) || undefined;

  const [personalInfoType, setPersonalInfoType] = useState<number>(type);

  const invokeUpdateDetail = async (leadsId: number) => {
    const resp = await fetchClueDetailService({ leadsId, fromPage: FromPage.公海 });
    setFormState({
      ...resp.data,
    });
  };

  const refreshList = () => {
    actionRef.current?.reload();
    quickOptionsRef.current?.queryOrdersQueryCountBySceneService();
    setSelectedRowKeys([]);
  };

  const columns = useColumns(invokeUpdateDetail, refreshList, formRef);

  const isSetSessionStorage = () => {
    if (!Object.keys(query).length) return;
    query.statusList = query.statusList?.split(',')?.map((item) => Number(item));
    sessionStorage.setItem('searchParams', JSON.stringify(query || {}));
  };
  isSetSessionStorage();

  const queryParams = (key: string) => {
    return query?.[key] || JSON.parse(sessionStorage.getItem('searchParams') || '{}')?.[key];
  };

  useEffect(() => {
    formRef.current?.setFieldsValue({
      personalInfoType: type,
      statusList: query.statusList || queryParams('statusList') || [],
      source: query.source ? Number(query.source) : undefined,
    });
    setTimeout(() => {
      formRef.current?.submit();
    }, 100);
  }, []);

  return (
    <div data-trackid="bf3b46cf17373891--dw35Q">
      <QuickOptions
        fromPage={FromPage.公海}
        ref={quickOptionsRef}
        formRef={formRef}
        setPersonalInfoType={(e) => {
          setPersonalInfoType(e);
          formRef.current?.setFieldsValue({
            personalInfoType: e,
          });
        }}
      />
      <ProTable<IListItem>
        columns={columns}
        tableAlertRender={false}
        rowClassName={styles.publiCAnttableRow}
        actionRef={actionRef}
        formRef={formRef}
        tableLayout="auto"
        manualRequest
        form={{
          ignoreRules: false,
          onValuesChange(e) {
            setPersonalInfoType(e?.personalInfoType);
            quickOptionsRef.current?.setActive(e?.personalInfoType);
          },
        }}
        onReset={() => {
          setSelectedRowKeys([]);
          formRef.current?.setFieldsValue({
            personalInfoType: undefined,
          });
          setPersonalInfoType(undefined);
          quickOptionsRef.current?.setActive('');
        }}
        options={false}
        request={async (params = {}, sort: { [key: string]: string }) => {
          const { current, invitationActivityId, feedbackTalkFail = [], ...rest } = params;
          const requestParams = {
            ...initRequstParams,
            ...rest,
            personalInfoType,
            page: current,
            invitationActivityId: invitationActivityId ? Number(invitationActivityId) : null,
            feedbackTalkFail: feedbackTalkFail?.[feedbackTalkFail.length - 1],
            fromPage: 0,
            sortRule: sortHandleFn(sort),
          };
          setReqParams(requestParams);
          const resp: any = await getPublicSeaClueList({
            ...requestParams,
            sortParamType: queryParams('sortParamType'),
            sortType: queryParams('sortType'),
          });
          const transfromData: any = transfrom(resp.datas || []) || [];
          return {
            data: transfromData,
            total: resp.total,
          };
        }}
        rowKey="leadsId"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              invokeUpdateDetail(record.leadsId);
              setBatchLeadId(record.leadsId);
              setDetailVisible(true);
            },
          };
        }}
        pagination={{ ...pagination, pageSizeOptions: [10, 20, 50] }}
        search={{
          labelWidth: 120,
          span: 8,
          defaultCollapsed: false,
        }}
        toolBarRender={() => [
          <Space key="1">
            <ExportTemplate exportParams={reqParams} />
            <DownloadTemplate />
            <ImportLeads />
            <ClueAllocation
              buttonType="primary"
              buttonDesc="批量分配"
              buttonDisabled={!selectedRowKeys.length}
              selectedRowKeys={selectedRowKeys}
              refreshList={refreshList}
            />
            <ClueTransfer
              buttonType="primary"
              buttonDesc="批量转移"
              buttonDisabled={!selectedRowKeys.length}
              selectedRowKeys={selectedRowKeys}
              refreshList={refreshList}
            />
            <BatchModal
              buttonDesc="批量认领"
              buttonDisabled={!selectedRowKeys.length}
              selectedRowKeys={selectedRowKeys}
              invokeUpdateDetail={invokeUpdateDetail}
              refreshList={refreshList}
              buttonType="primary"
            />
            <Button
              onClick={() => {
                setClueShow(true);
              }}
              type="primary"
            >
              新增线索
            </Button>
          </Space>,
        ]}
        scroll={{ x: 'max-content' }}
      />
      <ClueModal
        clueShow={clueShow}
        row={row}
        batchLeadId={batchLeadId}
        refreshList={refreshList}
        setRow={setRow}
        setClueShow={setClueShow}
        requiredColumns={{
          contactMobileNumber: true,
          annualSales: false,
        }}
      />
      <DetailDrawer
        detailVisible={detailVisible}
        batchLeadId={batchLeadId}
        formState={formState}
        setFormState={setFormState}
        setDetailVisible={setDetailVisible}
        setBatchLeadId={setBatchLeadId}
        refreshList={refreshList}
        invokeUpdateDetail={invokeUpdateDetail}
      />
    </div>
  );
};
export default ClueManagement;
