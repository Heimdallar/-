import { Tabs, Modal } from 'poizon-design';
import {
  ContextType,
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { history, useOutlet } from '@umijs/max';
import { useMap } from 'ahooks';
import styles from './index.less';

const { TabPane } = Tabs;

// eslint-disable-next-line import/no-unused-modules
export const TabStoreContext = createContext(
  {} as {
    /** 移除tab */
    removeTab: (key: string) => void;
  },
);

type TabStoreType = ContextType<typeof TabStoreContext>;

export const PageTabs: FunctionComponent<{
  activityKey: string;
  tabTitle: string;
}> = ({ activityKey, tabTitle }) => {
  const currentNode = useOutlet();

  // tabs key map
  const [tabsMap, { get: tabGet, set: tabSet, remove: tabRemove }] = useMap<
    string,
    {
      /** tab key */
      key: string;
      /** tab标题 */
      title: string;
      /** tab内容 */
      node: ReactNode;
    }
  >();

  const tabsArr = useMemo(() => {
    const tabs = Array.from(tabsMap);

    return (
      tabs?.map(([, item]) => {
        return {
          ...item,
          closable: tabs.length > 1,
        };
      }) || []
    );
  }, [tabsMap]);

  useEffect(() => {
    if (!tabGet(activityKey) && tabTitle) {
      tabSet(activityKey, {
        key: activityKey,
        title: tabTitle,
        node: currentNode,
      });
    }
  }, [activityKey, currentNode, tabGet, tabSet, tabTitle]);

  const parseQuery = useCallback((str: string) => {
    const queryStr = str.split('?')[1]?.split('&') ?? [];
    const arr = queryStr.map((item) => item.split('='));
    return Object.fromEntries(arr);
  }, []);

  const parseTitle = useCallback(
    (key: string, title: string) => {
      const queryTitle = decodeURI(parseQuery(key).tabTitle || '');
      return queryTitle || title;
    },
    [parseQuery],
  );

  /** tab切换 */
  const onTabsChange = useCallback((key: string) => {
    history.push(key);
  }, []);

  // 移除tab
  const removeTab: TabStoreType['removeTab'] = useCallback(
    (key) => {
      // 如果移除了自己
      if (activityKey === key) {
        const keys = Array.from(tabsMap.keys());

        const findIndex = keys.findIndex((v) => v === key);

        const prevIndex = findIndex - 1;
        const nextIndex = findIndex + 1;

        if (nextIndex < keys.length) {
          history.push(keys[nextIndex]);
        } else if (prevIndex > -1) {
          history.push(keys[prevIndex]);
        } else {
          history.push('/');
        }

        tabRemove(key as string);
      } else {
        tabRemove(key as string);
      }
    },
    [activityKey, tabRemove, tabsMap],
  );

  /** tab编辑 */
  const onTabsEdit = useCallback(
    (key: string, type: string) => {
      if (type !== 'remove') {
        return '';
      }

      const { confirmOnClose = false } = parseQuery(key);
      if (!confirmOnClose) {
        return removeTab(key);
      }

      return Modal.confirm({
        title: '确认关闭吗？',
        content: '关闭后本页面的数据将不被保存',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          removeTab(key);
        },
      });
    },
    [parseQuery, removeTab],
  );

  return (
    <TabStoreContext.Provider value={{ removeTab }}>
      <Tabs
        className={styles.tabsWrapper}
        hideAdd
        type="editable-card"
        activeKey={activityKey}
        onChange={onTabsChange}
        onEdit={(e, type) => {
          onTabsEdit(e as string, type);
        }}
      >
        {tabsArr.map((item) => {
          return (
            <TabPane key={item.key} tab={parseTitle(item.key, item.title)} closable={item.closable}>
              {item.node}
            </TabPane>
          );
        })}
      </Tabs>
    </TabStoreContext.Provider>
  );
};
