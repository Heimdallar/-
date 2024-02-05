import ProForm, {
  ModalForm,
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormInstance,
  ProFormTreeSelect,
} from '@poizon-design/pro-form';
import { Button, Cascader, Select } from 'poizon-design';
import React, { useMemo, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import fetchClueFeedbackTalkProgressService from '@/services/privateSea/feedbackTalkProgress';
import fetchPrivateSeaGetFeedbackTalkFailsService from '@/services/publicSea/getFeedbackTalkFails';
import fetchClueGetfeedbackInvalidLeadsService from '@/services/privateSea/getfeedbackInvalidLeads';
import fetchClueGetfeedbackWaitClaimdLeadsService from '@/services/privateSea/queryfeedbackWaitClaimdLeads';
import {
  Feedback,
  ReasonEnum,
  StatusEnum,
  accendantFeedbackOptions,
  bdFeedbackOptions,
  validOptions,
  willOptions,
  invalidPhoneReasonOptions,
} from '../../contant';

interface LeadsContactInfoResponseListType {
  contactMobileNumber: string;
  contactTelephone: string;
  contactMobileStatus: number;
  contactTelephoneStatus: number;
}
interface failResonOptionsType {
  label: string;
  value: number;
  children?: failResonOptionsType[];
}
type Props = {
  status: number;
  leadsId: number;
  reload: () => void;
  leadsContactInfoResponseList: LeadsContactInfoResponseListType[];
};

const ProgressFeedbackModal: React.FC<Props> = ({
  status,
  leadsId,
  reload,
  leadsContactInfoResponseList = [],
}) => {
  const isAccendant = useMemo(() => {
    return status === StatusEnum.入驻意愿沟通;
  }, [status]);

  const contactInfoList = useMemo(() => {
    const contactInfoListNew: {
      contactNumber: string;
      contactStatus: number;
    }[] = [];
    leadsContactInfoResponseList.forEach((item: LeadsContactInfoResponseListType) => {
      if (!item) return;
      if (item.contactMobileNumber) {
        contactInfoListNew.push({
          contactNumber: item.contactMobileNumber,
          contactStatus: item.contactMobileStatus,
        });
      }
      if (item.contactTelephone) {
        contactInfoListNew.push({
          contactNumber: item.contactTelephone,
          contactStatus: item.contactTelephoneStatus,
        });
      }
    });
    return contactInfoListNew;
  }, [leadsContactInfoResponseList]);

  const formRef = useRef<ProFormInstance>();
  const [reasonOptions, setReasonOptions] = useState<failResonOptionsType[]>([]);
  // 无效线
  const { data: invalidLeadsData } = useRequest(() =>
    fetchClueGetfeedbackInvalidLeadsService({ leadsId }),
  );
  const invalidLeadsDataOptions = invalidLeadsData?.data || [];
  // 洽谈失败
  const { data: failData } = useRequest(() =>
    fetchPrivateSeaGetFeedbackTalkFailsService({ leadsId }),
  );
  const failDataOptions = failData?.data || [];
  // 待招商认领
  const { data: waitClaimdLeadsData } = useRequest(() =>
    fetchClueGetfeedbackWaitClaimdLeadsService({ leadsId }),
  );
  const waitClaimdLeadsDataOptions = waitClaimdLeadsData?.data || [];

  const onTypeChange = (val: string | number) => {
    if (val === Feedback.无效线索) {
      setReasonOptions(invalidLeadsDataOptions);
    }
    if (val === Feedback.洽谈失败) {
      setReasonOptions(failDataOptions);
    }
    if (val === Feedback.待招商认领) {
      setReasonOptions(waitClaimdLeadsDataOptions);
    }
    formRef.current?.setFieldsValue({ reason: undefined });
  };

  function findLabels(values, data) {
    let result = [];

    values.forEach((value) => {
      const match = data.find((item) => item.value === value);
      if (match) {
        result.push(match.label);
        if (match.children) {
          const childLabels = findLabels(values, match.children);
          result = result.concat(childLabels);
        }
      }
    });

    return result.join('-').replace(/-$/, '');
  }

  return (
    <ModalForm
      title="进度反馈"
      modalProps={{
        destroyOnClose: true,
      }}
      trigger={<Button type="primary" size="large">反馈洽谈进度</Button>}
      width={600}
      layout="horizontal"
      formRef={formRef}
      labelCol={{ style: { width: 120 } }}
      onFinish={async (values) => {
        const { reason = [], contactInfoList = [], ...val } = values;
        for (let i = 0; i < contactInfoList.length; i++) {
          // 如果不是无效原因，清空无效原因
          if (contactInfoList[i].contactStatus) {
            contactInfoList[i].invalidReason = '';
          }
        }
        const params = {
          ...val,
          reasonType: reason?.[reason.length - 1],
          reason: findLabels(reason, reasonOptions),
          leadsId,
          contactInfoList: contactInfoList.length ? contactInfoList : undefined,
        };
        const res = await fetchClueFeedbackTalkProgressService(params);
        if (!res.success) return Promise.reject(false);
        reload();
        return true;
      }}
    >
      <ProFormSelect
        label="洽谈结果"
        name="type"
        width="md"
        rules={[{ required: true, message: '请选择洽谈结果' }]}
        options={isAccendant ? accendantFeedbackOptions : bdFeedbackOptions}
        fieldProps={{
          onChange: onTypeChange,
        }}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if (type === Feedback.无效线索) {
            return (
              <>
                <ProForm.Item
                  label="原因"
                  name="reason"
                  required
                  style={{ width: 448 }}
                  rules={[{ required: true, message: '请选择原因' }]}
                  key={type}
                >
                  <Cascader options={reasonOptions} />
                </ProForm.Item>
                <ProForm.Item>
                  <div>注：选择【无效线索】后，该线索将进入公海</div>
                </ProForm.Item>
              </>
            );
          }

          if (type === Feedback.待招商认领) {
            return (
              <>
                <ProForm.Item
                  label="入驻意愿"
                  name="reason"
                  required
                  style={{ width: 448 }}
                  rules={[{ required: true, message: '请选择入驻意愿' }]}
                  key={type}
                >
                  <Cascader options={reasonOptions} />
                </ProForm.Item>
                <ProForm.Item>
                  <div>注：选择此洽谈结果后，线索状态将会更新，待类目招商认领线索并进行跟进</div>
                </ProForm.Item>
              </>
            );
          }

          if (type === Feedback.洽谈失败) {
            return (
              <>
                <ProForm.Item
                  label="洽谈失败原因"
                  name="reason"
                  required
                  style={{ width: 448 }}
                  rules={[{ required: true, message: '请选择洽谈失败原因' }]}
                  key={type}
                >
                  <Cascader options={reasonOptions} />
                </ProForm.Item>
                <ProFormTextArea
                  label="补充描述"
                  name="remark"
                  width="md"
                  required
                  rules={[{ required: true, message: '请填写补充描述' }]}
                  fieldProps={{ maxLength: 200, showCount: true }}
                />
                {isAccendant && (
                  <ProForm.Item>
                    <div>注：选择此洽谈结果后，表示所有有效的联系方式均无入驻意愿</div>
                  </ProForm.Item>
                )}
              </>
            );
          }

          if (type === Feedback.需继续跟进 || type === Feedback.入驻意愿沟通) {
            return (
              <ProFormTextArea
                label="本次洽谈纪要"
                name="remark"
                width="md"
                fieldProps={{ maxLength: 200, showCount: true }}
                rules={[{ required: true, message: '请填写本次洽谈纪要' }]}
              />
            );
          }

          return null;
        }}
      </ProFormDependency>

      <ProFormDependency name={['type', 'reason']}>
        {({ type, reason = [] }) => {
          const reasonId = reason[reason.length - 1];
          const isShowContactInfoList = () => {
            return (
              (isAccendant &&
                [Feedback.无效线索, Feedback.待招商认领, Feedback.洽谈失败].includes(type)) ||
              (!isAccendant &&
                type === Feedback.无效线索 &&
                [ReasonEnum['联系方式错误']].includes(reasonId))
            );
          };
          return (
            isShowContactInfoList() &&
            Boolean(contactInfoList.length) && (
              <>
                <ProForm.Item>联系方式:</ProForm.Item>

                <ProFormList
                  name="contactInfoList"
                  label=""
                  creatorButtonProps={false}
                  initialValue={contactInfoList}
                  copyIconProps={false}
                  deleteIconProps={false}
                  itemRender={({ listDom }, { index }) => (
                    <>
                      <ProFormDependency name={['contactStatus']}>
                        {({ contactStatus }) => {
                          return (
                            <>
                              <ProFormSelect
                                width="md"
                                options={validOptions}
                                labelCol={{ style: { width: 120 } }}
                                rules={[{ required: true, message: '请选择' }]}
                                name="contactStatus"
                                label={contactInfoList[index]?.contactNumber}
                              />
                              {!contactStatus && (
                                <ProFormSelect
                                  width="md"
                                  options={invalidPhoneReasonOptions}
                                  labelCol={{ style: { width: 120 } }}
                                  rules={[{ required: true, message: '请选择' }]}
                                  name="invalidReason"
                                  label="无效原因"
                                />
                              )}
                            </>
                          );
                        }}
                      </ProFormDependency>
                    </>
                  )}
                ></ProFormList>
              </>
            )
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};

export default ProgressFeedbackModal;
