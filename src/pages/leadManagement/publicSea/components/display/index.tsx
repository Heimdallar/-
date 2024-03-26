import React, { useState } from 'react';
import { IListItem, statusOptions } from '../../interface';
import { statusColor } from '../../interface';
import { Popover, Space, Tag, Typography } from 'poizon-design';
interface InProps {
  record: IListItem;
}
export function StatusDisplay({ record }: InProps) {

  const statusObj = statusOptions.find((item) => item.value === record.status) || {
    label: '',
    value: 0,
  };
  const color = statusColor[statusObj.value as 9 | 1 | 2];
  return statusObj.label ? <Tag color={color}>{statusObj.label}</Tag> : '-';
}


const { Link } = Typography

interface InProps {
  record: IListItem;
}
export  function LabelDisplay({ record }: InProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Space direction="horizontal">
        {record.labelNames &&
          record.labelNames.slice(0, 2).map((item: string, index: number) => (
            <Space key={index} direction="horizontal">
              <Tag>{item}</Tag>
            </Space>
          ))}
      </Space>
      {record.labelNames && record.labelNames.length > 2 && (
        <div onClick={(e) => e.stopPropagation()}>
          <Popover
            trigger="click"
            content={() =>
              record.labelNames &&
              record.labelNames.length > 2 &&
              record.labelNames.map((item: string, index: number) => (
                <Space key={index} direction="horizontal">
                  <Tag>{item}</Tag>
                </Space>
              ))
            }
          >
            <Link>查看全部</Link>
          </Popover>
        </div>
      )}
    </div>
  );
}