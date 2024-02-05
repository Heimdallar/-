import ProForm, { ModalForm, ProFormText } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { isEmpty } from 'lodash';
import UserSearch from '@/components/userSearch';
import { createAddress, updateAddress } from '../../api';
import { AddressBookItem } from '../../interface';

interface addressParam {
  addressShow: boolean;
  setRow: React.Dispatch<React.SetStateAction<AddressBookItem | undefined>>;
  setAddressShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: AddressBookItem;
}

export default ({ addressShow, setAddressShow, row, setRow, refreshList }: addressParam) => {
  const isEdit = !isEmpty(row)
  return (
    <ModalForm
      visible={addressShow}
      title={isEdit ? '编辑配置' : '新增配置'}
      width={520}
      initialValues={row}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setAddressShow(false);
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
        const res = isEdit ? await updateAddress(params) : await createAddress(params);
        if (!res) return;
        message.success('提交成功');
        setAddressShow(false);
        setRow(undefined);
        refreshList();
      }}
    >
      <ProForm.Item
        label="运营姓名全拼"
        name="opAccount"
        rules={[{ required: true, message: '请输入运营姓名全拼' }]}
        valuePropName="value"
      >
        <UserSearch disabled={isEdit} />
      </ProForm.Item>
      {isEdit && (
        <ProFormText
          disabled={isEdit}
          name="feiShuName"
          label="运营飞书姓名"
          placeholder="运营飞书姓名"
        />
      )}
      <ProFormText
        name="opName"
        label="运营对外姓名"
        rules={[
          { required: true, message: '请输入联系人姓名' },
          { max: 20, message: '联系人姓名长度不超过20' },
        ]}
        placeholder="请输入联系人姓名"
      />
      <ProFormText
        name="contactPhone"
        label="手机号码"
        rules={[
          { required: true, message: '请输入联系人手机号码' },
          {
            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '请输入正确格式的手机号码',
          },
        ]}
        placeholder="请输入联系人手机号码"
      />
      <ProFormText
        name="contactWechat"
        label="联系微信号"
        rules={[
          { required: true, message: '请输入联系微信号' },
          { max: 20, message: '联系微信号长度不超过20' },
        ]}
        placeholder="请输入联系微信号"
      />
      <ProFormText
        name="contactEmail"
        label="联系邮箱"
        rules={[
          { required: true, message: '请输入联系邮箱' },
          { max: 50, message: '邮箱长度不超过50' },
          {
            pattern: /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/,
            message: '请输入正确格式的邮箱',
          },
        ]}
        placeholder="请输入联系邮箱"
      />
    </ModalForm>
  );
};
