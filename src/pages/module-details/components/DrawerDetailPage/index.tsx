import type { FunctionComponent } from 'react';
import { Card, Button } from 'poizon-design';
import { DrawerDetail } from './DrawerDetail';

export const DrawerDetailPage: FunctionComponent = () => {
  return (
    <div>
      <Card title="抽屉-详情" bordered={false}>
        <DrawerDetail>
          <Button type="primary">打开抽屉</Button>
        </DrawerDetail>
      </Card>
    </div>
  );
};
