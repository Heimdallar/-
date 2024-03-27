import React, { useRef, useState, useEffect } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button, Space } from 'poizon-design';
import { ProFormInstance } from '@poizon-design/pro-form';
import { pagination } from '@/config';
import { fetchClueDetailService, getPublicSeaClueList } from './service';
import { IListItem } from './interface';
import { columns } from './column';
import ClueModal from './components/clueModal';
import { transfrom, useQuery, sortHandleFn } from './utils';
import styles from './index.less';
import { initRequstParams } from './interface';
import DetailDrawer from './components/detailDrawer';
import BatchModal from './components/batchModal';
import ImportLeads from './components/importLeads';
import ClueAllocation from './components/clueAllocation';
import ClueTransfer from './components/clueTransfer';
import ExportTemplate from './components/exportTemplate';
import DownloadTemplate from './components/downloadTemplate';
import _ from 'lodash';
export interface Data{
   basicdata:{
    leadsId?: number,
    brandInfo?: string,
    mainCategoryId?: string,
    brandType?: number,
    enterpriseName?:string,
    targetId?:number,
    labelNames?:string[]
}
 outdata:{
  storeChannel?:string,
  storeName?:string,
  storeUrl?:string,
  recentThirtyTurnover?:number,
  fansNum?:number
}
 contactdata:{
  contactName?:string,
  contactMobileNumber?:number,
  contactWechat?:number,
}
 enterdata:{
  entryWilling?:string,
  enterpriseName ?:string,
  leadsIds?:number
}
}
const ClueManagement: React.FC = () => {
  const [clueShow, setClueShow] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [batchLeadId, setBatchLeadId] = useState(0);
  const [row, setRow] = useState<IListItem>();
  const actionRef = useRef<ActionType>();
 const formRef = useRef<ProFormInstance>();
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [formState, setFormState] = useState();
  const [reqParams, setReqParams] = useState({});
  const query = useQuery();
  const quickOptionsRef = useRef<{
    setActive: (value: string) => void;
    queryOrdersQueryCountBySceneService: () => void;
  }>();
  const type = Number(query.personalInfoType) || undefined;

  const [personalInfoType, setPersonalInfoType] = useState<number>();

  const invokeUpdateDetail = async (leadsId: number) => {
    const resp = await fetchClueDetailService({ leadsId});
    setFormState({
      ...resp,
    });
  };


  const refreshList = () => {
    actionRef.current?.reload();
    quickOptionsRef.current?.queryOrdersQueryCountBySceneService();
    setSelectedRowKeys([]);
  };


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
    <div >

      <ProTable<IListItem>
        columns={columns}
        tableAlertRender={false}
        rowClassName={styles.publiCAnttableRow}
        actionRef={actionRef}
        formRef={formRef}
        tableLayout="auto"
        form={{
          ignoreRules: false,
          onValuesChange(e) {
            setPersonalInfoType(e?.personalInfoType);
          },
        }}
        onReset={() => {
          setSelectedRowKeys([]);
          formRef.current?.setFieldsValue({
            personalInfoType: undefined,
          });
          setPersonalInfoType(undefined);
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
            sortRule: sortHandleFn(sort),
          };
          setReqParams(requestParams);
          console.log(reqParams)
          // const resp: any = await getPublicSeaClueList({
          //   ...requestParams,
          //   sortParamType: queryParams('sortParamType'),
          //   sortType: queryParams('sortType'),
          // });
          // const transfromData = transfrom(resp.datas || []) || [];
          // return {
          //   data: transfromData,
          //   total: resp.total,
          // };
          const res=await getPublicSeaClueList(reqParams)
          return res
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
          defaultCollapsed: true,
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
              buttonType="primary" status={0}            />
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
        refreshList={refreshList}
        invokeUpdateDetail={invokeUpdateDetail}
      />
    </div>
  );
};
export default ClueManagement;


