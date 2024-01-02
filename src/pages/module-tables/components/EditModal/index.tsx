import { useCallback, useEffect, useRef, FC } from 'react';
import { isEmpty } from 'lodash';
import { Modal, message, Form } from 'poizon-design';
import {
  ProForm,
  ProFormGroup,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormInstance,
  ProFormMoney,
} from '@poizon-design/pro-form';
import DuUpload from '@poizon-design/upload';
import { IUpdateMerchantType } from '@/pages/module-tables/service/interface';
import { BusinessTypeEum, BusinessTypeMap } from '@/pages/module-forms/page-step-form/constant';
import { PageStoreContext } from '@/pages/module-tables/store';
import { EditModalType } from '@/pages/module-tables/constants';
import styles from './index.less';

interface EditModalProps {
  type: EditModalType;
  visible: boolean;
  initialValue: IUpdateMerchantType | unknown;
  updating: boolean;
  onSubmit: (initialValue: IUpdateMerchantType | unknown, type: EditModalType) => void;
  onClose: () => void;
}

// 数据表格
export const EditModal: FC<EditModalProps> = (props) => {
  const formRef = useRef<ProFormInstance<IUpdateMerchantType>>();
  const [form] = ProForm.useForm<IUpdateMerchantType>();
  const { enums } = PageStoreContext.useContainer();
  const { type, visible, updating, onSubmit, onClose, initialValue } = props;

  const handleOk = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const params = {
        ...(initialValue || {}),
        ...values,
      };
      onSubmit(params, type);
    } catch (e: any) {
      if (e.errorFields.length) {
        message.warn('这里是全局验证信息');
      }
    }
  }, [form, type, initialValue, onSubmit]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  useEffect(() => {
    if (isEmpty(initialValue)) {
      form.resetFields();
    } else {
      form.setFieldsValue({
        orderType: 'standard',
        businessType: 'company',
        companyName: '上海手表厂',
        companyNo: (initialValue as IUpdateMerchantType).title,
      });
    }
  }, [initialValue, visible, form]);

  return (
    <Modal
      destroyOnClose
      title={`${type}条目`}
      visible={visible}
      onOk={handleOk}
      confirmLoading={updating}
      onCancel={handleCancel}
    >
      <ProForm
        formRef={formRef}
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        submitter={false}
      >
        <ProFormGroup
          title="商品分类信息"
          tooltip="补充提示"
          spaceProps={{ className: styles.spaceItem }}
          collapsible={true}
        >
          <ProFormRadio.Group
            name="orderType"
            label="商品类型"
            // 远程枚举
            valueEnum={enums.orderType}
            rules={[{ required: true, message: '请输入商品类型' }]}
          />
          <ProFormSelect
            label="商家类型"
            name="businessType"
            // 本地枚举
            valueEnum={BusinessTypeMap}
            disabled={type === EditModalType.EDIT}
            placeholder="请选择"
            rules={[{ required: true, message: '请选择商家类型' }]}
            width={200}
            tooltip="商家类型"
          />
          {/* 依赖关系 */}
          <ProFormDependency name={['businessType']}>
            {({ businessType }) => {
              if (businessType === BusinessTypeEum.COMPANY) {
                return (
                  <ProFormText
                    name="companyNo"
                    label="企业编号"
                    width={200}
                    validateTrigger={['onChange', 'onBlur']}
                    fieldProps={{
                      maxLength: 50,
                    }}
                    rules={[
                      { required: true, message: '请输入企业编号' },
                      {
                        validateTrigger: 'onBlur',
                        validator: async (_, value) => {
                          if (!value) return;
                          let errorTips = '';
                          if (value.length > 11) {
                            errorTips = `企业编号最多11个字符`;
                          }

                          if (/[^0-9a-zA-Z]/.test(value)) {
                            errorTips = `企业编号由字母、数字组成`;
                          }

                          if (errorTips) {
                            await Promise.reject(new Error(errorTips));
                          }

                          await Promise.resolve();
                        },
                      },
                    ]}
                  />
                );
              }
              return <div />;
            }}
          </ProFormDependency>
          <Form.Item label="营业执照" name="licenceImg">
            {/* 得物上传组件：https://pd.shizhuang-inc.com/material/@poizon-design/upload */}
            <DuUpload
              accept=".png,.jpg,.jpeg"
              maxCount={1}
              name="licenceImg"
              uploadBtnText="营业执照"
            />
          </Form.Item>
        </ProFormGroup>
        <ProFormGroup
          title="商家分类信息"
          tooltip="补充提示"
          spaceProps={{ className: styles.spaceItem }}
          collapsible={true}
        >
          <ProFormText
            label="公司注册名称"
            name="companyName"
            width={300}
            placeholder="上传营业执照后自动填充"
            rules={[{ required: true, message: '请输入公司注册名称' }]}
          />
          <ProFormMoney
            label="注册资本(万)"
            name="registerMoney"
            locale="zh-CN"
            initialValue={100000.2}
            fieldProps={{
              moneySymbol: false,
            }}
            // 提交至服务端之前做 Field 级别的数据转换/清洗
            transform={(value) => {
              return {
                registerMoney: Number(value).toFixed(2),
              };
            }}
            min={0}
            width={200}
          />
          <ProFormTextArea
            name="introduction"
            readonly={false}
            label="介绍"
            width={300}
            placeholder="请输入,最多100个字符"
            fieldProps={{
              maxLength: 100,
              autoSize: {
                minRows: 3,
                maxRows: 3,
              },
            }}
          />
        </ProFormGroup>
      </ProForm>
    </Modal>
  );
};
