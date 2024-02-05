import { useRef } from 'react';
import ProForm, { ModalForm, ProFormInstance } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { isEmpty } from 'lodash';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import { FollowerInfo, followFormItem } from '../../interface';
import { updateCategory } from '../../api';
import { maxTags } from '../../config';
import { transferKvToFollowInfo } from '../util';

interface categoryParam {
  categoryShow: boolean;
  setRow: React.Dispatch<React.SetStateAction<followFormItem | undefined>>;
  setCategoryShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: followFormItem;
}

export default ({ categoryShow, setCategoryShow, row, setRow, refreshList }: categoryParam) => {
  const isEdit = !isEmpty(row);
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm
      visible={categoryShow}
      formRef={formRef}
      title={isEdit ? '编辑配置' : '新增配置'}
      width={520}
      initialValues={row}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setCategoryShow(false);
          setRow(undefined);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: false,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const params = {
          ...row,
          ...values,
        };
        const {
          level1Category: { value: level1CategoryId, label: level1CategoryName },
          maintain,
          bd,
          administrators,
        } = params;
        const categoryManagerList = [
          transferKvToFollowInfo(1, maintain),
          transferKvToFollowInfo(2, bd),
          transferKvToFollowInfo(3, administrators),
        ];
        const requestParams = {
          add: !isEdit,
          level1CategoryId,
          level1CategoryName,
          categoryManagerList,
        };
        const res = await updateCategory(requestParams);
        if (res?.code && res.code !== 200) return;
        message.success(isEdit ? '编辑成功' : '添加成功');
        setCategoryShow(false);
        setRow(undefined);
        refreshList();
      }}
    >
      <ProForm.Item
        label="一级类目名称"
        name="level1Category"
        rules={[{ required: true, message: '请选择一级类目名称' }]}
      >
        <CategorySelect isIdValue placeholder="请选择一级类目名称" labelInValue disabled={isEdit} />
      </ProForm.Item>
      <ProForm.Item
        label="线索维护人"
        name="maintain"
        rules={[{ required: true, message: '请输入线索维护人' }]}
      >
        <UserSelect
          labelInValue
          max={100}
          placeholder="请输入线索维护人"
          dynamicLoad
          mode="multiple"
        />
      </ProForm.Item>
      <ProForm.Item label="类目BD" name="bd" rules={[{ required: true, message: '请输入类目BD' }]}>
        <UserSelect labelInValue max={100} dynamicLoad placeholder="请输入类目BD" mode="multiple" />
      </ProForm.Item>
      <ProForm.Item
        label="类目管理员"
        name="administrators"
        rules={[{ required: true, message: '请输入类目管理员' }]}
      >
        <UserSelect
          labelInValue
          max={100}
          dynamicLoad
          placeholder="请输入类目管理员"
          mode="multiple"
        />
      </ProForm.Item>
    </ModalForm>
  );
};
