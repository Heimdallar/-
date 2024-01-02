import { ProFormInstance } from '@poizon-design/pro-form';
import { Card, Steps, Button, Space, message } from 'poizon-design';
import { FC, useCallback, useRef, useState } from 'react';
import { CompanyInfo } from './components/CompanyInfo';
import { ErrorInfo } from './components/ErrorInfo';
import { TipBox } from './components/TipBox';
import { StepsList } from './constant';
import styles from './index.less';

/**
 * 得物StepForm UI标准: Stark 企业入驻流程
 * @figma https://www.figma.com/file/HDxtlLKGF1fKUpp0rTzYkA/%E5%95%86%E5%AE%B6%E5%90%8E%E5%8F%B04?node-id=3801%3A2711
 * @author qiukaixiang
 * @update 2022.09
 */
const DuStepsForm: FC = () => {
  const [errorList] = useState([
    // {
    //   label: '代码：',
    //   value: '仅可输入18位数字或大写字母。',
    // },
    // {
    //   label: '有效期：',
    //   value: '结束日期必须大于开始日期。',
    // },
  ]);

  const [tipKey, setTipKey] = useState('manageType');
  const formRef = useRef<ProFormInstance>();

  // 表单信息变更-》更新tip
  const handleFieldChange = useCallback((d: Record<string, any>) => {
    setTipKey(Object.keys(d)[0]);
  }, []);

  // 下一步
  const handleNextStep = useCallback(() => {
    formRef.current
      ?.validateFieldsReturnFormatValue?.()
      .then((values) => {
        console.log('校验表单并返回格式化后的所有数据：', values);
      })
      .catch(() => {
        message.error('参数输入异常，请检查后重新提交');
      });
  }, []);

  return (
    <div className="relative">
      <Card className="mb-[24px]">
        <Steps current={0}>
          {StepsList.map((item) => (
            <Steps.Step title={item} key={item} />
          ))}
        </Steps>
      </Card>
      <div className="flex">
        <div className="w-full shadow-ct">
          <CompanyInfo ref={formRef} onFieldChange={handleFieldChange} />
        </div>
        <div className="w-[400px] pl-[24px]">
          {!!errorList.length && <ErrorInfo errorList={errorList} />}
          <TipBox activeKey={tipKey} />
        </div>
      </div>
      <div className={styles.footer}>
        <Space>
          <Button type="primary" onClick={handleNextStep}>
            下一步
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default DuStepsForm;
