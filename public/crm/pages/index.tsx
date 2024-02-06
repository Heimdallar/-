import { useMemo, useState, useLayoutEffect } from 'react';
import { useRequest } from 'ahooks';
import { ConfigProvider } from 'poizon-design';
import zhCN from 'poizon-design/lib/locale/zh_CN';
import { config } from '@/defaultSettings';
import { PageModeEnum, allCategory } from '@/pages/homePage/constants';
import { fetchStatisticIndexService } from '@/services/homePage';
import HomePage from '@/pages/homePage';
import styles from './index.less';

const { projectName } = config;

const App: React.FC = () => {
  // 接口获取的页面模式
  const [queryMode, setQueryMode] = useState<string>(PageModeEnum.欢迎模式);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [categoryOptionList, setCategoryOptionList] = useState([]);

  // 用户信息权限获取
  useRequest(() => fetchStatisticIndexService({}), {
    onSuccess: (res) => {
      const { categoryInfoList = [], viewMode = '' } = res.data;
      setQueryMode(viewMode);
      setCategoryOptionList(categoryInfoList);
      if (viewMode === PageModeEnum.单类目模式) {
        setCategoryId(categoryInfoList[0].value);
      } else if (viewMode === PageModeEnum.多类目模式) {
        setCategoryId(allCategory);
      }
    },
  });

  useLayoutEffect(() => {
    document.title = '首页-商家招商系统';
  });

  // 页面模式通过接口和本地变量进行计算组合出真正的页面模式
  const pageMode = useMemo(() => {
    switch (true) {
      case queryMode === PageModeEnum.单类目模式:
        return PageModeEnum.单类目模式;
      // 多类目的时候选择了具体的类目则使用单类目模式
      case queryMode === PageModeEnum.多类目模式 && categoryId !== allCategory:
        return PageModeEnum.单类目模式;
      case queryMode === PageModeEnum.多类目模式 && categoryId === allCategory:
        return PageModeEnum.多类目模式;
      default:
        return PageModeEnum.欢迎模式;
    }
  }, [categoryId, queryMode]);

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.container}>
        {pageMode === PageModeEnum.欢迎模式 ? (
          <div className={styles.home}>
            <h1 className={styles.title}>Welcome to {projectName}</h1>
          </div>
        ) : (
          <HomePage
            pageMode={pageMode}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            queryMode={queryMode}
            categoryOptionList={categoryOptionList}
          />
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;
