import React, { useState } from 'react';
import { Badge } from 'poizon-design';
import ClassNames from 'classnames';
import { UpLine, DownLine } from '@poizon-design/icons';
import { useLocation, history } from '@umijs/max';
import styles from './index.less';

/**
 * you can also import from poizon-design
 * import { MenuDataItem } from '@poizon-design/pro-layout';
 */
export interface MenuDataItem {
  /** @name 子菜单 */
  routes?: MenuDataItem[];
  /** @name 在菜单中隐藏子节点 */
  hideChildrenInMenu?: boolean;
  /** @name 在菜单中隐藏自己和子节点 */
  hideInMenu?: boolean;
  /** @name 在面包屑中隐藏 */
  hideInBreadcrumb?: boolean;
  /** @name 菜单的icon */
  icon?: React.ReactNode;
  /** @name 自定义菜单的国际化 key */
  locale?: string | false;
  /** @name 菜单的名字 */
  name?: string;
  /** @name 用于标定选中的值，默认是 path */
  key?: string;
  /** @name disable 菜单选项 */
  disabled?: boolean;
  /** @name 路径,可以设定为网页链接 */
  path?: string;
  /**
   * @deprecated 当此节点被选中的时候也会选中 parentKeys 的节点
   * @name 自定义父节点
   */
  parentKeys?: string[];
  /** @name 隐藏自己，并且将子节点提升到与自己平级 */
  flatMenu?: boolean;
  /** @name 指定外链打开形式，同a标签 */
  target?: string;
  /** @name 是否有更新 */
  new?: boolean;
  [key: string]: any;
}

type MenuProps = {
  items: MenuDataItem[];
  onMenuClick?: (menu: MenuDataItem) => void;
};

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  return (
    <div className={styles.menuWrapper}>
      {props.items?.map((menu, idx) => (
        <MenuItem {...menu} key={menu?.key || idx.toString()} onClick={props?.onMenuClick} />
      ))}
    </div>
  );
};

/**
 * 菜单子项
 * @param props
 * @returns
 */
export const MenuItem: React.FC<MenuDataItem & { onClick?: (menu: MenuDataItem) => void }> = (
  props,
) => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const onMenuClick = (menu: MenuDataItem) => {
    if (props?.onClick) {
      props.onClick(menu);
    } else {
      history.push(menu.path);
    }
  };

  return (
    <div className={styles.menuItemWrapper}>
      <div className={styles.title} onClick={() => setCollapsed(!collapsed)}>
        <a className={pathname === props?.path ? styles.active : ''}>
          <span className={styles.menuIcon}>{props?.icon}</span>
          {props?.name}
        </a>
        <span className={styles.foldIcon}>{collapsed ? <DownLine /> : <UpLine />}</span>
      </div>

      {props?.routes && (
        <div className={ClassNames(styles.subMenu, collapsed && styles.collapsed)}>
          {props.routes.map((subMenu, sIdx) => {
            return (
              <div className={styles.subMenuItem} key={sIdx}>
                <Badge dot={subMenu.new}>
                  <a
                    className={pathname === subMenu?.path ? styles.active : ''}
                    key={subMenu?.key || sIdx.toString()}
                    onClick={() => onMenuClick(subMenu)}
                  >
                    {subMenu?.name}
                  </a>
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
