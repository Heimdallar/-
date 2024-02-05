import { CheckCircleFilled } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Modal } from 'poizon-design';

export const handleNotify = (msg: string) => {
  Modal.confirm({
    title: msg || '成功',
    centered: true,
    icon: <CheckCircleFilled color="#20C520" />,
    okText: '知道了',
    cancelText: '任务进度',
    content: (
      <div style={{ color: '#7F7F8E', fontSize: '14px' }}>
        <span>请至任务中心查看任务进度！</span>
      </div>
    ),
    onCancel: () => {
      history.push('/taskCenter/export');
    },
  });
};
