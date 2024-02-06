import { ModalForm, ProFormTextArea } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { IRejectParams } from '../../interface';
import { postReject } from '../../api';

interface RejectInfo {
  rejectVisible: boolean;
  batchLeadId: number;
  setRejectVisible: React.Dispatch<React.SetStateAction<boolean>>;
  invokeUpdateDetail: (leadsId: number) => void;
  refreshList: () => void;
}

export default ({
  rejectVisible,
  setRejectVisible,
  batchLeadId,
  invokeUpdateDetail,
  refreshList,
}: RejectInfo) => {
  return (
    <ModalForm
      visible={rejectVisible}
      title="线索驳回"
      width={520}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setRejectVisible(false);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values: IRejectParams) => {
        const requestParams = {
          ...values,
          leadsId: batchLeadId,
        };

        const res = await postReject(requestParams);
        if (!res) return;
        message.success('提交成功');
        setRejectVisible(false);
        invokeUpdateDetail(batchLeadId);
        refreshList();
      }}
    >
      <ProFormTextArea
        name="reason"
        label="驳回原因"
        fieldProps={{
          showCount: true,
          maxLength: 200,
        }}
        placeholder="请填写驳回原因"
      />
    </ModalForm>
  );
};
