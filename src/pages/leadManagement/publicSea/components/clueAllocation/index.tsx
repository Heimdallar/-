import { Button, Modal, message } from 'poizon-design';
import React, { useRef, useState } from 'react';
import { ProForm, ProFormInstance, ProFormSelect } from '@poizon-design/pro-form';
import { priorityOptions } from '../../interface'
// import fetchClueAllotService from '@/services/publicSea/clueAllot'
// import fetchClueBatchAllotService from '@/services/publicSea/clueBatchAllot'
import UserSelect from '@/components/UserSearch'

interface InProps {
  buttonType?: 'text' | 'link' | 'ghost' | 'primary' | 'default' | 'dashed';
  buttonDesc?: string;
  buttonDisabled?: boolean;
  selectedRowKeys?: number[];
  leadsId?: number,
  refreshList?: () =>void;
  invokeUpdateDetail?: (leadsId: number) => void
}
export default function ClueAllocation({
  buttonType = 'default',
  buttonDesc = '分配',
  buttonDisabled = false,
  selectedRowKeys =[],
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
    const { bindBusinessDeveloper, priority } = values
    if (!selectedRowKeys.length) {
      const res = await fetchClueAllotService({
        leadsId,
        bindBusinessDeveloper: bindBusinessDeveloper.label,
        bindBusinessDeveloperId: bindBusinessDeveloper.value,
        priority
      })
      if(!res.success) return setLoading(false);
      message.success('分配成功')
    } else {
      const res = await fetchClueBatchAllotService({
        leadsIds: selectedRowKeys,
        bindBusinessDeveloper: bindBusinessDeveloper.label,
        bindBusinessDeveloperId: bindBusinessDeveloper.value,
        priority
      })
      if(!res.success) return setLoading(false);
      message.success(res.data || '操作成功')
    }
    setLoading(false)
    setVisible(false)
    refreshList && refreshList();
    invokeUpdateDetail && invokeUpdateDetail(leadsId)
  };
  return (
    <>
      <Button type={buttonType} disabled={buttonDisabled} onClick={() => setVisible(true)}>
        {buttonDesc}
      </Button>
      <Modal
        title={'线索分配'}
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
          <ProFormSelect
            rules={[{ required: true, message: '请选择优先级' }]}
            fieldProps={{
              options: priorityOptions,
              placeholder: "请选择优先级",
            }}
            name="priority"
            label="优先级"
          ></ProFormSelect>
          <ProForm.Item
            // rules={[{ required: true, message: '请选择跟进人' }]}
            name="bindBusinessDeveloper"
            label="跟进人"
          >
            <UserSelect
              disabled
              placeholder="请输入跟进人名字搜索"
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
function fetchClueAllotService(arg0: { leadsId: number; bindBusinessDeveloper: any; bindBusinessDeveloperId: any; priority: any; }) {
    throw new Error('Function not implemented.');
}

function fetchClueBatchAllotService(arg0: { leadsIds: number[]; bindBusinessDeveloper: any; bindBusinessDeveloperId: any; priority: any; }) {
    throw new Error('Function not implemented.');
}

