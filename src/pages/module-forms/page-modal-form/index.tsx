import { FC, useRef, useState } from 'react';
import { Button, Card, Form, Select } from 'poizon-design';
import {
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormInstance,
  ProFormMoney,
  ModalForm,
  ProFormList,
  ProForm,
} from '@poizon-design/pro-form';
import ProUpload, { UploadScene } from '@/components/ProUpload/index';
import DuUpload from '@poizon-design/upload';
import { BusinessTypeEum, BusinessTypeMap } from '../page-step-form/constant';
import './index.less';

/**
 * 得物ModalForm
 * @figma https://www.figma.com/file/dSgEssQTqJ0ZylRBNnmxrK/POIZON-Design-Pro?node-id=571%3A2707
 * @author qiukaixiang
 * @update 2022.09
 */
const DuModalForm: FC = () => {
  const formRef = useRef<ProFormInstance>();
  const [visible, setVisible] = useState(true);

  return (
    <Card title="弹窗表单" bordered={false}>
      <ModalForm
        title="弹框表单"
        visible={visible}
        trigger={<Button type="primary">点击打开弹框表单</Button>}
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 6 }}
        onFinish={async (value) => {
          console.log({ value });
        }}
        onVisibleChange={(e) => setVisible(e)}
      >
        <ProFormRadio.Group
          name="name1"
          label="关联字段"
          options={[
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '请输入' }]}
        />
        <ProFormSelect
          label="商家类型"
          name="businessType"
          valueEnum={BusinessTypeMap}
          placeholder="请选择"
          rules={[{ required: true, message: '请选择' }]}
          width={200}
          tooltip="商家类型"
        />
        <ProFormDependency name={['businessType']}>
          {({ businessType }) => {
            if (businessType === BusinessTypeEum.COMPANY) {
              return (
                <ProFormText
                  name="companyNo"
                  label="企业编号2"
                  width={200}
                  validateTrigger={['onChange', 'onBlur']}
                  fieldProps={{
                    maxLength: 50,
                  }}
                  rules={[
                    { required: true, message: '请输入' },
                    {
                      validateTrigger: 'onBlur',
                      validator: async (_, value) => {
                        if (!value) return;
                        let errorTips = '';
                        if (value.length > 11) {
                          errorTips = `企业编号2最多11个字符`;
                        }

                        if (/[^0-9a-zA-Z]/.test(value)) {
                          errorTips = `企业编号2由字母、数字组成`;
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
        <Form.Item label="企业营业执照" name="licence" valuePropName="fileList">
          {/* 得物上传组件：https://pd.shizhuang-inc.com/material/@poizon-design/upload */}
          <ProUpload
            bizCode="merchant_entry"
            accept=".png,.jpg,.jpeg"
            listType="picture-card"
            size={10}
            scene={UploadScene.crm}
            toCdn
            maxCount={1}
            tips={<span>请上传联系方式，文件格式限制为png/jpg，不可超过10M</span>}
          />
        </Form.Item>
        <ProFormText
          label="公司注册名称"
          name="companyName2"
          width={300}
          placeholder="上传营业执照后自动填充"
          rules={[{ required: true, message: '请输入' }]}
        />
        <ProFormMoney
          label="注册资本(万)"
          name="registerMoney"
          locale="zh-CN"
          initialValue={100.2}
          fieldProps={{
            moneySymbol: false,
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
        <ProFormList
          name="users"
          initialValue={[
            {
              useMode: 'chapter',
            },
          ]}
          creatorButtonProps={{
            position: 'top',
            creatorButtonText: '再建一行',
          }}
          creatorRecord={{
            useMode: 'none',
          }}
          min={1}
          max={10}
        >
          <ProFormSelect
            key="useMode"
            options={[
              {
                value: 'chapter',
                label: '盖章后生效',
              },
              {
                value: 'none',
                label: '不生效',
              },
            ]}
            width={150}
            name="useMode"
            label="生效方式"
          />
          <ProFormDependency name={['useMode']}>
            {({ useMode }) => {
              if (useMode === 'chapter') {
                /**
                 * Error 提醒：ProFormList 中的ProFormDependency 必须使用ProForm.Item,Form.Item Select 的路径会解析错误
                 */
                return (
                  // Error <Form.Item name="gender" label="Gender">
                  <ProForm.Item name="gender" label="性别" style={{ marginLeft: '20px' }}>
                    <Select
                      style={{ width: 120 }}
                      placeholder="选择性别"
                      options={[
                        {
                          value: '1',
                          label: '男',
                        },
                        {
                          value: '0',
                          label: '女',
                        },
                      ]}
                      allowClear
                    />
                  </ProForm.Item>
                );
              }
              return <div />;
            }}
          </ProFormDependency>
        </ProFormList>
      </ModalForm>
    </Card>
  );
};

export default DuModalForm;
