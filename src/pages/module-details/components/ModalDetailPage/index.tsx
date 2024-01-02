import type { FunctionComponent } from 'react';
import { Card, Button } from 'poizon-design';
import { ModalDetail } from './ModalDetail';

export const ModalDetailPage: FunctionComponent = () => {
  return (
    <div>
      <Card title="弹窗详情" bordered={false}>
        <ModalDetail>
          <Button type="primary">打开弹窗</Button>
        </ModalDetail>
      </Card>
    </div>
  );
};
