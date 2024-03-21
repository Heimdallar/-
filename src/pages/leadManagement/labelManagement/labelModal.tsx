import { useRef } from 'react';
import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from '@poizon-design/pro-form';
import { isEmpty } from 'lodash';
import { message, Switch } from 'poizon-design';
import { EditLabelItem } from '../labelManagement/interface';
import { updateLabel } from '../labelManagement/service';

interface categoryParam {
  labelShow: boolean;
  setRow: React.Dispatch<React.SetStateAction<EditLabelItem | undefined>>;
  setLabelShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: EditLabelItem;
}

export default ({ labelShow, setLabelShow, row, setRow, refreshList }: categoryParam) => {
  const isEdit = !isEmpty(row);
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm
      visible={labelShow}
      formRef={formRef}
      title={isEdit ? '编辑标签' : '新增标签'}
      width={520}
      initialValues={row}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setLabelShow(false);
          setRow(undefined);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const params = {
          ...row,
          ...values,
        };
        const { status, ...rest } = params;
        const requestParams = {
          ...rest,
          status: status ? 0 : 1,
        };

        const res = await updateLabel(requestParams);
        if (!res) return;
        message.success('提交成功');
        setLabelShow(false);
        setRow(undefined);
        refreshList();
      }}
    >
      <ProFormText
        name="labelName"
        label="标签名称"
        rules={[
          { required: true, message: '请输入标签名称' },
          { max: 20, message: '标签名称长度不超过50' },
        ]}
        placeholder="请输入标签名称"
      />
      <ProFormSelect
        name="labelChannel"
        label="标签渠道"
        rules={[{ required: true, message: '请选择标签渠道' }]}
        options={[
          {
            value: '0',
            label: '线下',
          },
          {
            value: '1',
            label: '线上',
          },
          {
            value: '2',
            label: '其他',
          },
        ]}
      />
      <ProForm.Item label="是否启用" name="status" valuePropName="checked">
        <Switch />
      </ProForm.Item>
    </ModalForm>
  );
};
