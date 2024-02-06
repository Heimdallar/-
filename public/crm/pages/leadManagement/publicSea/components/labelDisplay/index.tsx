import React from 'react';
import { Button, Popover, Space, Tag, Typography } from 'poizon-design';
import { IListItem } from '@/pages/leadManagement/privateSea/interface';

const { Link } = Typography

interface InProps {
  record: IListItem;
}
export default function LabelDisplay({ record }: InProps) {
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
