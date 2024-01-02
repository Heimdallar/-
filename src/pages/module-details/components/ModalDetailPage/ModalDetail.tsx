import React, { useState, useEffect } from 'react';
import { Modal, Space, Button, Tag, Divider, Image, Alert, Popover } from 'poizon-design';
import ProDescriptions, { ProDescriptionsItemProps } from '@poizon-design/pro-descriptions';
import { FormOutlined } from '@ant-design/icons';
import { InterfaceReply } from '@/utils/request';
import { ModalDetailInterface } from '@/pages/module-details/service/api';
import { useModalDetail } from '@/pages/module-details/hooks';
import './index.less';

interface DetailApp {
  children: JSX.Element;
}

const baseDetailColumns: ProDescriptionsItemProps<InterfaceReply<typeof ModalDetailInterface>>[] = [
  {
    title: '类别',
    key: 'categoryName',
    dataIndex: 'categoryName',
  },
  {
    title: '商品名',
    key: 'productTitle',
    dataIndex: 'productTitle',
  },
  {
    title: '颜色',
    key: 'color',
    dataIndex: 'color',
    render: (dom, entity) => {
      const content = (
        <div>
          <p>白色</p>
          <p>黑色</p>
        </div>
      );
      return (
        <Space>
          <span>{entity.color}</span>
          <Popover placement="bottom" title="颜色列表" content={content} trigger="click">
            <Button className="h-5 p-0 leading-5" type="link" size="small">
              更多
            </Button>
          </Popover>
        </Space>
      );
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
];

const categoryColumns: ProDescriptionsItemProps<InterfaceReply<typeof ModalDetailInterface>>[] = [
  {
    title: '时间',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: '时长(小时)',
    key: 'hour',
    dataIndex: 'hour',
  },
  {
    title: '价格(元)',
    key: 'price',
    dataIndex: 'price',
    valueType: 'money',
  },
  {
    title: '加价幅度（元/次）',
    key: 'section',
    dataIndex: 'section',
  },
  {
    title: '保留价(元)',
    key: 'min',
    dataIndex: 'min',
  },
  {
    title: '保证金(元)',
    key: 'bail',
    dataIndex: 'bail',
  },
  {
    title: '是否收取佣金',
    key: 'ratio',
    dataIndex: 'ratio',
    span: 3,
  },
  {
    title: '图片',
    key: 'image',
    dataIndex: 'image',
    span: 3,
    render: (dom, entity) => {
      return (
        <Image.PreviewGroup>
          <Space size={16} className="flex flex-wrap">
            <Image width={88} src={entity.image} />
            <Image width={88} src={entity.image} />
            <Image width={88} src={entity.image} />
            <Image width={88} src={entity.image} />
            <Image width={88} src={entity.image} />
          </Space>
        </Image.PreviewGroup>
      );
    },
  },
];

export function ModalDetail(props: DetailApp) {
  const { children } = props;
  const [child, setChild] = useState<JSX.Element>();
  const [visible, setVisible] = useState(true);
  const { detailData, detailLoading } = useModalDetail();
  const { applyNo, paidNo, createTime, upTime } = detailData;

  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    const childEle = React.cloneElement(children, {
      ...children.props,
      onClick: () => {
        showModal();
      },
    });
    setChild(childEle);
  }, [children, children.props]);

  const renderTitle = () => {
    return (
      <div className="flex justify-between">
        <Space className="gap-4">
          弹窗详情
          <Tag color="green">已完成</Tag>
        </Space>
        <Space>
          <FormOutlined style={{ color: '#01C2C3' }} />
          <Button className="title-wrap-extend-btn" type="link">
            关联操作
          </Button>
        </Space>
      </div>
    );
  };

  return (
    <>
      {child}
      <Modal
        title={renderTitle()}
        visible={visible}
        okText="确定"
        onCancel={handleCancel}
        onOk={handleCancel}
        width={800}
        className="detail"
      >
        <Alert className="mb-5" message="这里是提示~" type="info" showIcon closable />
        <ProDescriptions
          title="基础信息"
          dataSource={detailData}
          loading={detailLoading}
          columns={baseDetailColumns}
        />
        <div className="desc-extend">
          <ProDescriptions column={2}>
            <ProDescriptions.Item label="商品唯一码">{applyNo}</ProDescriptions.Item>
            <ProDescriptions.Item label="单号">{paidNo}</ProDescriptions.Item>
            <ProDescriptions.Item label="创建时间">{createTime}</ProDescriptions.Item>
            <ProDescriptions.Item label="上架时间">{upTime}</ProDescriptions.Item>
          </ProDescriptions>
        </div>
        <Divider />
        <ProDescriptions
          title="分类信息"
          dataSource={detailData}
          loading={detailLoading}
          columns={categoryColumns}
        />
      </Modal>
    </>
  );
}
