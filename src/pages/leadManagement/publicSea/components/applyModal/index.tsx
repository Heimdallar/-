import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormTextArea,
} from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { ApplyItem } from '../../interface';
import { isEmpty } from 'lodash';
import { approve, getPublicSeaClueStyle, getRejectReasonList, queryLabelList } from '../../api';
import styles from './index.less';
import { initApplyInfo } from '../../config';

interface ApplyInfo {
  applyShow: boolean;
  applyInfo: ApplyItem;
  setApplyInfo: React.Dispatch<React.SetStateAction<ApplyItem>>;
  setApplyShow: React.Dispatch<React.SetStateAction<boolean>>;
  invokeUpdateDetail: (leadsId: number) => void;
  refreshList: () => void;
}

export default ({ applyShow, setApplyShow, applyInfo, setApplyInfo, invokeUpdateDetail, refreshList }: ApplyInfo) => {
  return (
    <ModalForm
      visible={applyShow}
      title="审核"
      width={800}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setApplyShow(false);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const {
          reviewReason = [],
          reviewReasonOther,
          categoryStyles = [],
          labelIds = [],
          ...rest
        } = values || {};
        const requestParams = {
          ...rest,
          categoryStyles,
          labelIds,
          leadsId: applyInfo.leadsId,
          reviewReason: !isEmpty(reviewReason)
            ? reviewReason
                .map((item: string) => (item === '其他' ? reviewReasonOther.trim() : item))
                .join('；')
            : '',
          reviewReasonOther: reviewReasonOther ? reviewReasonOther.trim() : '',
          reviewResult: applyInfo.isPass ? 1 : 4,
        };
        const res = await approve(requestParams);
        if (!res) return;
        message.success('审核提交成功');
        setApplyShow(false);
        setApplyInfo(initApplyInfo);
        invokeUpdateDetail(applyInfo.leadsId)
        refreshList();
      }}
    >
      {applyInfo.isPass && (
        <>
          <ProFormSelect
            name="categoryStyles"
            label="风格"
            fieldProps={{
              mode: 'multiple',
              placeholder: '请选择类目风格',
            }}
            rules={[{ required: true, message: '请选择风格' }]}
            request={async () => {
              const resp: any = await getPublicSeaClueStyle({
                mainCategory: applyInfo.mainCategory,
              });
              return resp.map((item: any) => {
                return {
                  label: item,
                  value: item,
                };
              });
            }}
          />
          <ProFormSelect
            name="labelIds"
            label="标签"
            fieldProps={{
              mode: 'multiple',
              placeholder: '请选择标签',
            }}
            rules={[{ required: true, message: '请选择标签' }]}
            request={async () => {
              const resp: any = await queryLabelList({ id: applyInfo.leadsId });
              return resp.map((item: any) => {
                return {
                  label: item.title,
                  value: item.value,
                };
              });
            }}
          />
        </>
      )}
      {!applyInfo.isPass && (
        <>
          <p className={styles.showRight}>很抱歉，您的品牌未通过初审，初审意见如下：</p>
          <ProFormSelect
            name="reviewReason"
            label="原因"
            fieldProps={{
              mode: 'multiple',
              placeholder: '请选择驳回原因',
            }}
            rules={[{ required: true, message: '请选择驳回原因' }]}
            request={async () => {
              const resp: any = await getRejectReasonList({});
              return resp.map((item: any) => {
                return {
                  label: item,
                  value: item,
                };
              });
            }}
          />
          <ProFormDependency name={['reviewReason']}>
            {({ reviewReason = [] }) => {
              if (reviewReason.includes('其他')) {
                return (
                  <ProFormTextArea
                    name="reviewReasonOther"
                    label="驳回原因"
                    fieldProps={{
                      showCount: true,
                      maxLength: 200,
                    }}
                    rules={[{ required: true, message: '请输入驳回原因' }]}
                    placeholder="请填写驳回原因"
                  />
                );
              }
            }}
          </ProFormDependency>
          <p className={styles.showRight}>
            温馨提示：请勿重复提交初审未通过品牌，以免影响后续的判断，非常感谢您对得物的关注，期待未来的合作！
          </p>
        </>
      )}
    </ModalForm>
  );
};
