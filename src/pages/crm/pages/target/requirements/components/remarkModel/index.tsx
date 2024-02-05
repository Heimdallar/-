import { Modal } from 'poizon-design';
import { IModelBaseProps } from '../../interface';

interface IModelProps extends IModelBaseProps {
  remark: string;
}

export default ({ remark, visible, setVisible }: IModelProps) => {
  return (
    <Modal
      visible={visible}
      title="查看备注"
      width={800}
      maskClosable={false}
      centered={true}
      destroyOnClose={true}
      onCancel={() => {
        setVisible(false);
      }}
      footer={[]}
    >
      <div>备注内容：{ remark }</div>
    </Modal>
  );
};
