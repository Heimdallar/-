import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { BetaSchemaForm, ProFormInstance } from '@poizon-design/pro-form';
import ProCard from '@poizon-design/pro-card';
import { Modal } from 'poizon-design';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import { useStepColumns } from '../config';
import { initFormData } from '../util';
import './index.less';
import { initValues, STEP_ITEMS, labelCol, wrapperCol, rowCol } from '../config/const';
import SuccessTip from './components/successTip';
import StepFooter from './components/stepFooter';

const Edit: React.FC = () => {
  const containerRef: MutableRefObject<any> = useRef(null);
  const formRef = useRef<ProFormInstance>();
  // 编辑回显处理
  const [formData, setFormData] = useState<any>(initValues);
  const [loading, setLoading] = useState(false);
  const [fromPage, setFromPage] = useState('');
  const [applyId, setApplyId] = useState('');
  const [btnAction, setBtnAction] = useState('');
  const [adminEdit, setAdminEdit] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    initFormData(
      step,
      formRef,
      setLoading,
      setFromPage,
      setAdminEdit,
      setBtnAction,
      setApplyId,
      setShowResult,
      setFormData,
    );
  }, []);

  const handleBack = () => {
    if (!showResult) {
      Modal.confirm({
        title: '是否确认退出填写申请单',
        content: '退出后将不保存填写的数据？',
        icon: <ExclamationCircleFilled />,
        centered: true,
        onOk: () => {
          navigate(
            {
              pathname: '/settleIn/applyManagement',
            },
            { replace: true },
          );
        },
      });
    } else {
      navigate(
        {
          pathname: '/settleIn/applyManagement',
        },
        { replace: true },
      );
    }
  };
  const columns = useStepColumns(formRef, step, formData, fromPage, applyId, setFormData);

  const handleScrollToTop = () => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ProCard gutter={[16, 8]} style={{ minHeight: '100vh' }}>
        <div ref={containerRef} className="container">
          {showResult ? (
            <SuccessTip btnAction={btnAction} handleBack={handleBack} />
          ) : (
            <>
              <div className="stepContainer">
                <BetaSchemaForm
                  initialValues={formData}
                  layoutType="StepsForm"
                  formRef={formRef}
                  steps={STEP_ITEMS}
                  current={step}
                  grid
                  onCurrentChange={(current: number) => {
                    setStep(current);
                  }}
                  formProps={{
                    layout: 'horizontal',
                    labelCol,
                    wrapperCol: step !== 1 ? wrapperCol : rowCol,
                    labelWrap: true,
                    style: {
                      margin: '0',
                    },
                  }}
                  submitter={false}
                  columns={columns}
                />
              </div>
            </>
          )}
        </div>
      </ProCard>
      {!showResult ? (
        <StepFooter
          step={step}
          btnAction={btnAction}
          loading={loading}
          formData={formData}
          applyId={applyId}
          setFormData={setFormData}
          setShowResult={setShowResult}
          setLoading={setLoading}
          setBtnAction={setBtnAction}
          formRef={formRef}
          fromPage={fromPage}
          setStep={setStep}
          handleBack={handleBack}
          adminEdit={adminEdit}
          handleScrollToTop={handleScrollToTop}
        />
      ) : null}
    </>
  );
};

export default Edit;
