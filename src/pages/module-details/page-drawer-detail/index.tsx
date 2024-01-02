import type { FC } from 'react';
import { PageStore } from '../store';
import { DrawerDetailPage } from '../components';

const PageDetail: FC = () => {
  return (
    <PageStore>
      <DrawerDetailPage />
    </PageStore>
  );
};
export default PageDetail;
