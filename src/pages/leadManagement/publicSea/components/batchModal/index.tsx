import { ModalForm, ProFormSelect } from '@poizon-design/pro-form';
import { isEmpty } from 'lodash';
import { Button, message } from 'poizon-design';
import { batchClaimPublicSeaClue, claimPublicSeaClue } from '../../service';
import { priorityOptions } from '../../interface';
import { useMemo, useState } from 'react'

interface BatChItem {
  batchLeadId?: number;
  selectedRowKeys?: number[];
  invokeUpdateDetail?: (leadsId: number) => void;
  setSelectedRowKeys?: React.Dispatch<React.SetStateAction<number[]>>;
  refreshList?: () => void;
  buttonDesc?: string;
  buttonType?: 'text' | 'link' | 'ghost' | 'primary' | 'default' | 'dashed';
  buttonDisabled?: boolean,
  status: number
}

export default ({
  batchLeadId,
  selectedRowKeys,
  invokeUpdateDetail,
  refreshList,
  setSelectedRowKeys,
  buttonDesc = '认领',
  buttonType = 'default',
  buttonDisabled = false,
  status
}: BatChItem) => {
  const [batchAddVisible, setBatchAddVisible] = useState<boolean>(false)
  const isAccendant = useMemo(() => {
    return status === 1;
  }, [status]);
  return (
    <>
    <Button type={buttonType} disabled={buttonDisabled} onClick={async () => {
      if(isAccendant){
        const res = await claimPublicSeaClue({ leadsId: batchLeadId });
        if(res.code !== 200) return
        message.success('认领成功')
        invokeUpdateDetail && batchLeadId && invokeUpdateDetail(batchLeadId);
        refreshList && refreshList();
        setSelectedRowKeys?.([]);
        return
      }
      setBatchAddVisible(true)
    }}>{buttonDesc}</Button>
    <ModalForm
      visible={batchAddVisible}
      title="线索认领"
      width={520}
      labelCol={{ span: 6 }}
      initialValues={{
        priority: 0,
      }}
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
        const { priority } = values;
        let requestParams: any = {
          priority,
        };
        if (!isEmpty(selectedRowKeys)) {
          requestParams.leadsIds = selectedRowKeys;
        } else {
          requestParams.leadsId = batchLeadId;
        }
        if (!isEmpty(selectedRowKeys)) {
          const res = await batchClaimPublicSeaClue(requestParams)
          if(res.code !== 200) return
          message.success(res.data);
        }else {
          const res = await claimPublicSeaClue(requestParams);
          if(res.code !== 200) return
          message.success('认领成功')
        }
        setBatchAddVisible(false);
        invokeUpdateDetail && batchLeadId && invokeUpdateDetail(batchLeadId);
        setSelectedRowKeys?.([]);
        refreshList && refreshList();
      }}
    >
      <ProFormSelect
        name="priority"
        label="优先级"
        rules={[{ required: true, message: '请选择优先级' }]}
        options={priorityOptions}
      />
    </ModalForm>
  </>  
  );
};
