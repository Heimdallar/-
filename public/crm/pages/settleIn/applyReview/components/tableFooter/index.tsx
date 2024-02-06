import'./index.less';
import { Button, Space } from 'poizon-design';
import { handleApprovalBatchReview } from '../../util';

interface IFooter {
  refreshList: () => void;
  selectedRowKeys: number[],
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<number[]>>,
}

const tableFooter: React.FC<IFooter> = ({refreshList, selectedRowKeys, setSelectedRowKeys}: IFooter) => {

  return (
    <div className="batchOpFooter">
      <div className="buttonGroup">
        <Space size={12}>
          <Button type="primary" onClick={(e) => {
            handleApprovalBatchReview(selectedRowKeys.join(','), 40, e, setSelectedRowKeys, refreshList)
          }}>
            通过
          </Button>
          <Button
            type="primary"
            className="next-btn"
            onClick={(e) => {
              handleApprovalBatchReview(selectedRowKeys.join(','), 20, e, setSelectedRowKeys, refreshList)
            }}
          >
            下次评审
          </Button>
          <Button type="primary" danger onClick={(e) => {
            handleApprovalBatchReview(selectedRowKeys.join(','), 30, e, setSelectedRowKeys, refreshList)
          }}>
            不通过
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default tableFooter;
