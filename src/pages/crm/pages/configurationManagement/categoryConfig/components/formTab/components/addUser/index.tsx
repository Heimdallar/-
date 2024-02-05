import React, { useEffect, useRef, useState } from 'react';
import ProForm, { ProFormSelect } from '@poizon-design/pro-form';
import { useRequest } from 'ahooks';
import { Button, message, Popconfirm } from 'poizon-design';
import type { SelectedNodeDataProps } from '../../../../index';
import { rootId, roleTypeList } from '../../../../constants';
import querySelectOrgUser from '@/services/configurationManagement/querySelectOrgUser';
import queryManagerInfo from '@/services/settingColumnsModal/queryManagerInfo';
import addUpdateOrgUser from '@/services/configurationManagement/addUpdateOrgUser';
import styles from './index.module.less';

interface FormProps {
  selectedNodeData: SelectedNodeDataProps;
}

const AddUser = (props: FormProps) => {
  const { selectedNodeData = {} } = props;
  const { orgId } = selectedNodeData as SelectedNodeDataProps;
  const formRef = useRef();

  // 请求关联信息
  useRequest(
    () =>
      querySelectOrgUser({
        orgId,
      }),
    {
      ready: orgId === rootId || !!orgId,
      refreshDeps: [orgId],
      onSuccess: (res) => {
        const { orgUsers = [], roleIds = [], userIds = [] } = res.data || {};
        formRef.current?.setFieldsValue({
          roleIds,
          userIds: orgUsers,
        });
      },
    },
  );

  const { runAsync: fetchManagerInfo } = useRequest((p) => queryManagerInfo(p), {
    debounceWait: 300,
    manual: true,
  });

  const save = async () => {
    formRef.current.validateFieldsReturnFormatValue().then(async (values) => {
      const { code } = await addUpdateOrgUser({
        ...values,
        orgId,
        userIds: values.userIds.map((item) => item.value),
      });
      if (code !== 200) return;
      message.success('保存成功');
    });
  };

  return (
    <div className={styles.proForm}>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          render: (props, dom) => {
            return (
              <div style={{ paddingLeft: 160 }}>
                <Popconfirm title="确认关联用户么？" onConfirm={save}>
                  <Button type="primary">保存</Button>
                </Popconfirm>
              </div>
            );
          },
        }}
      >
        <ProFormSelect
          width="md"
          name="userIds"
          label="关联用户"
          required
          rules={[{ required: true, message: '请选择关联用户' }]}
          request={async ({ keyWords }) => {
            if (!keyWords) return;
            const res = await fetchManagerInfo({ userName: keyWords });
            return res.data || [];
          }}
          fieldProps={{
            mode: 'multiple',
            showSearch: true,
            autoClearSearchValue: true,
            labelInValue: true,
          }}
        />
        <ProFormSelect
          width="md"
          name="roleIds"
          label="用户岗位"
          required
          options={roleTypeList}
          fieldProps={{
            mode: 'multiple',
            autoClearSearchValue: true,
          }}
          rules={[{ required: true, message: '请选择用户岗位' }]}
        />
      </ProForm>
    </div>
  );
};

export default AddUser;
