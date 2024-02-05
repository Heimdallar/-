import { useRef } from 'react';
import ProForm, { ModalForm, ProFormInstance } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { updateCategory } from '../../api';
import { CategoryItem, editCategoryItem, FollowerInfo } from '../../interface';
import { isEmpty } from 'lodash';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import { maxTags } from '../config';

interface categoryParam {
  categoryShow: boolean;
  setRow: React.Dispatch<React.SetStateAction<editCategoryItem | undefined>>;
  setCategoryShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: editCategoryItem;
}

export default ({ categoryShow, setCategoryShow, row, setRow, refreshList }: categoryParam) => {
  const isEdit = !isEmpty(row)
  const initValues = isEdit ? row : { level1Category: undefined, followerIdList: undefined}
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm
      visible={categoryShow}
      formRef={formRef}
      title={isEdit ? '编辑配置' : '新增配置'}
      width={520}
      initialValues={initValues}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setCategoryShow(false);
          setRow(undefined)
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
        }
        const { level1Category, followerIdList } = params
        const { value, label } = level1Category
        const requestParams = {
          level1CategoryId: value,
          level1CategoryName: label,
          add: !isEdit,
          categoryManagerList: [
            {
              followType: 4,
              followerInfoList: followerIdList.map(
                (item: any): FollowerInfo => ({
                  followerId: item.value,
                  followerName: item.label,
                }),
              ),
            },
          ],
        }
        
        const res = await updateCategory(requestParams);
        if (!res) return;
        message.success('提交成功');
        setCategoryShow(false);
        setRow(undefined)
        refreshList()
      }}
      onValuesChange = {(values) => {
        const { followerIdList } = values
        if(isEmpty(followerIdList)) return
        if (followerIdList.length > maxTags) {
          message.warning(`不能超过${maxTags}个`)
          followerIdList.pop()
          formRef.current?.setFieldsValue({
            'followerIdList': followerIdList
          })
          return
        }
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
        label="申请审核人"
        name="followerIdList"
        rules={[{ required: true, message: '请输入申请审核人' }]}
      >
        <UserSelect labelInValue placeholder="请输入申请审核人" dynamicLoad mode="multiple" />
      </ProForm.Item>
    </ModalForm>
  );
};
