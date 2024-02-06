import React, { FC, useEffect, useCallback, useState } from 'react';
import { Modal, Button, DatePicker } from 'poizon-design';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDatePicker,
} from '@poizon-design/pro-form';
import { useRequest } from 'ahooks';
import locale from 'poizon-design/es/date-picker/locale/zh_CN';
import moment from 'moment';
import fetchCategoryListService from '@/services/serviceProvider/queryCategoryList';
import type { Content } from '@/entities/serviceProvider/interface/queryServiceProviderList.ts';
import { ServiceTypeOptions } from '../../constants';
import useFormData from './useFormData';
import 'moment/locale/zh-cn';

export enum modeEnum {
  新建 = 'add',
  编辑 = 'edit',
  预览 = 'preview',
}

interface ListModalProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
  mode: modeEnum;
  refreshList: () => void;
  detailData?: Content;
}

const FormModal: FC<ListModalProps> = (props) => {
  const { setVisible, mode } = props;

  const { data: categoryListRes } = useRequest(() =>
    fetchCategoryListService({
      pid: 0,
      queryType: 0,
      treeFlag: true,
      spuCountFlag: false,
    }),
  );

  const categoryList = categoryListRes?.data || [];
  const [startEffectiveTime, setStartEffectiveTime] = useState();
  const [endEffectiveTime, setEndEffectiveTime] = useState();

  const { formRef, form, submitLoading, onSubmit } = useFormData({
    ...props,
    setStartEffectiveTime,
    setEndEffectiveTime,
  });

  const disabledDate = useCallback(
    (current) => {
      return (current && current < moment().endOf('day')) || current < startEffectiveTime;
    },
    [startEffectiveTime],
  );

  return (
    <Modal
      visible={true}
      onCancel={() => setVisible(false)}
      onOk={onSubmit}
      okText="确认"
      width={600}
      confirmLoading={submitLoading}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          返回列表
        </Button>,
        <Button key="submit" type="primary" loading={submitLoading} onClick={onSubmit}>
          提交
        </Button>,
      ]}
      title="基础信息"
    >
      <ProForm
        formRef={formRef}
        form={form}
        initialValues={{}}
        autoFocusFirstInput
        layout="horizontal"
        submitter={false}
        labelCol={{ span: 6 }}
      >
        <ProFormText
          label="企业名称"
          name="spName"
          disabled={mode === modeEnum.编辑}
          placeholder="请输入企业名称"
          rules={[
            { required: true, message: '企业名称不能为空' },
            { max: 50, message: '最多50个字符' },
            // 当值都是空格的时候，也会被认为是错误的
            { pattern: /\S/, message: '企业名称不能为空' },
          ]}
          fieldProps={{}}
        />
        <ProFormText
          label="服务商缩写"
          name="spNameAbbr"
          disabled={mode === modeEnum.编辑}
          placeholder="请输入服务商缩写"
          rules={[
            { required: true, message: '服务商缩写不能为空' },
            { max: 50, message: '最多50个字符' },
            { pattern: /\S/, message: '服务商缩写不能为空' },
          ]}
          fieldProps={{}}
        />
        <ProFormSelect
          label="服务类型"
          name="spSubType"
          disabled={mode === modeEnum.编辑}
          placeholder="请输入服务类型"
          style={{ width: '100%' }}
          rules={[{ required: true, message: '服务类型不能为空' }]}
          fieldProps={{ options: ServiceTypeOptions.slice(1) }}
        />
        <ProFormSelect
          label="服务类目"
          name="spData"
          placeholder="请输入服务类目"
          style={{ width: '100%' }}
          rules={[{ required: true, message: '服务类目不能为空' }]}
          fieldProps={{ options: categoryList, mode: 'multiple' }}
        />
        <ProForm.Item
          label="合同期限"
          name="contractPeriod"
          rules={[{ required: true, message: '合同期限不能为空' }]}
        >
          <DatePicker
            value={startEffectiveTime}
            onChange={(e) => {
              setStartEffectiveTime(e);
              setEndEffectiveTime(undefined);
              formRef.current?.setFieldsValue({
                contractPeriod: undefined,
              });
            }}
          />
          <span style={{ padding: '0 4px' }}>-</span>
          <DatePicker
            value={endEffectiveTime}
            disabled={!startEffectiveTime}
            disabledDate={disabledDate}
            onChange={(e) => {
              setEndEffectiveTime(e);
              formRef.current?.setFieldsValue({
                contractPeriod: [startEffectiveTime, e],
              });
            }}
          />
        </ProForm.Item>
      </ProForm>
    </Modal>
  );
};

export default FormModal;
