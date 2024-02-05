import { ModalForm, ProFormSelect } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import fetchClueAddLabelService from '@/services/privateSea/addLabel';
import { queryLabelList } from '../../api';

interface BatChItem {
  labelVisible: boolean;
  batchLeadId: number;
  batchCustomerSeaId: number;
  setLabelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBatchCustomerSeaId: React.Dispatch<React.SetStateAction<number>>;
  initLabel?: number[];
  refreshList: () => void;
}

export default ({
  labelVisible,
  setLabelVisible,
  batchLeadId,
  initLabel,
  setBatchCustomerSeaId,
  refreshList,
}: BatChItem) => {
  return (
    <ModalForm
      visible={labelVisible}
      title="线索打标"
      width={520}
      labelCol={{ span: 4 }}
      initialValues={{
        labelIds: initLabel,
      }}
      wrapperCol={{ span: 14 }}
      onVisibleChange={(val) => {
        if (!val) {
          setLabelVisible(false);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async ({ labelIds }) => {
        const requestParams = {
          leadsId: batchLeadId,
          labelIds,
        };
        await fetchClueAddLabelService(requestParams);
        message.success('打标成功');
        setBatchCustomerSeaId(0);
        setLabelVisible(false);
        refreshList();
      }}
    >
      <ProFormSelect
        name="labelIds"
        width="sm"
        label="线索标签"
        fieldProps={{
          mode: 'multiple',
          placeholder: '请选择线索标签',
        }}
        rules={[{ required: true, message: '请选择线索标签' }]}
        request={async () => {
          const resp: any = await queryLabelList({});
          return resp.map((item: any) => {
            return {
              label: item.title,
              value: item.value,
            };
          });
        }}
      />
    </ModalForm>
  );
};
