import ProForm, { ModalForm } from '@poizon-design/pro-form';
import React from 'react';
import { Button } from 'poizon-design';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import fetchPlatformManagerQueryService from '@/services/leadManagement/categoryConfig/fetchQueryPlatformManager';
import fetchPlatformManagerAddOrUpdateService from '@/services/leadManagement/categoryConfig/fetchPlatformManagerAddOrUpdate';

const PlatformManagerModal: React.FC = () => {
  return (
    <ModalForm
      layout="horizontal"
      title="平台管理员配置"
      width={500}
      modalProps={{
        destroyOnClose: true,
      }}
      trigger={<Button type="primary">平台管理员配置</Button>}
      request={async () => {
        const res = await fetchPlatformManagerQueryService();
        const followerInfoList = res.data.map((item) => ({
          label: item.followerName,
          value: item.followerId,
          key: item.followerId,
        }));
        return { followerInfoList };
      }}
      onFinish={async (value) => {
        const followerInfoList = value.followerInfoList.map((item) => {
          return {
            followerName: item.label,
            followerId: item.value,
          };
        });
        const res = await fetchPlatformManagerAddOrUpdateService({ followerInfoList });
        return res.data;
      }}
    >
      <ProForm.Item
        label="平台管理员"
        name="followerInfoList"
        rules={[{ required: true, message: '请输入平台管理员' }]}
      >
        <UserSelect labelInValue max={50} dynamicLoad placeholder="请输入管理员" mode="multiple" />
      </ProForm.Item>
    </ModalForm>
  );
};

export default PlatformManagerModal;
