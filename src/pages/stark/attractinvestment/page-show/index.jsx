import { Modal, Button, Form } from 'poizon-design';
import React, {useState} from 'react';
import { Alert } from 'poizon-design';
import Pageform from '../page-form';
import './index.less'
import styles from './index.less';
import { postData } from '../service';
import { CheckCircleTwoTone } from '@ant-design/icons';

const Show = () => {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2 ] = React.useState(false);
  const [invitingCode, setInvitingCode] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hover, setHover] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [formationData, setFormData] = useState({
    companyName: '',
    brandName: '',
    categoryId: '',
    contactPerson: '',
    phoneCall:'',
    certificateType:'',
    brandType:'',
    sellWays:'',
    shopName:'',
    shopLink:'',
    productNum:'',
    productValue:'',
    companyValue:'',
    fansRed:'',
    fansTiktok:'',
  });

  const [formref]= Form.useForm()

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    handleFormSubmit()
  };

  const handleOk2 = () => { 
    setVisible2(false)
  }

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancel2=()=>{
    setVisible2(false)
  }

  const handleFormSubmit = (formData) => {
    console.log(formref.getFieldsValue(), 'formref.getFieldsValue()')
    const params = formref.getFieldsValue()
    console.log('Form Data:', params);
    setFormData(formref.getFieldsValue());

    const additionalData = {
      activityId: '1769210038249189379',
      userId: '110',
      activityInvitingCode: '110'
    };
    const formatParams={...params,...additionalData}

    postData(formatParams) // 调用 postData 方法发送数据到后端
    .then(response => {
        console.log(response,'Form Data submitted successfully!');
        setInvitingCode(response.code);
      setStartTime(response.startTime);
      setEndTime(response.endTime);
      setVisible2(true)
    })
    .catch(error => {
        console.error('Error submitting form data:', error);
    });
  };

  return (
    <>
      <Button className={styles.button} type = {hover?"primary":"default"} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={showModal}>
        立即报名
      </Button>
      <Modal
        className='modal'
        title="请填写表单"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Alert message="提交成功后,得物运营人员将会在5-10个工作日内联系您沟通入驻事项" type="info" showIcon />
        <br></br>
        <Pageform onFormSubmit={handleFormSubmit} formref={formref}></Pageform>
      </Modal>

      {
        invitingCode
        &&
        <Modal
          className='modal'
          title="提交成功"
          visible={visible2}
          onOk={handleOk2}
          confirmLoading={confirmLoading}
          onCancel={handleCancel2}
        >
        <h3>邀请码在入驻商家后台时使用, 稍后发送至您预留的手机</h3>
        <span>邀请码: {invitingCode}</span>
        <br/>
        <span>有效时间:{startTime}-{endTime}</span>
        <CheckCircleTwoTone twoToneColor="#52c41a" style={{position:'absolute',top:'20px',left:'10px'}}/>
        </Modal>
      }
    </>
  );
};

export default Show
