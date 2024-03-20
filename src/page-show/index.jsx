import { Modal, Button } from 'poizon-design';
import { CheckCircle } from '@poizon-design/icons';
import React from 'react';
import { Alert } from 'poizon-design';
import Pageform from '../page-form';
import './index.less'

const Show = () => {
  const [visible, setVisible] = React.useState(false);
  const [visible2,setVisible2]=React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const showModal = () => {
    setVisible(true);
    
  };
  const handleOk = () => {
    setVisible2(true)
  };

  const handleOk2=()=>{
    setVisible2(false)
  }

  const handleCancel = () => {
    setVisible(false);
  };
  const handleCancel2=()=>{
    setVisible2(false)
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        立即报名
      </Button>
      <Modal
      className='modal'
        title="请填写表单"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert message="提交成功后，得物运营人员将会在5-10个工作日内联系您沟通入驻事项" type="info" showIcon />
        <br></br>
        <Pageform></Pageform>
      </Modal>

      <Modal
      className='modal'
        title="提交成功"
        visible={visible2}
        onOk={handleOk2}
        confirmLoading={confirmLoading}
        onCancel={handleCancel2}
      >
        <p>请填写对应的内容</p>
        <span>邀请码:dlaisjdwa</span>
        <br/>
        <span>有效时间:2024-1-22-2024-12/28 19:22:11</span>
        <CheckCircle style={{position:'absolute',top:'20px',left:'10px'}}></CheckCircle>
      </Modal>
    </>
  );
};

export default Show
