import { Button, Modal, message } from 'poizon-design';
import React, { useRef, useState } from 'react';
import { ProForm, ProFormInstance } from '@poizon-design/pro-form';
// import fetchClueTransferService from '@/services/publicSea/transfer';
// import fetchClueBatchTransferService from '@/services/publicSea/batchTransfer';
import UserSelect from '@/components/ProSelect/business/userSelect'

interface InProps {
  buttonType?: 'text' | 'link' | 'ghost' | 'primary' | 'default' | 'dashed';
  buttonDesc?: string;
  buttonDisabled?: boolean;
  selectedRowKeys?: number [];
  leadsId?: number;
  refreshList?: () =>void;
  invokeUpdateDetail?: (leadsId: number) => void;
}
export default function ClueTransfer({
  buttonType = 'default',
  buttonDesc = '转移',
  buttonDisabled = false,
  selectedRowKeys = [],
  leadsId = 0,
  refreshList,
  invokeUpdateDetail
}: InProps) {
  const formRef = useRef<ProFormInstance>();
  const [visible, setVisible] = useState<boolean>(false);
  const [loading ,setLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    const values = await formRef.current?.validateFields();
    setLoading(true)
    const { transferee } = values
    if (!selectedRowKeys.length) {
      const res = await fetchClueTransferService({
        leadsId,
        transfereeId: transferee.value,
        transfereeName: transferee.label,
      });
      if (!res.success) return setLoading(false);
      message.success('转移成功');
    } else {
      const res = await fetchClueBatchTransferService({
        leadsIds: selectedRowKeys,
        transfereeId: transferee.value,
        transfereeName: transferee.label,
      });
      if (!res.success) return setLoading(false);
      message.success(res.data || '操作成功');
    }
    setLoading(false)
    setVisible(false);
    refreshList && refreshList();
    invokeUpdateDetail && invokeUpdateDetail(leadsId)
  };
  return (
    <>
      <Button type={buttonType} disabled={buttonDisabled} onClick={() => setVisible(true)}>
        {buttonDesc}
      </Button>
      <Modal
        title={'线索转移'}
        visible={visible}
        destroyOnClose
        centered
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
        okText="确定"
        cancelText="取消"
        okButtonProps={{
          loading
        }}
      >
        <ProForm formRef={formRef} labelCol={{ span: 5 }} layout="horizontal" submitter={false}>
          <ProForm.Item
            rules={[{ required: true, message: '请选择跟进人' }]}
            name="transferee"
            label="跟进人"
          >
            <UserSelect
              placeholder="请输入跟进人名字(拼音)搜索"
              labelInValue
              showSearch
              allowClear
              dynamicLoad
            />
          </ProForm.Item>
        </ProForm>
      </Modal>
    </>
  );
}
function fetchClueTransferService(arg0: { leadsId: number; transfereeId: any; transfereeName: any; }) {
    throw new Error('Function not implemented.');
}

function fetchClueBatchTransferService(arg0: { leadsIds: number[]; transfereeId: any; transfereeName: any; }) {
    throw new Error('Function not implemented.');
}

