import React from 'react'
import { Modal, message } from 'poizon-design'
import { CheckCircleFill } from '@poizon-design/icons'
import styles from './index.module.less'
import moment from 'moment'

interface Props {
  visible: boolean
  setVisible: (val: boolean) => void
  dataSource: {
    invitationCode: string
    invitationCodeStartTime: number
    invitationCodeEndTime: number
  }
}

export default function index({
  visible,
  setVisible,
  dataSource
}: Props) {

  const handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = dataSource.invitationCode;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    message.success('邀请码已复制')
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      centered
      maskClosable={false}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleFill style={{ color: '#20C520', fontSize: 20 }} className={styles.invitationCodeIcon} />
          <span className={styles.invitationCodeTitle}>
            提交成功
          </span>
        </div>
      }
      cancelText="关闭"
      okText="复制邀请码"
      onCancel={() => { setVisible(false) }}
      onOk={() => { handleCopy() }}
    >
      <div className={styles.invitationCodeDesc}>
        邀请码在入驻商家后台时使用，稍后发送至您预留的手机
      </div>
      <div className={styles.invitationCode}>邀请码：<span className={styles.invitationCodeTime}>{dataSource.invitationCode}</span> </div>
      <div className={styles.invitationCode}>有效时间：<span className={styles.invitationCodeTime}>{moment(dataSource.invitationCodeStartTime).format('YYYY-MM-DD HH:mm:ss')}-{moment(dataSource.invitationCodeEndTime).format('YYYY-MM-DD HH:mm:ss')}</span></div>

    </Modal>
  )
}
