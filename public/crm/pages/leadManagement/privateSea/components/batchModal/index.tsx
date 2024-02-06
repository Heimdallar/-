import React from 'react';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import ProForm, { ModalForm } from '@poizon-design/pro-form';
import { isEmpty } from 'lodash';
import { message } from 'poizon-design';
import fetchClueTransferService from '@/services/publicSea/transfer';
import fetchClueBatchTransferService from '@/services/publicSea/batchTransfer';

interface BatChItem {
  batchAddVisible: boolean;
  batchCustomerSeaId: number;
  selectedRowKeys: number[];
  setBatchAddVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBatchCustomerSeaId: React.Dispatch<React.SetStateAction<number>>;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<any>>;
  refreshList: () => void;
  batchLeadId: number;
  setBatchLeadId: React.Dispatch<React.SetStateAction<number>>;
}

export default ({
  batchAddVisible,
  setBatchAddVisible,
  selectedRowKeys,
  setSelectedRowKeys,
  refreshList,
  batchLeadId,
  setBatchLeadId,
}: BatChItem) => {
  return (
    <ModalForm
      visible={batchAddVisible}
      title="线索转移"
      width={520}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setBatchAddVisible(false);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const { developerData } = values;
        let requestParams: any = {
          transfereeId: developerData.value,
          transfereeName: developerData.label,
        };
        if (!isEmpty(selectedRowKeys)) {
          requestParams.leadsIds = selectedRowKeys;
        } else {
          requestParams.leadsId = batchLeadId;
        }

        const resp = !isEmpty(selectedRowKeys)
          ? await fetchClueBatchTransferService(requestParams)
          : await fetchClueTransferService(requestParams);

        message.success(resp.data || '转移成功');
        setSelectedRowKeys([]);
        setBatchAddVisible(false);
        setBatchLeadId(0);
        refreshList();
      }}
    >
      <ProForm.Item
        label="跟进BD"
        name="developerData"
        rules={[{ required: true, message: '请输入BD名字(拼音)搜索' }]}
      >
        <UserSelect placeholder="请输入BD名字(拼音)搜索" labelInValue showSearch allowClear dynamicLoad />
      </ProForm.Item>
    </ModalForm>
  );
};
