import React, { useState, useRef, useEffect } from 'react';
import { Form, message } from 'poizon-design';
import { ProFormInstance } from '@poizon-design/pro-form';
import addUserPermissionData from '@/services/serviceProvider/addUserPermissionData';
import updateUserPermissionData from '@/services/serviceProvider/updateUserPermissionData';
import type { Content } from '@/entities/serviceProvider/interface/queryUserPermissionDataList';
import { modeEnum } from './index';

type Options = {
  label: string;
  value: string;
};
interface UseFormDataProps {
  setVisible: (visible: boolean) => void;
  refreshList: () => void;
  mode: modeEnum;
  detailData?: Content;
  setCompanyNameOptions: (options: Options) => void;
  setRelatedUserOptions: (options: Options) => void;
  fetchListCategory: (spId: number) => void;
}

export default function useFormData(props: UseFormDataProps) {
  const {
    setVisible,
    mode,
    refreshList,
    detailData,
    setCompanyNameOptions,
    setRelatedUserOptions,
    fetchListCategory,
  } = props;
  const formRef = useRef<ProFormInstance>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === modeEnum.编辑) {
      const { spId, roleId, spName, userId, userName, categoryList } = detailData || {};

      form.setFieldsValue({
        spId,
        roleId,
        userIds: userId,
        categoryIds: categoryList?.map((item) => item.value),
      });
      setCompanyNameOptions([{ label: spName, value: spId }]);
      setRelatedUserOptions([{ label: userName, value: userId }]);
      fetchListCategory({ spId });
    }
  }, []);

  async function onSubmit() {
    try {
      if (formRef) {
        const formInfo = await formRef.current?.validateFields();
        if (mode === modeEnum.编辑) {
          const res = await updateUserPermissionData({
            categoryIds: formInfo.categoryIds,
            id: detailData?.id,
          });
          if (res.success) {
            message.success('编辑成功');
            refreshList();
            setVisible(false);
          }
          return;
        }

        setSubmitLoading(true);
        const res = await addUserPermissionData(formInfo);
        if (res.success) {
          message.success('添加成功');
          refreshList();
          setVisible(false);
        }
        setSubmitLoading(false);
      }
    } catch (errorInfo) {}
  }
  return { formRef, onSubmit, form, submitLoading };
}
