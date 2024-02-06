import { defaultPagiSetting } from '@/config';
import ProTable from '@poizon-design/pro-table';
import { Modal, Table } from 'poizon-design';
import { getLog } from '../../api';
import { useColumns } from './useColumns';
import { useState } from 'react';
import { LogList } from '../../../../target/requirements/interface';

interface logTable {
  logLeadsId: number;
  logVisible: boolean;
  setLogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default ({ logLeadsId, logVisible, setLogVisible }: logTable) => {
  const columns = useColumns();
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);
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
          const resp: LogList = await getLog(requestParams);
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.datas || [],
            total: resp.total,
          };
        }}
        pagination={{ ...pageInfo }}
        rowKey={(row) => row.operateTime + Math.random()}
        columns={columns}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({
            ...defaultPagiSetting,
            ...rest,
          });
        }}
      />
    </Modal>
  );
};
