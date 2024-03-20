import { Form, Input, Checkbox,Select } from 'poizon-design';
import React from 'react';


const Pageform = () => {
    const { Option } = Select;

  const onFinish = (values:any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  const onChange = (value: string) => {
    console.log('onchange')
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="公司名称"
        name="companyName"
        rules={[
          {
            required: true,
            message: '请输入贵公司名称',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={50} />

      </Form.Item>

      <Form.Item
        label="主营品牌"
        name="brand"
        rules={[
          {
            required: true,
            message: '主营品牌',
          },
        ]}
      >
          <Input />
      </Form.Item>
      <Form.Item name="category" label="主营类目" rules={[{ required: true }]}>
          <Select
            placeholder="请选择"
            onChange={onChange}
          >
            <Option value="kobe">科比布莱恩特</Option>
          </Select>
        </Form.Item>
        <Form.Item
        label="联系人"
        name="contanct"
        rules={[
          {
            required: true,
            message: '请输入联系人姓名',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={20} />

      </Form.Item>
        <Form.Item name="brandCategory" label="品牌资质类型" >
          <Select
            placeholder="请选择"
            onChange={onChange}
            allowClear
          >
          
           <Option value=''>品牌方</Option>
           <Option value=''>扫货商</Option>
           <Option value="">经销商</Option>
           <Option value="">市场贸易商</Option>
          </Select>
        </Form.Item>
        <Form.Item name="brandClass" label="品牌类型" rules={[{ required: true }]}>
          <Select
            placeholder="请选择"
            onChange={onChange}
          >
            <Option value="kobe">科比布莱恩特</Option>
            <Option value="bill">没笑</Option>
            <Option value="jame">我靠</Option>
          </Select>
        </Form.Item>
        <Form.Item name="road" label="外网店铺渠道" rules={[{ required: true }]}>
          <Select
            placeholder="请选择"
            onChange={onChange}
          >
            <Option value=''>天猫</Option>
            <Option value=''>淘宝</Option>
            <Option value=''>京东</Option>
            <Option value=''>小红</Option>
            <Option value=''>网易严选</Option>
            <Option value=''>考拉还购</Option>
            <Option value=''>线下门店</Option>
          </Select>
        </Form.Item>
        <Form.Item
        label="店铺名称"
        name="storeName"
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
      >
        <Input.TextArea  showCount maxLength={50} />

      </Form.Item>
      <Form.Item
        label="店铺地址"
        name="StroeAddress"
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />

      </Form.Item>

<Form.Item
        label="年销售总金额(亿)"
        name="money"
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
      >
        <Input  />

      </Form.Item>

      <Form.Item
        label="小红书帖子数(条)"
        name="redBook"
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
      >
        <Input />

      </Form.Item>

      <Form.Item
        label="抖音官方账号粉丝数(人)"
        name="fans"
        rules={[
          {
            required: true,
            message: '请输入',
          },
        ]}
      >
        <Input  />

      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox> 记住我</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default Pageform
