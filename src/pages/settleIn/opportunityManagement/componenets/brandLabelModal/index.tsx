import { Button, Modal, Space } from 'poizon-design';
import React, { useState } from 'react';
import ImportFile from '../importFile';

export default function BrandLabelModal() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        导入品牌标签
      </Button>
      <Modal
        destroyOnClose
        visible={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        footer={false}
        title={'导入品牌标签'}
        centered
      >
        <Space>
          <ImportFile
            btnText="上传文件"
            taskName="招商系统-导入招商品牌库标签"
            taskTemplateCode="merchant_customer_import_brand_labels"
          ></ImportFile>
          <Button
            onClick={() =>
              window.open('https://cdn.dewu.com/node-common/0bea112b-84cb-5196-d537-ec47ed8b78f6.xlsx')
            }
          >
            下载模版
          </Button>
        </Space>
      </Modal>
    </>
  );
}
