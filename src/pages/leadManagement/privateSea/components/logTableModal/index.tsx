import { defaultPagiSetting } from '@/config';
import ProTable from '@poizon-design/pro-table';
import { Modal, Table } from 'poizon-design';
import { getLog } from '../../api';
import { useColumns } from './useColumns';

interface logTable {
  logLeadsId: number;
  logVisible: boolean;
  setLogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ({ logLeadsId, logVisible, setLogVisible }: logTable) => {
  const columns = useColumns();
  return (
    <Modal
      visible={logVisible}
      title="查看日志"
      width={800}
      maskClosable={false}
      centered={true}
      destroyOnClose={true}
      onCancel={() => {
        setLogVisible(false);
      }}
      footer={[]}
    >
      <ProTable
        toolBarRender={false}
        search={false}
        tableAlertRender={false}
        request={async (params = {}) => {
            const { current, ...rest } = params;
            const requestParams = {
              ...rest,
              page: current,
              leadsId: logLeadsId,
            };
            const resp: any = await getLog(requestParams);
            return {
              data: resp.datas || [],
              total: resp.total,
            };
        }}
        pagination={defaultPagiSetting}
        rowKey={(row) => row.operateTime + Math.random()}
        columns={columns}
      />
    </Modal>
  );
};
