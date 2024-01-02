import type { FC } from 'react';
import { PageStore } from '../store';
import { Detail } from '../components';

/**
 * 得物页面详情
 * @figma https://www.figma.com/file/dSgEssQTqJ0ZylRBNnmxrK/POIZON-Design-Pro?node-id=267%3A15126
 * @author zhuangzaiqian
 * @update 2022.09
 */
const PageDetail: FC = () => {
  return (
    <PageStore>
      <Detail />
    </PageStore>
  );
};
export default PageDetail;
