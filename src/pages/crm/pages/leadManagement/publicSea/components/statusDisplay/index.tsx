import React, { useState } from 'react';
import { statusOptions } from '../../config';
import { statusColor } from '../../contant';
import { Popover, Tag } from 'poizon-design';
import { getRejectReason } from '../../api';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IListItem } from '@/pages/leadManagement/privateSea/interface';
interface InProps {
  record: IListItem;
}
export default function StatusDisplay({ record }: InProps) {
  const [reason, setReason] = useState('-');

  const statusObj = statusOptions.find((item) => item.value === record.status) || {
    label: '',
    value: 0,
  };
  const color = statusColor[statusObj.value as 0 | 1 | 2];
  return statusObj.label ? <Tag color={color}>{statusObj.label}</Tag> : '-';
}
