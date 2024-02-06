import { Tabs, Modal } from 'poizon-design';
import { cloneDeep } from 'lodash';
import { FunctionComponent, ReactNode, useCallback, useEffect, useState } from 'react';
import { history } from '@umijs/max';
import styles from './index.less';

const { TabPane } = Tabs;

interface ITabType {
  key: string;
  title: string;
  node: ReactNode;
}

export const PageTabs: FunctionComponent<{
  activityKey: string;
  tabTitle: string;
  node: ReactNode;
}> = ({ activityKey, tabTitle, node }) => {
  const [tabsMap, setTabsMap] = useState<ITabType[]>([]);
  useEffect(() => {
    const findIndex = tabsMap.findIndex((v) => v.key === activityKey);
    if (findIndex === -1 && tabTitle) {
      setTabsMap((prev: ITabType[]) => {
        if (activityKey.includes('settleIn/applyManagement/edit')) {
          let actIdx = -1;
          let tabExist = false;
          for (let i = 0; i < prev.length; i++) {
            const curPath = window.location.pathname;
            if (prev[i].key.includes(curPath)) {
              actIdx = i;
              tabExist = true;
              break;
            }
          }
          if (tabExist) {
            const clonedPrev: ITabType[] = cloneDeep(prev);
            clonedPrev[actIdx] = {
              key: activityKey,
              title: tabTitle,
              node,
            };
            return clonedPrev;
          }
        }
        return prev.concat({
          key: activityKey,
          title: tabTitle,
          node,
        });
      });
    }
  }, [node, activityKey, tabTitle, tabsMap]);

  /** tab切换 */
  const onTabsChange = useCallback((key: string) => {
    history.push(key);
  }, []);

  const removeTag = useCallback(
    function setTabs(key: string) {
      // 如果移除了自己
      if (activityKey === key) {
        setTabsMap((prev) => {
          const c = cloneDeep(prev);
          const findIndex = c.findIndex((v) => v.key === key);
          const prevIndex = findIndex - 1;
          const nextIndex = findIndex + 1;
          if (nextIndex < c.length) {
            history.push(prev[nextIndex]?.key);
          } else if (prevIndex > -1) {
            history.push(prev[prevIndex]?.key);
          } else {
            history.push('/');
          }
          c.splice(findIndex, 1);
          return c;
        });
      } else {
        setTabsMap((prev) => {
          const c = cloneDeep(prev);
          const findIndex = c.findIndex((v) => v.key === key);
          c.splice(findIndex, 1);
          return c;
        });
      }
    },
    [activityKey],
  );

  /** tab编辑 */
  const onTabsEdit = useCallback(
    (key: string, type: string) => {
      if (type !== 'remove') return '';
      const { confirmOnClose = false } = parseQuery(key);
      if (!confirmOnClose) return removeTag(key);
      return Modal.confirm({
        title: '确认关闭吗？',
        content: '关闭后本页面的数据将不被保存',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          removeTag(key);
        },
      });
    },
    [removeTag],
  );

  const parseQuery = (str = '') => {
    const queryStr = str.split('?')[1]?.split('&') ?? [];
    const arr = queryStr.map((item) => item.split('='));
    return Object.fromEntries(arr);
  };

  const parseTitle = (key: string, title: string) => {
    const queryTitle = decodeURI(parseQuery(key).tabTitle || '');
    return queryTitle || title;
  };

  return (
    <Tabs
      className={styles.aliveTabs}
      hideAdd
      type="editable-card"
      activeKey={activityKey}
      onChange={onTabsChange}
      onEdit={(e, type) => {
        onTabsEdit(e as string, type);
      }}
    >
      {tabsMap.map((item) => {
        return (
          <TabPane key={item.key} tab={parseTitle(item.key, item.title)}>
            {item.node}
          </TabPane>
        );
      })}
    </Tabs>
  );
};
