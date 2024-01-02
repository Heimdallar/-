import React, { useState, useEffect } from 'react';
import { Drawer, Space, Button, Tabs } from 'poizon-design';
import ProDescriptions from '@poizon-design/pro-descriptions';
import { useDetail, useColumns } from '@/pages/module-details/hooks';
import './index.less';

const { TabPane } = Tabs;

interface DetailApp {
  children: JSX.Element;
}

export function DrawerDetail(props: DetailApp) {
  const { children } = props;
  const [child, setChild] = useState<JSX.Element>();
  const [visible, setVisible] = useState(true);
  const { detailData, detailLoading } = useDetail();
  const { offerDetailColumns, baseDetailColumns } = useColumns();

  const openModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    const childEle = React.cloneElement(children, {
      ...children.props,
      onClick: () => {
        openModal();
      },
    });
    setChild(childEle);
  }, [children, children.props]);

  return (
    <>
      {child}
      <Drawer
        className="drawer-detail"
        title="抽屉主标题"
        visible={visible}
        onClose={handleCancel}
        width={800}
        destroyOnClose={true}
        footer={
          <Space>
            <Button type="primary">通过</Button>
            <Button danger>驳回</Button>
          </Space>
        }
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="个人信息" key="1">
            <ProDescriptions
              title="基本信息"
              layout="vertical"
              loading={detailLoading}
              dataSource={detailData}
              columns={baseDetailColumns}
            />
            <ProDescriptions
              title="员工信息"
              layout="vertical"
              loading={detailLoading}
              dataSource={detailData}
              columns={offerDetailColumns}
            />
          </TabPane>
          <TabPane tab="个人经历" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="任职信息" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="家庭信息" key="4">
            Content of Tab Pane 4
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
}
