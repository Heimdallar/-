import React, { useEffect, useRef, useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
} from '@poizon-design/pro-form';
import { useRequest } from 'ahooks';
import { Button, message, Popconfirm } from 'poizon-design';
import type { SelectedNodeDataProps } from '../../../../index';
import { orgTypeList, rootId, roleTypeList } from '../../../../constants';
import querySelectOrgInfo from '@/services/configurationManagement/querySelectOrgInfo';
import queryManagerInfo from '@/services/settingColumnsModal/queryManagerInfo';
import addOrUpdateOrg from '@/services/configurationManagement/addOrUpdateOrg';
import styles from './index.module.less';

type categoryListProps = {
  label: string;
  value: string;
};
interface FormProps {
  categoryList: categoryListProps[];
  selectedNodeData: SelectedNodeDataProps;
  queryTree: () => void;
  setAddDepCategoryList: (value: categoryListProps[]) => void;
}

const DepDetail = (props: FormProps) => {
  const { selectedNodeData = {}, categoryList = [], queryTree, setAddDepCategoryList } = props;
  const { orgId } = selectedNodeData as SelectedNodeDataProps;
  const formRef = useRef();
  // 负责类目数组
  const [dutyCategoryList, setDutyCategoryList] = useState<number[]>([]);

  // 负责人options
  const [dutyUserOptions, setDutyUserOptions] = useState<categoryListProps[]>([]);

  const { run } = useRequest(
    () =>
      querySelectOrgInfo({
        orgId,
      }),
    {
      ready: orgId === rootId || !!orgId,
      refreshDeps: [orgId],
      onSuccess: (res) => {
        setDutyUserOptions(res.data?.dutyUserOptions || []);
        setDutyCategoryList(res.data?.data || []);
        formRef.current?.setFieldsValue(res.data);
      },
    },
  );

  const { run: fetchManagerInfo } = useRequest((p) => queryManagerInfo(p), {
    debounceWait: 300,
    manual: true,
    onSuccess: (res) => {
      setDutyUserOptions(res.data || []);
    },
  });

  const save = async () => {
    formRef.current.validateFieldsReturnFormatValue().then(async (values) => {
      const { code } = await addOrUpdateOrg(values);
      if (code !== 200) return;
      message.success('保存成功');
      run();
      queryTree?.();
    });
  };

  useEffect(() => {
    if (categoryList.length && dutyCategoryList.length) {
      const temp = categoryList.filter((item) => dutyCategoryList.some((i) => i === item.value));
      setAddDepCategoryList(temp);
    }
  }, [dutyCategoryList, categoryList]);

  return (
    <div className={styles.proForm}>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          render: (props, dom) => {
            return (
              <div style={{ paddingLeft: 160 }}>
                <Popconfirm title="确认保存么？" onConfirm={save}>
                  <Button type="primary">保存</Button>
                </Popconfirm>
              </div>
            );
          },
        }}
      >
        <ProFormText width="md" name="orgId" label="部门编码" required disabled />
        <ProFormTextArea
          width="md"
          name="orgName"
          label="部门名称"
          required
          fieldProps={{ showCount: true, maxLength: 50 }}
          rules={[
            { required: true, message: '请输入部门名称' },
            { pattern: /\S/, message: '请输入部门名称' },
            { max: 50, message: '部门名称不能超过50个字符' },
          ]}
        />
        <ProFormSelect
          width="md"
          name="data"
          label="负责类目"
          required
          options={categoryList}
          fieldProps={{
            mode: 'multiple',
          }}
          rules={[{ required: true, message: '请选择负责类目' }]}
        />
        <ProFormRadio.Group
          label="部门类型"
          name="orgType"
          options={orgTypeList}
          required
          disabled
        />
        <ProFormSelect
          width="md"
          name="userId"
          label="部门负责人"
          required
          rules={[{ required: true, message: '请选择部门负责人' }]}
          fieldProps={{
            options: dutyUserOptions,
            showSearch: true,
            onSearch: (value) => {
              if (!value) return;
              fetchManagerInfo({ userName: value });
            },
          }}
        />
        <ProFormSelect
          width="md"
          name="roleIds"
          label="负责人岗位"
          required
          options={roleTypeList}
          fieldProps={{
            mode: 'multiple',
          }}
          rules={[{ required: true, message: '请选择负责人岗位' }]}
        />
        <ProFormDigit
          width="md"
          name="sort"
          label="排序"
          required
          min={1}
          max={999}
          tooltip="数字越小越靠前"
          rules={[{ required: true, message: '请输入排序' }]}
        />
      </ProForm>
    </div>
  );
};

export default DepDetail;
