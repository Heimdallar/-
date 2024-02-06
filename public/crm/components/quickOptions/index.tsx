import { Card, Space, Typography } from 'poizon-design';
import { useEffect, useState, forwardRef, useImperativeHandle, MutableRefObject, Ref } from 'react';
import { useUpdateEffect } from 'ahooks';
import { ProFormInstance } from '@poizon-design/pro-form';
import fetchClueObtainPersonalInfoService from '@/services/publicSea/obtainPersonalInfo';
import { Data } from '@/entities/publicSea/interface/obtainPersonalInfo';
import styles from './index.module.less';

const { Title } = Typography;
interface InProps {
  formRef: MutableRefObject<ProFormInstance | undefined>;
  setPersonalInfoType?: (value?: number) => void;
  fromPage: number;
  statusList?: Ref<number[]>;
}

type CommonParams = { [key: string]: any };

const QuickOptions = forwardRef(
  ({ formRef, setPersonalInfoType, fromPage, statusList }: InProps, ref) => {
    const [active, setActive] = useState<number | string>('');
    const [options, setOptions] = useState<Data[]>([]);

    useEffect(() => {
      queryOrdersQueryCountBySceneService();
    }, []);

    const queryOrdersQueryCountBySceneService = async () => {
      const res = await fetchClueObtainPersonalInfoService({ fromPage });
      if (!res.success) return;
      setOptions(res.data);
    };

    const quickOptionsItemClick = async (item: Data) => {
      if (item.personalInfoType === active) {
        setActive('');
        quickQuerySearch({});
        return;
      }
      const activeKey = item.personalInfoType;
      setActive(activeKey);
      const params = item.personalInfoSearchConditionResponse || {};
      setPersonalInfoType?.(item.personalInfoType);
      if (statusList) {
        statusList.current = params.statusList || [];
      }
      // 这里是获取查询参数
      quickQuerySearch({ ...params });
    };

    const quickQuerySearch = (params?: CommonParams) => {
      if (!formRef.current) return;
      formRef.current.resetFields();
      formRef.current.setFieldsValue(params);
      formRef.current.submit();
    };

    useUpdateEffect(() => {
      if (active) return;
      setPersonalInfoType?.(undefined);
    }, [active]);

    useImperativeHandle(ref, () => {
      return {
        setActive,
        queryOrdersQueryCountBySceneService,
      };
    });

    return (
      <Card style={{ marginBottom: 16 }}>
        <div className={styles.container}>
          <Space>
            <Title level={5} style={{ margin: 0, marginLeft: 17 }}>
              快捷筛选
            </Title>
            {options.map((item) => {
              if (!item.isVisible) return null;
              return (
                <div
                  className={`${styles.item} ${
                    active === item.personalInfoType ? styles.itemBgc : ''
                  }`}
                  key={item.personalInfoType}
                  onClick={() => quickOptionsItemClick(item)}
                >
                  {item.name}{' '}
                  <span style={{ color: active === item.personalInfoType ? '#01c2c3' : '#e29a32' }}>
                    {item.count}
                  </span>
                </div>
              );
            })}
          </Space>
        </div>
      </Card>
    );
  },
);

export default QuickOptions;
