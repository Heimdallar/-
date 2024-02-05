import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormTextArea,
} from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { ApplyItem } from '../../interface';
import { centerAudit, getCenterRejectReasonList } from '../../api';
import styles from './index.less';

interface RejectInfo {
  rejectShow: boolean;
  batchLeadId: number;
  setRejectShow: React.Dispatch<React.SetStateAction<boolean>>;
  invokeUpdateDetail: (leadsId: number) => void;
  refreshList: () => void;
}

export default ({ rejectShow, setRejectShow, batchLeadId, invokeUpdateDetail, refreshList }: RejectInfo) => {
  return (
    <ModalForm
      visible={rejectShow}
      title="审核"
      width={800}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setRejectShow(false);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const { reviewReason, reviewReasonOther } = values || {};
        const requestParams = {
          leadsId: batchLeadId,
          reviewReason: reviewReasonOther ? reviewReasonOther : reviewReason,
          reviewResult: 6,
        };
        const res = await centerAudit(requestParams);
        if (!res) return;
        message.success('驳回成功');
        setRejectShow(false);
        invokeUpdateDetail(batchLeadId)
        refreshList();
      }}
    >
      <p className={styles.showRight}>很抱歉，您的品牌未通过初审，初审意见如下：</p>
      <ProFormSelect
        name="reviewReason"
        label="原因"
        fieldProps={{
          placeholder: '请选择驳回原因',
        }}
        rules={[{ required: true, message: '请选择驳回原因' }]}
        request={async () => {
          const resp: any = await getCenterRejectReasonList({});
          return resp.map((item: any) => {
            return {
              label: item.title,
              value: item.title,
            };
          });
        }}
      />
      <ProFormDependency name={['reviewReason']}>
        {({ reviewReason }) => {
          if (reviewReason === '其他') {
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
    </ModalForm>
  );
};
