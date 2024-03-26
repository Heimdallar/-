import ProForm, { ProFormText, ProFormList } from '@poizon-design/pro-form';
import ProCard from '@poizon-design/pro-card';

export default function BrandEnterprise() {
  return (
    <ProFormList
      name="leadsContactInfoRequestList"
      // label="联系人"
      creatorButtonProps={{
        creatorButtonText: '添加联系人',
        type: 'primary',
        style: {
          width: 200,
          marginLeft: 130,
        },
      }}
      min={1}
      max={10}
      initialValue={[{}]}
      copyIconProps={false}
      itemRender={({ listDom, action }, { index }) => (
        <ProCard
          bordered
          style={{ marginBottom: 8 }}
          title={`联系人${index + 1}`}
          extra={action}
          bodyStyle={{ paddingBottom: 0 }}
        >
          {listDom}
        </ProCard>
      )}
    >
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="contactName"
        label="联系人姓名"
        rules={[{ max: 20, message: '最多20个字符' }]}
        placeholder="请输入联系人姓名"
        labelCol={{ span: 5 }}
      />
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="contactTitle"
        label="联系人职位"
        rules={[{ max: 20, message: '最多20个字符' }]}
        placeholder="请输入联系人职位"
        labelCol={{ span: 5 }}
      />
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="contactMobileNumber"
        label="联系人手机号码"
        required
        rules={[
          { max: 11, message: '最多11个字符' },
          {
            pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '请输入正确的手机号码',
          },
        ]}
        labelCol={{ span: 5 }}
      />
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="contactWechat"
        label="联系微信号"
        rules={[{ max: 20, message: '最多20个字符' }]}
        placeholder="请输入联系微信号"
        labelCol={{ span: 5 }}
      />
      
    </ProFormList>
  );
}
