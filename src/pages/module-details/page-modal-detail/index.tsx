import type { FC } from 'react';
import { PageStore } from '../store';
import { ModalDetailPage } from '../components';

const PageDetail: FC = () => {
  return (
    <PageStore>
      <ModalDetailPage />
    </PageStore>
  );
};
export default PageDetail;
