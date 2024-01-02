import type { FunctionComponent } from 'react';
import { Divider, Space, Table, Typography, Button } from 'poizon-design';
import ProDescriptions, { Key } from '@poizon-design/pro-descriptions';
import { useDetail, useColumns } from '@/pages/module-details/hooks';
import { IResultDetailData } from '@/pages/module-details/service/interface';
import './index.less';

const { Title } = Typography;

export const Detail: FunctionComponent = () => {
  const { detailData, detailLoading, updateDetail } = useDetail();
  const { tableColumns, offerDetailColumns, baseDetailColumns } = useColumns();
  const { demandList = [] } = detailData;

  /**
   * 更多配置及参数：https://procomponents.ant.design/components/descriptions/#editable-%E7%BC%96%E8%BE%91%E9%85%8D%E7%BD%AE
   */
  const handleSaveEditable = (key: Key, row: IResultDetailData) => {
    updateDetail({
      ...row,
      updateTime: Date.now(),
    });
  };

  return (
    <div className="page-detail p-5 bg-white shadow-ct">
      <ProDescriptions
        title="基本信息"
        loading={detailLoading}
        dataSource={detailData}
        columns={baseDetailColumns}
        editable={{ onSave: handleSaveEditable }}
        extra={<Button type="primary">变更记录</Button>}
      />
      <Divider />
      <ProDescriptions
        title="工作信息"
        loading={detailLoading}
        dataSource={detailData}
        columns={offerDetailColumns}
      />
      <Divider />
      <Space direction="vertical" className="flex">
        <Title level={5}>商品列表</Title>
        <Table dataSource={demandList} columns={tableColumns} />
      </Space>
    </div>
  );
};
