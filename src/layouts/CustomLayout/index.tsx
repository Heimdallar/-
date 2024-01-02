import { useState, useMemo, PropsWithChildren, FC, ReactNode } from 'react';
import { DoubleLeftLine, DoubleRightLine, LeftCircle, RightCircle } from '@poizon-design/icons';
import { ConfigProvider, Tooltip } from 'poizon-design';
import { proRoute, useOutlet } from '@umijs/max';
import { ProLayout } from '@poizon-design/pro-layout';
import classNames from 'classnames';
import zhCN from 'poizon-design/es/locale/zh_CN';
import { useGlobalContainer } from '@/globalStore';
import { ProEmpty } from '../Empty';
import { MenuType } from './constant';
import styles from './index.less';

interface IProps {
  title?: string;
  logo?: string;
  rightContentRender?: ReactNode;
  menuRender?: ReactNode;
  bodyRender?: ReactNode;
  children?: ReactNode;
  menuType?: MenuType;
}

/**
 * 双栏Sidebar布局
 * @param props -
 * @returns
 */
export const Layout: FC<PropsWithChildren<IProps>> = (props) => {
  const { menuType = MenuType.BUSINESS, ...rest } = props;

  return (
    <ConfigProvider locale={zhCN} renderEmpty={ProEmpty}>
      {menuType === MenuType.BUSINESS ? (
        <BusinessLayout {...rest} />
      ) : (
        <ProDefaultLayout {...rest} />
      )}
    </ConfigProvider>
  );
};

/**
 * 得物商家Layout
 * @param props -
 */
export const BusinessLayout: FC<IProps> = (props) => {
  const outlet = useOutlet();
  const [collapsed, setCollapsed] = useState(false);
  const LeftClass = classNames(styles.layoutLeft, {
    [styles.leftHidden]: collapsed,
  });
  const menuClass = classNames(styles.layoutLeftCollapsed, {
    [styles.collapsedHidden]: collapsed,
  });

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.layoutHeader}>
        <div className={styles.headerLeft}>
          {props?.logo && (
            <div className={styles.headerLogo}>{props?.logo && <img src={props.logo} />}</div>
          )}
          <div className={styles.headerTitle}>{props?.title}</div>
        </div>
        <div className={styles.headerRight}>{props?.rightContentRender}</div>
      </div>
      <div className={styles.layoutBody}>
        <div className={LeftClass}>
          {props?.menuRender}
          <Tooltip placement="right" title={collapsed ? '展开菜单' : '收起菜单'}>
            <div className={menuClass} onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <DoubleRightLine /> : <DoubleLeftLine />}
            </div>
          </Tooltip>
        </div>
        <div className={styles.layoutRight}>
          <div className={styles.layoutContent}>{outlet}</div>
        </div>
      </div>
    </div>
  );
};

/**
 * ProDefaultLayout
 * @param props -
 * @returns
 */
export const ProDefaultLayout: FC<IProps> = (props) => {
  const { title = 'Pro' } = props;

  const { rawMenuList, userInfo } = useGlobalContainer();

  const { layoutMenus } = proRoute.useMenus(rawMenuList);

  const waterMarkProps = useMemo(() => {
    return {
      gapX: 160,
      gapY: 180,
      zIndex: 1000,
      fontColor: 'rgba(0,0,0,.05)',
      content: `${userInfo.username}@${userInfo.mobile?.substring(7)}`,
    };
  }, [userInfo]);
  return (
    <ProLayout
      title={title}
      className={styles.prolayoutWrapper}
      fixedHeader
      fixSiderbar
      splitMenus={false}
      collapsedButtonRender={(collapsed?: boolean) => (
        <span id="collapsed-button">{collapsed ? <RightCircle /> : <LeftCircle />}</span>
      )}
      logo={props?.logo}
      waterMarkProps={waterMarkProps}
      rightContentRender={() => props?.rightContentRender}
      {...layoutMenus}
    >
      {props?.children}
    </ProLayout>
  );
};
