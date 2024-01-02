import { useCallback, FC } from 'react';
import { Button } from 'poizon-design';
import ProTable from '@poizon-design/pro-table';
import { DownloadLine, PlusLine, UploadLine } from '@poizon-design/icons';
import type { InterfaceReply, InterfaceRequest } from '@/utils/request';
import { WebRouteNameEnum, pushRoute } from '@/utils/navigator';
import { TableListInterface } from '@/pages/module-tables/service/api';
import { useSimpleColumns } from '@/pages/module-tables/hooks';

type DataRequest = InterfaceRequest<typeof TableListInterface>;
type DataReply = InterfaceReply<typeof TableListInterface>['contents'][0];

// 数据表格
export const SimpleSearchTable: FC = () => {
  const columns = useSimpleColumns();

  const handleCreateItem = useCallback(() => {
    pushRoute({ name: WebRouteNameEnum.STEP_FORM, params: {} });
  }, []);

  return (
    <ProTable<DataReply, DataRequest>
      rowKey="id"
      headerTitle="基础查询列表"
      columns={columns}
      form={{
        ignoreRules: false,
      }}
      pagination={{
        pageSize: 10,
        showQuickJumper: true,
      }}
      scroll={{
        x: 'max-content',
      }}
      revalidateOnFocus={false}
      options={{
        reload: false,
        density: false,
      }}
      search={{ filterType: 'light' }}
      toolbar={{
        actions: [
          <Button key="upload" type="link">
            <UploadLine />
            上传按钮
          </Button>,
          <Button key="download" type="link">
            <DownloadLine />
            导出数据
          </Button>,
          <Button key="create" type="primary" onClick={handleCreateItem}>
            <PlusLine />
            创建按钮
          </Button>,
        ],
      }}
      request={async (params) => {
        const res = await TableListInterface({
          ...params,
          pageNum: Number(params.current || 0),
        });
        return {
          data: res.contents || [],
          success: true,
          total: res.total || 0,
        };
      }}
    />
  );
};
