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
        placeholder="和联系座机号，二者至少填写一个"
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
        name="contactTelephone"
        label="联系座机号"
        placeholder="和联系人手机号码，二者至少填写一个"
        required
        rules={[
          { max: 20, message: '最多20个字符' },
          { pattern: /^\d+$/, message: '只能输入数字' },
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
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="contactWeibo"
        label="联系微博"
        placeholder="请输入联系微博"
        rules={[{ max: 20, message: '最多20个字符' }]}
        labelCol={{ span: 5 }}
      />
      <ProFormText
        style={{ padding: 0 }}
        width="md"
        name="contactEmail"
        label="联系邮箱"
        placeholder="请输入联系邮箱"
        rules={[
          { max: 50, message: '最多50个字符' },
          {
            pattern: /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/,
            message: '请输入正确的邮箱',
          },
        ]}
        labelCol={{ span: 5 }}
      />
    </ProFormList>
  );
}
