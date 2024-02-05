import React, { useState, useRef, useEffect } from 'react';
import { Form, message } from 'poizon-design';
import { ProFormInstance } from '@poizon-design/pro-form';
import moment from 'moment';
import fetchServiceProviderAddOrUpdateService from '@/services/serviceProvider/queryServiceProviderADDUpdate';
import type { Content } from '@/entities/serviceProvider/interface/queryServiceProviderList';
import { modeEnum } from '../../constants';

interface UseFormDataProps {
  setVisible: (visible: boolean) => void;
  refreshList: () => void;
  detailData?: Content;
  mode: modeEnum;
  setStartEffectiveTime: (time: string) => void;
  setEndEffectiveTime: (time: string) => void;
}

export default function useFormData(props: UseFormDataProps) {
  const { setVisible, refreshList, mode, detailData, setStartEffectiveTime, setEndEffectiveTime } =
    props;
  const formRef = useRef<ProFormInstance>();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === modeEnum.编辑) {
      const { spName, spNameAbbr, spSubType, dataIds, endEffectiveTime, startEffectiveTime } =
        detailData || {};
      formRef?.current?.setFieldsValue({
        spName,
        spNameAbbr,
        spSubType,
        spData: dataIds,
        contractPeriod: [moment(startEffectiveTime), moment(endEffectiveTime)],
      });
      setStartEffectiveTime(moment(startEffectiveTime));
      setEndEffectiveTime(moment(endEffectiveTime));
    }
  }, []);

  async function onSubmit() {
    try {
      if (formRef) {
        const {
          spData,
          spName,
          spSubType,
          spNameAbbr,
          contractPeriod = [],
        } = await formRef?.current?.validateFields();
        const params = {
          spData,
          spName: spName?.trim(),
          spSubType,
          spNameAbbr: spNameAbbr?.trim(),
          startEffectiveTime: contractPeriod[0]?.format('YYYY-MM-DD'),
          endEffectiveTime: contractPeriod[1]?.format('YYYY-MM-DD'),
        };
        if (mode === modeEnum.编辑) {
          params.spId = detailData?.spId;
        }
        setSubmitLoading(true);
        const res = await fetchServiceProviderAddOrUpdateService(params);
        if (res.success) {
          message.success(`${mode === modeEnum.新建 ? '创建' : '编辑'}成功`);
          refreshList();
          setVisible(false);
        }
        setSubmitLoading(false);
      }
    } catch (errorInfo) {
      message.error(errorInfo);
    }
  }
  return { formRef, onSubmit, form, submitLoading };
}
