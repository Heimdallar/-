import { Button, Modal, Space } from 'poizon-design';
import React, { useState } from 'react';
import ImportFile from '../importFile';


interface Iprops{
btnText:string
}

export default function ImportLabelModal({btnText}:Iprops) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        {btnText}
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        title={btnText}
        centered
      >
        <Space>
          <ImportFile
            btnText="上传文件"
          ></ImportFile>
          <Button
          >
            下载模版
          </Button>
        </Space>
      </Modal>
    </>
  );
}
