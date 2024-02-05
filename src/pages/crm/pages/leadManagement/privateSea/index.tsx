/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button, message, Space } from 'poizon-design';
import { ProFormInstance } from '@poizon-design/pro-form';
import { SortOrder } from 'poizon-design/lib/table/interface';
import { defaultPagiSetting } from '@/config';
import { deleteEmptyParam } from '@/utils/common';
import { handleNotify } from '@/components/handleNotify';
import QuickOptions from '@/components/quickOptions';
import fetchClueDetailService from '@/services/publicSea/detail';
import ClueModal from '../publicSea/components/clueModal';
import { getPublicSeaClueList } from '../publicSea/api';
import { sortHandleFn, useQuery } from '../publicSea/util';
import { exportCustomerPrivateSeaData } from './api/index';
import { IDetail, IListItem } from './interface';
import { useColumns } from './useColumns';
import { transfrom } from './util';
import './index.less';
import { getColumnKey, getSortType, initFormState, initRequstParams } from './config';
import DetailDrawer from './components/detailDrawer';
import BatchModal from './components/batchModal';
import LabelModal from './components/labelModal';
import { FromPage } from './contant';

const clueManagement: React.FC<any> = () => {
  const query = useQuery();
  const statusList = query?.statusList?.split(',').map(Number) || [];
  const [privateSeaList, setPrivateSeaList] = useState<IListItem[]>([]);
  const [batchAddVisible, setBatchAddVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [batchLeadId, setBatchLeadId] = useState(0);
  const [batchCustomerSeaId, setBatchCustomerSeaId] = useState(0);
  const actionRef = useRef<ActionType>();
  const [detailVisible, setDetailVisible] = useState(false);
  const [formState, setFormState] = useState<IDetail>(initFormState);
  const [requestParams, setRequestParams] = useState(initRequstParams);
  const [labelVisible, setLabelVisible] = useState(false);
  const [initLabel, setInitLabel] = useState<number[]>([]);
  const formRef = useRef<ProFormInstance>();
  const [isReset, setIsReset] = useState(false);
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);
  const [personalInfoType, setPersonalInfoType] = useState<number>();

  const invokeUpdateDetail = async (leadsId: number) => {
    const { data }: any = await fetchClueDetailService({ leadsId, fromPage: FromPage.私海 });
    setFormState(() => {
      return {
        ...data,
      };
    });
    if (detailVisible) return;
    setBatchLeadId(leadsId);
  };

  const refreshList = () => {
    actionRef.current?.reload();
  };

  const handleSorter = (
    sorter: Record<string, SortOrder>,
  ): { sortParamType: number; sortType: number } => {
    if (isReset) {
      // setCurSorter(undefined)
      return {
        sortParamType: 0,
        sortType: 0,
      };
    }
    // setCurSorter(sorter)
    const [columnKey] = Object.keys(sorter);
    const order = sorter[columnKey];
    let sortParamType = 0;
    if (columnKey) {
      sortParamType = getColumnKey(columnKey);
    }
    const sortType = getSortType(order);
    return {
      sortParamType,
      sortType,
    };
  };

  const [row, setRow] = useState<IListItem>();
  const [clueShow, setClueShow] = useState(false);
  const columns = useColumns({
    formRef,
    setBatchLeadId,
    setInitLabel,
    setLabelVisible,
    refreshList,
    setRow,
    setClueShow,
  });

  const quickOptionsRef = useRef<{
    setActive: (value: string) => void;
    queryOrdersQueryCountBySceneService: () => void;
  }>();

  return (
    <div data-trackid="d416716acc9ec0e1-ZuQRJA">
      <QuickOptions
        fromPage={FromPage.私海}
        ref={quickOptionsRef}
        formRef={formRef}
        setPersonalInfoType={setPersonalInfoType}
      />
      <ProTable<IListItem>
        columns={columns}
        tableAlertRender={false}
        dataSource={privateSeaList}
        rowClassName={(record) => (Number(record.top) === 1 ? 'top-row-zd' : 'pointer-hand')}
        onDataSourceChange={setPrivateSeaList}
        actionRef={actionRef}
        tableLayout="auto"
        formRef={formRef}
        tableStyle={{ padding: '16px' }}
        form={{
          initialValues: {
            statusList,
          },
          onValuesChange() {
            quickOptionsRef.current?.setActive('');
          },
        }}
        onReset={() => {
          setIsReset(true);
          setSelectedRowKeys([]);
          quickOptionsRef.current?.setActive('');
        }}
        onSubmit={() => {
          setIsReset(false);
        }}
        request={async (params = {}, sorter = {}) => {
          const { sortParamType, sortType } = handleSorter(sorter);
          const { current, targetId, ...rest } = params;
          const paramsData = {
            targetId: Number(targetId),
            ...initRequstParams,
            ...rest,
            page: current,
            sortParamType,
            sortType,
            fromPage: FromPage.私海,
            personalInfoType,
            sortRule: sortHandleFn(sorter),
          };
          deleteEmptyParam(paramsData);
          setRequestParams(paramsData);
          const resp: any = await getPublicSeaClueList(paramsData);
          const transfromData: any = transfrom(resp.datas) || [];
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: transfromData,
            total: resp.total,
          };
        }}
        rowKey="customerSeaId"
        onRow={(record) => {
          return {
            onClick: () => {
              invokeUpdateDetail(record.leadsId);
              setDetailVisible(true);
            },
          };
        }}
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...defaultPagiSetting, ...rest });
        }}
        search={{
          labelWidth: 'auto',
          span: 8,
        }}
        options={false}
        toolBarRender={() => [
          <Space key="btns">
            <Button
              type="primary"
              onClick={async () => {
                try {
                  const result = await exportCustomerPrivateSeaData(requestParams);
                  if (result && !result.msg) {
                    handleNotify('导出任务创建成功');
                  } else {
                    message.error('导出失败，请稍后再试');
                  }
                } catch (err) {
                  console.error('导出文件失败', err);
                }
              }}
            >
              导出线索
            </Button>
          </Space>,
        ]}
        scroll={{ x: 'max-content' }}
      />
      <BatchModal
        batchLeadId={batchLeadId}
        batchAddVisible={batchAddVisible}
        setBatchAddVisible={setBatchAddVisible}
        batchCustomerSeaId={batchCustomerSeaId}
        setBatchCustomerSeaId={setBatchCustomerSeaId}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        refreshList={refreshList}
        setBatchLeadId={setBatchLeadId}
      />
      <LabelModal
        labelVisible={labelVisible}
        setLabelVisible={setLabelVisible}
        batchLeadId={batchLeadId}
        batchCustomerSeaId={batchCustomerSeaId}
        initLabel={initLabel}
        setBatchCustomerSeaId={setBatchCustomerSeaId}
        refreshList={refreshList}
      />
      <DetailDrawer
        detailVisible={detailVisible}
        batchLeadId={batchLeadId}
        batchCustomerSeaId={batchCustomerSeaId}
        formState={formState}
        setFormState={setFormState}
        setDetailVisible={setDetailVisible}
        invokeUpdateDetail={invokeUpdateDetail}
        setBatchCustomerSeaId={setBatchCustomerSeaId}
      />
      <ClueModal
        clueShow={clueShow}
        row={row}
        batchLeadId={batchLeadId}
        refreshList={refreshList}
        setRow={setRow}
        setClueShow={setClueShow}
        withWillingnessSelect={true}
        requiredColumns={{
          contactMobileNumber: true,
          annualSales: false,
        }}
      />
    </div>
  );
};
export default clueManagement;
