import React, { ComponentProps, FunctionComponent, useCallback } from 'react';
import { Tabs, Form, Divider } from 'poizon-design';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@poizon-design/pro-form';
import DuUpload, { DuUploaderInstance } from '@poizon-design/upload';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { BusinessTypeMap, IdcardTypeMap } from '@/pages/module-forms/page-step-form/constant';
import { RemoteAddress } from '../RemoteAddress';
import styles from './index.less';

const { TabPane } = Tabs;

const pEnv = process.env || {};

DuUploaderInstance.setConfig({
  appId: 'appId',
  gateway: 'auth',
  backstageCode: pEnv.BACK_STAGE_CODE || '',
  monitorEnv: 't1', // 当前环境
  monitorName: pEnv.BACK_STAGE_CODE || '', // 应用名
  monitorUser: { id: 'userId', userName: 'userName' }, // 用户信息
});

type FormRefProps = ComponentProps<typeof ProForm>['formRef'];

export const CompanyInfo: FunctionComponent<{
  onFieldChange: (o: Record<string, any>) => void;
}> = React.forwardRef((props, ref) => {
  const onTabClick = useCallback((key: string) => {
    // eslint-disable-next-line
    location.href = `#${key}`;
  }, []);

  return (
    <div className="bg-white pt-0 p-[24px]">
      <Tabs defaultActiveKey="1" onTabClick={onTabClick}>
        <TabPane tab="公司注册信息" key="1" />
        <TabPane tab="法人与授权人信息" key="2" />
        <TabPane tab="公司运营信息" key="3" />
        <TabPane tab="邀约人信息" key="4" />
      </Tabs>

      <ProForm
        formRef={ref as FormRefProps}
        layout="horizontal"
        labelCol={{ span: 6 }}
        className={styles.scrollContent}
        submitter={false}
        onValuesChange={props?.onFieldChange}
      >
        <AnchorTitle anchor="1">公司注册信息</AnchorTitle>
        <ProFormRadio.Group
          name="manageType"
          label="企业经营类型"
          options={[
            {
              label: '商品销售类',
              value: 1,
            },
            {
              label: '定制服务类',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '请输入企业经营类型' }]}
        />
        <Form.Item label="得物AppID">
          <span>得物er-0X3L6B5P</span>
        </Form.Item>
        <ProFormSelect
          label="商家类型"
          name="businessType"
          valueEnum={BusinessTypeMap}
          placeholder="请选择"
          rules={[{ required: true, message: '请选择商家类型' }]}
          width={200}
        />
        <Form.Item
          label="营业执照"
          name="licenceImg"
          rules={[{ required: true, message: '请上传营业执照' }]}
        >
          {/* 得物上传组件：https://pd.shizhuang-inc.com/material/@poizon-design/upload */}
          <DuUpload
            accept=".png,.jpg,.jpeg"
            maxCount={1}
            name="licenceImg"
            uploadBtnText="营业执照"
            tipText={
              <span>
                <ExclamationCircleOutlined />
                请优先上传执照图片，自动识别填充相关信息
              </span>
            }
            initialFileList={[
              {
                name: '测试.jpeg',
                url: 'https://cdn.poizon.com/node-common/b2ff14ae-3717-0f43-4255-0e8a6b227613.webp',
              },
            ]}
            tipTextPosition="bottom"
          />
        </Form.Item>
        <ProFormText
          label="公司注册名称"
          name="companyName"
          width={300}
          placeholder="上传营业执照后自动填充"
          rules={[{ required: true, message: '请输入公司注册名称' }]}
        />
        <ProFormText
          label="公司统一社会信用代码"
          name="licenseNum"
          width={400}
          placeholder="上传营业执照后自动填充"
          rules={[{ required: true, message: '请输入公司统一社会信用代码' }]}
        />
        <ProFormDateRangePicker
          name="licensePeriod"
          label="营业执照有效期"
          rules={[{ required: true, message: '请输入营业执照有效期' }]}
        />
        <RemoteAddress
          label="营业执照注册地址"
          name="address"
          width={300}
          placeholder="请选择省市区"
        />
        <ProFormText
          label="营业执照详细地址"
          required
          placeholder="详细地址"
          name="businessAddress"
        />

        <ProFormText
          label="公司电话"
          rules={[{ required: true, message: '请输入公司电话' }]}
          placeholder="请输入公司电话"
        />
        <Form.Item label="一般纳税人登记证明">
          <DuUpload accept=".png,.jpg,.jpeg" maxCount={1} listType="text" />
        </Form.Item>
        <Form.Item label="开户银行许可证">
          <DuUpload accept=".png,.jpg,.jpeg" maxCount={1} />
        </Form.Item>

        <Divider />

        <AnchorTitle anchor="2">公司法定代表人与被授权人信息</AnchorTitle>
        <ProFormSelect
          label="证件类型"
          name="corporateIdcardType"
          valueEnum={IdcardTypeMap}
          placeholder="请选择证件类型"
          rules={[{ required: true, message: '请输入证件类型' }]}
          width={200}
        />
        <Form.Item
          label="法人证件照片"
          name="corporateIdcardImg"
          rules={[{ required: true, message: '请输入法人证件照片' }]}
        >
          <DuUpload
            accept=".png,.jpg,.jpeg"
            maxCount={1}
            tipText={
              <span>
                <ExclamationCircleOutlined />
                请准确按照提示将身份证正反面照片上传至指定位置
              </span>
            }
            tipTextPosition="bottom"
          />
        </Form.Item>
        <ProFormText
          label="法人姓名"
          name="corporateName"
          width={200}
          rules={[{ required: true, message: '请输入法人姓名' }]}
        />
        <ProFormText
          label="法人证件号码"
          name="corporateIdcard"
          rules={[{ required: true, message: '请输入法人证件号码' }]}
          placeholder="上传证件后自动填充"
        />
        <ProFormDateRangePicker
          label="法人证件有效期"
          name="idcardPeriod"
          rules={[{ required: true, message: '请输入法人证件有效期' }]}
        />
        <ProFormText
          label="被授权人手机号码"
          placeholder="请输入被授权人手机号码"
          rules={[{ required: true, message: '请输入被授权人手机号码' }]}
          name="contactMobile"
        />
        <ProFormText
          label="被授权人邮箱"
          name="email"
          rules={[{ required: true, message: '请输入被授权人邮箱' }]}
          placeholder="请输入被授权人邮箱"
        />
        <ProFormRadio.Group
          name="isConsistent"
          label="被授权人是否为法人"
          rules={[{ required: true, message: '请输入被授权人是否为法人' }]}
          options={[
            {
              label: '是法人',
              value: 1,
            },
            {
              label: '不是法人',
              value: 0,
            },
          ]}
        />

        <Divider />

        <AnchorTitle anchor="3">公司运营信息</AnchorTitle>
        <ProFormRadio.Group
          name="isUnconditionalReturn"
          label="支持七天无理由退货"
          rules={[{ required: true, message: '请输入' }]}
          disabled
          initialValue={1}
          options={[
            {
              label: '支持',
              value: 1,
            },
            {
              label: '不支持',
              value: 0,
            },
          ]}
        />
        <ProFormRadio.Group
          name="isInvoice"
          label="支持开具发票"
          rules={[{ required: true, message: '请输入' }]}
          disabled
          initialValue={1}
          options={[
            {
              label: '支持',
              value: 1,
            },
            {
              label: '不支持',
              value: 0,
            },
          ]}
        />
        <ProFormText
          label="退货收件人姓名"
          name="name"
          rules={[{ required: true, message: '请输入退货收件人姓名' }]}
          placeholder="请输入"
          width={200}
        />
        <ProFormText
          label="退货收件电话"
          name="returnMobile"
          rules={[{ required: true, message: '请输入退货收件电话' }]}
          placeholder="请输入"
          width={200}
        />
        <ProFormText
          label="退货地址"
          name="salesReturnGather"
          rules={[{ required: true, message: '请输入退货地址' }]}
          placeholder="请输入"
        />
        <ProFormText
          label="负责人姓名"
          name="directorName"
          rules={[{ required: true, message: '请输入负责人姓名' }]}
          width={200}
        />
        <ProFormText
          label="负责人联系电话"
          name="directorMobile"
          rules={[{ required: true, message: '请输入负责人联系电话' }]}
          width={200}
        />
        <ProFormText
          label="运营姓名"
          name="operatorName"
          rules={[{ required: true, message: '请输入运营姓名' }]}
          width={200}
        />
        <ProFormText
          label="运营联系电话"
          name="operatorMobile"
          rules={[{ required: true, message: '请输入运营联系电话' }]}
          width={200}
        />
        <ProFormText
          label="发货人姓名"
          name="shipAddress.name"
          rules={[{ required: true, message: '请输入发货人姓名' }]}
          width={200}
        />
        <ProFormText
          label="发货人电话"
          name="shipAddress.mobile"
          rules={[{ required: true, message: '请输入发货人电话' }]}
          width={200}
        />
        <ProFormText
          label="发货地址"
          name="shipAddress.returnGather"
          rules={[{ required: true, message: '请输入发货地址' }]}
        />

        <Divider />

        <AnchorTitle anchor="4">邀约人信息</AnchorTitle>
        <ProFormText label="邀约人姓名" placeholder="对接得物招商人员姓名" width={200} />
        <ProFormText label="邀约人电话" placeholder="对接得物招商人员手机号" width={200} />

        <div className="h-[400px]" />
      </ProForm>
    </div>
  );
});

/**
 * 锚点标题组件
 */
export interface AnchorTitleProps {
  title?: string;
  anchor?: string | number;
  children?: React.ReactNode;
}

export const AnchorTitle: React.FC<AnchorTitleProps> = (props) => {
  return (
    <span className="my-[10px] inline-block">
      {props?.anchor && <a id={`${props?.anchor}`} />}
      <span className={styles.anchorBefore} />
      <span className={styles.anchorTitle}>{props?.title || props?.children}</span>
    </span>
  );
};
