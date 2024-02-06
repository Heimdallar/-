import React, { FC, useState } from 'react';
import { Modal, Button } from 'poizon-design';
import ProForm, { ProFormSelect } from '@poizon-design/pro-form';
import { useRequest } from 'ahooks';
import { ServiceTypeEnum } from '../../../list/constants';
import queryManagerInfo from '@/services/settingColumnsModal/queryManagerInfo';
import queryListCategory from '@/services/serviceProvider/queryListCategory';
import fetchServiceProviderPageService from '@/services/serviceProvider/queryServiceProviderList';
import type { Content } from '@/entities/serviceProvider/interface/queryUserPermissionDataList';
import { RoleTypeOptions, RoleTypeEnum, StatusEnum } from '../../constants';
import useFormData from './useFormData';

export enum modeEnum {
  新建 = 'add',
  编辑 = 'edit',
  预览 = 'preview',
}

interface ListModalProps {
  setVisible: (v: boolean) => void;
  mode: modeEnum;
  detailData?: Content;
  refreshList: () => void;
}

const FormModal: FC<ListModalProps> = (props) => {
  const { setVisible, mode } = props;
  // 企业名称OPTIONS
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  // 关联用户OPTIONS
  const [relatedUserOptions, setRelatedUserOptions] = useState([]);
  // 关联类目OPTIONS
  const [relatedCategoryOptions, setRelatedCategoryOptions] = useState([]);

  const { run: fetchServiceProvider } = useRequest((p) => fetchServiceProviderPageService(p), {
    manual: true,
    onSuccess: (res) => {
      setCompanyNameOptions(res.data || []);
    },
  });

  const { run: fetchManagerInfo } = useRequest((p) => queryManagerInfo(p), {
    debounceWait: 300,
    manual: true,
    onSuccess: (res) => {
      setRelatedUserOptions(res.data || []);
    },
  });

  const { run: fetchListCategory } = useRequest((p) => queryListCategory(p), {
    manual: true,
    onSuccess: (res) => {
      setRelatedCategoryOptions(res.data || []);
    },
  });

  const { formRef, form, submitLoading, onSubmit } = useFormData({
    ...props,
    setCompanyNameOptions,
    setRelatedUserOptions,
    fetchListCategory,
  });

  return (
    <Modal
      visible={true}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
      confirmLoading={submitLoading}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={submitLoading} onClick={onSubmit}>
          提交
        </Button>,
      ]}
      title="基础信息"
    >
      <ProForm
        formRef={formRef}
        form={form}
        autoFocusFirstInput
        layout="horizontal"
        submitter={false}
        {...{ labelCol: { span: 4 }, wrapperCol: { span: 20 } }}
      >
        <ProFormSelect
          label="企业名称"
          name="spId"
          disabled={mode === modeEnum.编辑}
          placeholder="请输入企业名称"
          rules={[{ required: true, message: '企业名称不能为空' }]}
          fieldProps={{
            showSearch: true,
            options: companyNameOptions,
            onChange: (value, record) => {
              const { spSubType } = record;
              formRef.current?.setFieldsValue({
                roleId:
                  spSubType === ServiceTypeEnum.全包型
                    ? RoleTypeEnum.BD跟进人
                    : RoleTypeEnum.线索跟进人,
              });
              fetchListCategory({ spId: value });
              form.setFieldsValue({ categoryIds: [] });
            },
            onSearch: (value) => {
              if (!value) return;
              fetchServiceProvider({
                spName: value,
                spStatus: StatusEnum.启用,
                page: 1,
                pageSize: 100,
              });
            },
          }}
          style={{ width: '100%' }}
        />
        <ProFormSelect
          label="关联用户"
          name="userIds"
          disabled={mode === modeEnum.编辑}
          placeholder="请输入关联用户"
          rules={[{ required: true, message: '关联用户不能为空' }]}
          style={{ width: '100%' }}
          fieldProps={{
            options: relatedUserOptions,
            mode: 'multiple',
            showSearch: true,
            autoClearSearchValue: true,
            onSearch: (value) => {
              if (!value) return;
              fetchManagerInfo({ userName: value });
            },
          }}
        />
        <ProFormSelect
          label="关联类目"
          name="categoryIds"
          placeholder="请输入关联类目"
          rules={[{ required: true, message: '关联类目不能为空' }]}
          fieldProps={{
            options: relatedCategoryOptions,
            showSearch: true,
            mode: 'multiple',
            autoClearSearchValue: true,
          }}
          style={{ width: '100%' }}
        />
        <ProFormSelect
          label="用户角色"
          name="roleId"
          placeholder="请输入用户角色"
          disabled
          rules={[{ required: true, message: '用户角色不能为空' }]}
          fieldProps={{ options: RoleTypeOptions }}
          style={{ width: '100%' }}
        />
      </ProForm>
    </Modal>
  );
};

export default FormModal;
