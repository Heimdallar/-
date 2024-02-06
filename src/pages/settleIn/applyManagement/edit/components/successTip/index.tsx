import { CheckCircleFilled } from '@ant-design/icons';
import { Button } from 'poizon-design';
import './index.less';
interface ISuccessTip {
  btnAction: string;
  handleBack: () => void;
}
const successTip: React.FC<any> = ({ btnAction, handleBack }: ISuccessTip) => {
  return (
    <div className="successTip">
      <CheckCircleFilled className="successIcon" />
      <p>已成功{btnAction === 'submit' ? '创建' : '保存'}申请单</p>
      <Button onClick={() => handleBack()}>返回列表</Button>
    </div>
  );
};

export default successTip;
