import { Menu, Dropdown, Avatar } from 'poizon-design';
import { DownLine } from '@poizon-design/icons';
import { useGlobalContainer } from '@/globalStore';
import styles from './index.less';
import ProblemFeedback from '../problemFeedback'

const LogoutMenu: React.FC = () => {
  const toLogout = () => {
    window.multisso.ssoLogout();
  };

  return (
    <Menu>
      <Menu.Item key="logout" onClick={toLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );
};

/** 顶部右侧模块 */
export const HeaderRightContent: React.FC = () => {
  const { userInfo } = useGlobalContainer();

  return (
    <>
     <ProblemFeedback />
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
