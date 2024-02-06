import { Button, Modal, Space } from 'poizon-design';
import React, { useState } from 'react';
import ImportFile from '../importFile';

export default function StoreLabelModal() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        导入店铺标签
      </Button>
      <Modal
        destroyOnClose
        visible={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        footer={false}
        title={'导入店铺标签'}
        centered
      >
        <Space>
          <ImportFile
            btnText="上传文件"
            taskName="招商系统-导入店铺标签"
            taskTemplateCode="merchant_customer_import_shop_labels"
          ></ImportFile>
          <Button
            onClick={() =>
              window.open('https://cdn.dewu.com/node-common/6bc4cd7a-74ff-8253-597a-4ce62d10a9fd.xlsx')
            }
          >
            下载模版
          </Button>
        </Space>
      </Modal>
    </>
  );
}
