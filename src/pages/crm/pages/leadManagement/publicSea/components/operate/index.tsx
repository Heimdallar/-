import ClueTransfer from '../clueTransfer';
import ClueAllocation from '../clueAllocation';
import BatchModal from '../batchModal';
import { OperatesEnum } from '../../config';
import { Space } from 'poizon-design';
import ProgressFeedbackModal from '../progressFeedbackModal';
interface InProps {
  record: any;
  invokeUpdateDetail?: (leadsId: number) => void;
  refreshList: () => void;
  buttonType: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed';
}
export default function Operate({
  record = {},
  refreshList,
  invokeUpdateDetail,
  buttonType,
}: InProps) {
  return (
    <Space onClick={(e) => e.stopPropagation()}>
      {record.operates?.includes(OperatesEnum.认领) ? (
        <BatchModal
          batchLeadId={record.leadsId}
          invokeUpdateDetail={invokeUpdateDetail}
          refreshList={refreshList}
          buttonType={buttonType}
          status={record.status}
        />
      ) : null}
      {record.operates?.includes(OperatesEnum.转移) && (
        <ClueTransfer
          leadsId={record.leadsId}
          buttonType={buttonType}
          refreshList={refreshList}
          invokeUpdateDetail={invokeUpdateDetail}
        />
      )}
      {record.operates?.includes(OperatesEnum.分配) && (
        <ClueAllocation
          leadsId={record.leadsId}
          buttonType={buttonType}
          refreshList={refreshList}
          invokeUpdateDetail={invokeUpdateDetail}
        />
      )}
      {record.operates?.includes(OperatesEnum.驳回) && (
        <ProgressFeedbackModal
          leadsId={record.leadsId}
          status={record.status}
          reload={refreshList}
          buttonType={buttonType}
          invokeUpdateDetail={invokeUpdateDetail}
        />
      )}
    </Space>
  );
}
