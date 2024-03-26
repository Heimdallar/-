import ProForm, {
    ModalForm,
    ProFormDependency,
    ProFormList,
    ProFormSelect,
    ProFormTextArea,
    ProFormInstance,
  } from '@poizon-design/pro-form';
  import { Button, Cascader } from 'poizon-design';
  import React, { useMemo, useRef, useState } from 'react';
  import { Feedback, accendantFeedbackOptions, bdFeedbackOptions } from '../../interface';
import { fetchClueDetailService } from '../../service';

  
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
    buttonType: "link" | "text" | "ghost" | "primary" | "default" | "dashed"
    invokeUpdateDetail?: (leadsId: number) => void;
  };
  
  const ProgressFeedbackModal: React.FC<Props> = ({
    status,
    leadsId,
    reload,
    buttonType = 'default',
    invokeUpdateDetail,
  }) => {
    const isAccendant = useMemo(() => {
      return status === 2;
    }, [status]);
  
    const [leadsContactInfoResponseList, setLeadsContactInfoResponseList] = useState<LeadsContactInfoResponseListType[]>([])
  
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
    let invalidLeadsDataOptions  = useRef<failResonOptionsType[]>([]);
    let failDataOptions = useRef<failResonOptionsType[]>([]);
    // 洽谈失败
    const queryRejectFails = async () => {
      const res = await fetchClueGetRejectInvalidLeadsService({ leadsId });
      if (!res.success) return;
      failDataOptions.current = res.data as failResonOptionsType[];
    };
    // 无效线
    const queryRejectInvalidLeads = async () => {
      const res = await fetchClueGetRejectInvalidLeadsService({ leadsId });
      if (!res.success) return;
      invalidLeadsDataOptions.current = res.data as failResonOptionsType[];
    };
  
    const invokeDetail = async () => {
      const res = await fetchClueDetailService({ leadsId });
      if(!res.success) return
      setLeadsContactInfoResponseList(res.data?.leadsContactInfoResponseList || [])
    };
  
    const onTypeChange = (val: string | number) => {
      if (val === Feedback.无效线索) {
        setReasonOptions(invalidLeadsDataOptions.current);
      }
      if (val === Feedback.洽谈失败) {
        setReasonOptions(failDataOptions.current);
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
        title="驳回"
        modalProps={{
          destroyOnClose: true,
          centered: true,
        }}
        trigger={<Button type={buttonType}>驳回</Button>}
        width={600}
        layout="horizontal"
        formRef={formRef}
        labelCol={{ style: { width: 120 } }}
        onVisibleChange={(visible) => {
          if (!visible) return;
          queryRejectFails();
          queryRejectInvalidLeads();
          invokeDetail()
        }}
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
        //   const res = await fetchClueRejectService(params);
          if (!res.success) return Promise.reject(false);
          reload && reload();
          invokeUpdateDetail && invokeUpdateDetail(leadsId)
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
                    <Cascader options={reasonOptions} placeholder="请选择原因"/>
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
                    <Cascader options={reasonOptions} placeholder="请选择洽谈失败原因"/>
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
  
            return null;
          }}
        </ProFormDependency>
  
        <ProFormDependency name={['type', 'reason']}>
          {({ type, reason = [] }) => {
            const reasonId = reason[reason.length - 1];
            const isShowContactInfoList = () => {
              return (
                (isAccendant && [Feedback.无效线索, Feedback.洽谈失败].includes(type)) ||
                (!isAccendant &&
                  type === Feedback.无效线索 )
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
                                  options={[]}
                                  labelCol={{ style: { width: 120 } }}
                                  rules={[{ required: true, message: '请选择' }]}
                                  name="contactStatus"
                                  label={contactInfoList[index]?.contactNumber}
                                />
                                {!contactStatus && (
                                  <ProFormSelect
                                    width="md"
                                    options={[]}
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

function fetchClueGetRejectInvalidLeadsService(arg0: { leadsId: number; }) {
    throw new Error('Function not implemented.');
}
  