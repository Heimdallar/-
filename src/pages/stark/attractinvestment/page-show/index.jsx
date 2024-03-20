import { Modal, Button, Form } from 'poizon-design';
import { CheckCircle } from '@poizon-design/icons';
import React, {useState} from 'react';
import { Alert } from 'poizon-design';
import Pageform from '../page-form';
import './index.less'
import styles from './index.less';
import { fetchData, postData } from '../service';

const Show = () => {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2 ] = React.useState(false);
  const [hover, setHover] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  //const [selectedId, setSelectedId] = useState(null);
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

  const [formref]=Form.useForm()

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible2(true)
    handleFormSubmit()
    const { activityId, userId, activityInvitingCode } = formref.getFieldsValue(['activityId', 'userId', 'activityInvitingCode']);
    handleFormSubmit({ activityId, userId, activityInvitingCode });
  };

  const handleOk2 = () => { 
    setVisible2(false)
    //handleFormSubmit()
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
    console.log('Form Data:', formData);
    setFormData(formData);
    postData(params) // 调用 postData 方法发送数据到后端
    .then(response => {
        console.log(response,'Form Data submitted successfully!');
        // 可以在这里处理提交成功后的逻辑
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
        <Pageform onFormSubmit={handleFormSubmit}  formref={formref}></Pageform>
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
