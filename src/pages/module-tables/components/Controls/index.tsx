import { FC } from 'react';
import { Button, Dropdown, Menu, Space } from 'poizon-design';
import { DownLine } from '@poizon-design/icons';
import { InterfaceReply } from '@/utils/request';
import { TableListInterface } from '@/pages/module-tables/service/api';

type DataReply = InterfaceReply<typeof TableListInterface>['contents'][0];

// 单挑数据的操作
export const Controls: FC<{
  record: DataReply;
  onDeleteItem: (recordId: string) => void;
  onViewItem: (recordId: string) => void;
  onEditItem: (record: unknown) => void;
}> = ({ record, onDeleteItem, onViewItem, onEditItem }) => {
  return (
    <Space size={0} split={<span style={{ color: '#DCDCE6' }}>|</span>}>
      <Button
        type="link"
        size="small"
        onClick={() => {
          onEditItem(record);
        }}
      >
        编辑
      </Button>
      <Button
        type="link"
        size="small"
        key="editable"
        onClick={() => {
          onViewItem(record.id);
        }}
      >
        详情
      </Button>
      <Button
        type="link"
        size="small"
        danger
        onClick={() => {
          onDeleteItem(record.id);
        }}
      >
        删除
      </Button>
      <Dropdown
        overlay={
          <Menu
            items={[
              {
                key: 'detail',
                label: (
                  <Button type="link" size="small">
                    其他操作
                  </Button>
                ),
              },
              {
                key: 'disable',
                label: (
                  <Button type="link" size="small" danger disabled>
                    删除数据
                  </Button>
                ),
              },
            ]}
          />
        }
      >
        <Button type="link" size="small">
          更多
          <DownLine />
        </Button>
      </Dropdown>
    </Space>
  );
};
