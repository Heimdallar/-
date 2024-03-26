import ClueTransfer from '../clueTransfer';
import ClueAllocation from '../clueAllocation';
import BatchModal from '../batchModal';
import { OperatesEnum } from '../../interface';
import { Space } from 'poizon-design';
import ProgressFeedbackModal from '../progressFeedbackModal';
interface InProps {
  record: any;
  invokeUpdateDetail?: (leadsId: number) => void;
  buttonType: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed';
}
export default function Operate({
  record = {},
  invokeUpdateDetail,
  buttonType,
}: InProps) {
  return (
    <Space onClick={(e) => e.stopPropagation()}>
      {record.operate?.includes(OperatesEnum.认领) ? (
        <BatchModal
          batchLeadId={record.leadsId}
          invokeUpdateDetail={invokeUpdateDetail}
          buttonType={buttonType}
          status={record.status}
        />
      ) : null}
      {record.operate?.includes(OperatesEnum.转移) && (
        <ClueTransfer
          leadsId={record.leadsId}
          buttonType={buttonType}
          invokeUpdateDetail={invokeUpdateDetail}
        />
      )}
      {record.operate?.includes(OperatesEnum.分配) && (
        <ClueAllocation
          leadsId={record.leadsId}
          buttonType={buttonType}
          invokeUpdateDetail={invokeUpdateDetail}
        />
      )}
      {record.operate?.includes(OperatesEnum.驳回) && (
        <ProgressFeedbackModal
                  leadsId={record.leadsId}
                  status={record.status}
                  buttonType={buttonType}
                  invokeUpdateDetail={invokeUpdateDetail} reload={function (): void {
                      throw new Error('Function not implemented.');
                  } }        />
      )}
    </Space>
  );
}
