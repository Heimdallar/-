import React, { useState } from 'react'
import { Button, Modal, message } from 'poizon-design';
import fetchIeaInvaildService from '@/services/fetchIeaInvaildService/fetchIeaInvaildService'
import { datasProps } from '../type'

interface Props {
  data: datasProps
  refreshList: () => void
}

export default function index({ data, refreshList }: Props) {
  const [visible, setIsVisible] = useState(false)

  const handleCancel = () => {
    setIsVisible(false)
  }

  const onConfirm = async () => {
    const res = await fetchIeaInvaildService({
      activityId: data.id
    })
    if (res.success) {
      message.success('操作成功')
      setIsVisible(false)
      refreshList()
    }
  }

  return (
    <>
      <Button type='link' onClick={() => {
        setIsVisible(true)
      }}>作废</Button>
      {visible && <Modal
        title="作废确认"
        visible={visible}
        width={500}
        destroyOnClose
        onCancel={handleCancel}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" onClick={onConfirm}>确认</Button>
            <Button onClick={handleCancel}>取消</Button>
          </div>}>
        <div>是否确认作废活动？作废后该活动的邀约链接和未使用的邀请码均将失效，已使用的邀请码不受影响</div>
      </Modal>
      }

    </>
  )
}
