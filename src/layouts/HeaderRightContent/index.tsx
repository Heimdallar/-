import { ComponentProps } from 'react';
import { Menu, Dropdown, Avatar } from 'poizon-design';
import { DownLine } from '@poizon-design/icons';
import { useGlobalContainer } from '@/globalStore';
import styles from './index.less';

type MenuProps = ComponentProps<typeof Menu>;

/** 退出 */
const LogoutMenu: React.FC = () => {
  const menus = [
    {
      label: '退出登录',
      key: 'logout',
    },
  ];

  const handleMenuClick = (info: Parameters<NonNullable<MenuProps['onClick']>>[0]) => {
    switch (info.key) {
      case 'logout': {
        window.multisso.ssoLogout();
        break;
      }
      default: {
        // TODO: default Actions
      }
    }
  };

  return <Menu items={menus} onClick={handleMenuClick} />;
};

/**
 * 顶部右侧模块
 * @returns
 */
export const HeaderRightContent: React.FC = () => {
  const { userInfo } = useGlobalContainer();

  return (
    <>
      <div className={styles.scrollRoot}>
        <p className={styles.scrollContent}>
          “杨浦城市宣传片:
          我手里拿的上海牌手表，它承载了很多中国人对国货精品的记忆，而今天互联宝地中半数以上的中后台系统是由
          POIZON DESIGN 所支撑的”
        </p>
      </div>
      {/* <span
        className={styles.action}
        onClick={() => {
          window.open('https://pd.shizhuang-inc.com/');
        }}
      >
        <QuestionCircle />
      </span> */}
      <Dropdown overlay={<LogoutMenu />}>
        <a className={styles.rightMenu}>
          <Avatar
            size={24}
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          {userInfo?.realname ? <span className={styles.username}>{userInfo.realname}</span> : null}
          <DownLine />
        </a>
      </Dropdown>
    </>
  );
};
