import React, { useEffect, useRef, useState } from 'react';
import ProTable from '@poizon-design/pro-table';
import { ProFormInstance } from '@poizon-design/pro-form';
import { Button, Space, message, Modal } from 'poizon-design';
import { defaultPagiSetting } from '@/config';
import ProUpload, { UploadScene } from '@/components/ProUpload';
import ClueModal from '@/pages/leadManagement/publicSea/components/clueModal';
import { importTask } from '@/pages/settleIn/applyReview/api/index';
import { handleNotify } from '@/components/handleNotify';
import styles from './index.less';
import { useColumns } from './adapter/useColumns';
import { getRequirementList, addPublicSeaClue, invaildRequire } from './api';
import RemarkModel from './components/remarkModel';
import LogTableModal from './components/logTableModal';
import NewDemandModel from './components/newDemandModel';
import { execImportTask, getImportTemplate } from './api/file';
import { IRequirementItem } from './api/interface';
import { notifyResult } from './components/notifyResult';
import { useOperationPermisssion } from './adapter/useOperationPermission';
import { IListParams, RequireEditItem } from './interface';

const clueManagement: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const tableActionRef = useRef<any>();
  // “新增需求按钮”的弹窗相关 hook
  const [newDemandModelVisible, setNewDemandModelVisible] = useState<boolean>(false);
  // “查看备注按钮”的弹窗相关 hook
  const [remarkModelVisible, setRemarkModelVisible] = useState<boolean>(false);
  const [remarkModelValue, setRemarkModelValue] = useState<string>('');
  // “提交线索按钮”的弹窗相关 hook
  const [clueLeadsId, setClueLeadsId] = useState<number>(0);
  const [clueModelVisible, setClueModelVisible] = useState<boolean>(false);
  const [clueUnchangeableValue, setClueUnchangeableValue] = useState<any>({});
  // “查看日志按钮”的弹窗相关 hook
  const [logModelVisible, setLogModelVisible] = useState<boolean>(false);
  const [logLeadsId, setLogLeadsId] = useState<number>(0);
  const [operationPermission] = useOperationPermisssion();
  const [row, setRow] = useState<RequireEditItem>();

  const handleLink = (leadsId: number) => {
    if (leadsId) {
      Modal.confirm({
        title: '需求作废',
        content: `是否确认作废需求?\n作废后该需求收集来的线索不会作废,但后续不再从雷达获取对应的新线索`,
        onOk: async () => {
          await invaildRequire(leadsId);
          message.success('作废成功');
          handleRefreshTable();
        },
      });
    }
  };

  const columns = useColumns({
    setRemarkModelVisible,
    setRemarkModelValue,
    setLogModelVisible,
    setLogLeadsId,
    setClueModelVisible,
    setClueLeadsId,
    setClueUnchangeableValue,
    setNewDemandModelVisible,
    setRow,
    handleLink,
  });
  const [exportParams, setExportParams] = useState({});

  const handleRefreshTable = () => {
    tableActionRef.current?.reload();
  };

  return (
    <div data-trackid="4fd2d52ea06cf7a4-io2BW_">
      <ProTable<IRequirementItem>
        columns={columns}
        formRef={formRef}
        actionRef={tableActionRef}
        options={false}
        request={async (params = {}, sorter = {}) => {
          // 默认按照时间倒序排序，不需要处理
          // 搜索参数
          const {
            id,
            current,
            brandName,
            status,
            priorityScore,
            rangeTime,
            pageSize,
            mainCategoryId,
          } = params;
          const requestParams: IListParams = {
            id,
            brandName,
            status,
            priorityScore,
            pageNum: current,
            pageSize,
            mainCategoryId,
          };
          if (rangeTime) {
            requestParams.createRangeTime = rangeTime[0];
            requestParams.endRangeTime = rangeTime[1];
          }
          requestParams.mainCategoryId = mainCategoryId?.key;
          setExportParams(requestParams);
          const resp = await getRequirementList(requestParams);
          return {
            data: resp.contents,
            total: resp.total,
          };
        }}
        search={{
          // 没有收起按钮
          collapsed: false,
          span: 12,
          collapseRender: false,
        }}
        form={{
          ignoreRules: false,
        }}
        toolBarRender={() => {
          // 后端接口返回按钮操作权限
          return [
            <Space>
              {operationPermission.canExport ? (
                <Button
                  onClick={async () => {
                    const result = await importTask({
                      taskTemplateCode: `merchant_customer_investment_export`,
                      taskName: `需求清单导出`,
                      exportParams,
                    });
                    if (result) {
                      handleNotify('导出任务创建成功');
                    } else {
                      message.error('导出失败，请稍后再试');
                    }
                  }}
                >
                  导出需求
                </Button>
              ) : null}
              {operationPermission?.canCreate ? (
                <>
                  <Button
                    onClick={async () => {
                      const result = await getImportTemplate();
                      notifyResult(result);
                      if (result.data) {
                        window.open(result.data);
                      }
                    }}
                  >
                    下载模板
                  </Button>
                  <ProUpload
                    bizCode="merchant_entry"
                    accept=".xlsx"
                    customBtn
                    btnText="导入需求"
                    size={30}
                    scene={UploadScene.crm}
                    onUploadSuccess={async (file) => {
                      const result = await execImportTask(file);
                      notifyResult(result);
                    }}
                  />
                  <Button onClick={() => setNewDemandModelVisible(true)} type="primary">
                    新增需求
                  </Button>
                </>
              ) : null}
            </Space>,
          ];
        }}
        scroll={{ x: 1000 }}
      />
      <NewDemandModel
        visible={newDemandModelVisible}
        setVisible={setNewDemandModelVisible}
        onNewDemand={handleRefreshTable}
        row={row}
        setRow={setRow}
      />
      <RemarkModel
        remark={remarkModelValue}
        visible={remarkModelVisible}
        setVisible={setRemarkModelVisible}
      />
      <ClueModal
        batchLeadId={clueLeadsId}
        setRow={() => {}}
        refreshList={handleRefreshTable}
        clueShow={clueModelVisible}
        unchangeableValue={clueUnchangeableValue}
        setClueShow={setClueModelVisible}
        requiredColumns={{
          contactMobileNumber: true,
          willingness: true,
          annualSales: false,
          categoryStyles: false,
          brandType: false,
        }}
        handleAdd={async (id, params: any) => {
          params.targetId = id;
          return addPublicSeaClue(params);
        }}
      />
      <LogTableModal
        logLeadsId={logLeadsId}
        visible={logModelVisible}
        setVisible={setLogModelVisible}
      />
    </div>
  );
};
export default clueManagement;
