import { defaultPagiSetting } from '@/config';
import ProTable from '@poizon-design/pro-table';
import { Modal, Table } from 'poizon-design';
import { getRequirementLogList } from '../../api';
import { useColumns } from './useColumns';
import { IModelBaseProps, LogList } from '../../interface';
import { useState } from 'react';

interface IModelProps extends IModelBaseProps {
  logLeadsId: number;
}

export default ({ logLeadsId, visible, setVisible }: IModelProps) => {
  const columns = useColumns();
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);
  return (
    <Modal
      visible={visible}
      title="查看日志"
      width={800}
      maskClosable={false}
      centered={true}
      destroyOnClose={true}
      onCancel={() => {
        setVisible(false);
      }}
      footer={[]}
    >
      <ProTable
        toolBarRender={false}
        search={false}
        tableAlertRender={false}
        request={async (params = {}) => {
          const { current, pageSize } = params;
          const requestParams = {
            pageSize,
            pageNum: current,
            targetId: logLeadsId,
          };
          const resp: LogList = await getRequirementLogList(requestParams);
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
