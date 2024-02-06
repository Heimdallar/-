import { useEffect, useRef, useState } from 'react';
import ProForm, {
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
} from '@poizon-design/pro-form';
import { useRequest } from 'ahooks';
import { Button, message, Popconfirm } from 'poizon-design';
import type { SelectedNodeDataProps } from '../../../../index';
import { orgTypeList, roleTypeList } from '../../../../constants';
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
}

const DepDetail = (props: FormProps) => {
  const { selectedNodeData = {}, categoryList = [], queryTree } = props;
  const { orgId } = selectedNodeData as SelectedNodeDataProps;
  const formRef = useRef();

  // 负责人options
  const [dutyUserOptions, setDutyUserOptions] = useState<categoryListProps[]>([]);

  const { run: fetchManagerInfo } = useRequest((p) => queryManagerInfo(p), {
    debounceWait: 300,
    manual: true,
    onSuccess: (res) => {
      setDutyUserOptions(res.data || []);
    },
  });

  useEffect(() => {
    formRef.current.resetFields();
  }, [orgId]);

  const save = async () => {
    formRef.current.validateFieldsReturnFormatValue().then(async (values) => {
      const parmas = {
        ...values,
        parentId: orgId,
      };
      const { code } = await addOrUpdateOrg(parmas);
      if (code !== 200) return;
      message.success('保存成功');
      queryTree?.();
      formRef.current.resetFields();
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
                <Popconfirm title="确认新增子部门么？" onConfirm={save}>
                  <Button type="primary">保存</Button>
                </Popconfirm>
              </div>
            );
          },
        }}
      >
        <ProFormTextArea
          width="md"
          name="orgName"
          label="子部门名称"
          required
          fieldProps={{ showCount: true, maxLength: 50 }}
          rules={[
            { required: true, message: '请输入子部门名称' },
            { pattern: /\S/, message: '请输入子部门名称' },
            { max: 50, message: '子部门名称不能超过50个字符' },
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
            autoClearSearchValue: true,
          }}
          rules={[{ required: true, message: '请选择负责类目' }]}
        />
        <ProFormRadio.Group
          label="部门类型"
          name="orgType"
          options={orgTypeList}
          required
          rules={[{ required: true, message: '请选择部门类型' }]}
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
            autoClearSearchValue: true,
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
            autoClearSearchValue: true,
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
