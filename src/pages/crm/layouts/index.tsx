import { ComponentProps, FunctionComponent, useCallback, useEffect } from 'react';
import { duRequest, Link, Outlet, proRoute } from '@umijs/max';
import ProLayout, { PageContainer } from '@poizon-design/pro-layout';
import { LeftCircle, RightCircle } from '@poizon-design/icons';
import { ScopeAuthStore } from '@finance/scope-auth';
import duTrack from '@du/track';
import { useGlobalContainer } from '@/globalStore';
import { useQuery } from '@/hooks';
import { config } from '@/defaultSettings';
import { HeaderRightContent } from './header-right-content';
import styles from './index.less';
import { PageTabs } from './tabs';
import { trackPage } from '@/config/pageTrackInfo';
import { dealWithVisit } from '@/utils/trackVisitPageTime';
const { projectName } = config;

const Main: FunctionComponent = () => {
  const { userInfo, rawMenuList } = useGlobalContainer();

  const query = useQuery();
  const noLaSize = '1';
  // 是否不需要布局
  const noLayout = query.noLayout === noLaSize;

  const {
    /** 路由菜单名 */
    title: tabTitle,
    /** 完成路径 */
    fullPath,
  } = proRoute.useCurrentRoute(rawMenuList);
  /** 天网路由转菜单 */
  const { layoutMenus } = proRoute.useMenus(rawMenuList);

  // 接口请求的实例
  const scopeRequest: ComponentProps<typeof ScopeAuthStore>['request'] = useCallback((opt) => {
    return duRequest.request({
      ...opt,
      url: opt.url,
    });
  }, []);

  const overwriteState = () => {
    try {
      const originPushState = window.history.pushState;
      window.history.pushState = (state, unused, path: string) => {
        trackPage(path);
        dealWithVisit({ toPath: path, fromPath: window.location.pathname });
        originPushState.apply(window.history, [state, unused, path]);
      };

      const originReplaceState = window.history.replaceState;
      window.history.replaceState = (state, unused, path) => {
        // this.handlePagePathChange(path)
        originReplaceState.apply(window.history, [state, unused, path]);
      };
    } catch (error) {
      console.warn('overwriteState err', error);
    }
  };

  useEffect(() => {
    console.log('process.env.BUILD_ENV:', process.env.BUILD_ENV);
    window.DUOTEL &&
      window.DUOTEL.setConfig({
        env: process.env.BUILD_ENV,
      });
  }, []);

  useEffect(() => {
    overwriteState();
  }, []);

  if (noLayout) {
    return <Outlet />;
  }

  return (
    <ScopeAuthStore request={scopeRequest}>
      <ProLayout
        title={projectName}
        className={styles.layoutWrapper}
        fixedHeader
        fixSiderbar
        splitMenus={false}
        collapsedButtonRender={(collapsed?: boolean) => (
          <span id="collapsed-button">{collapsed ? <RightCircle /> : <LeftCircle />}</span>
        )}
        logo="//h5static.dewucdn.com/node-common/JUU3JUJDJTk2JUU3JUJCJTg0JTIwOEAzeDE1Nzc3ODE5OTk2MDM=.png"
        waterMarkProps={{
          gapX: 160,
          gapY: 180,
          zIndex: 1000,
          fontColor: 'rgba(0,0,0,.05)',
          content: `${userInfo.username}@${userInfo.mobile?.substring(7)}`,
        }}
        {...layoutMenus}
        rightContentRender={() => <HeaderRightContent />}
      >
        <PageContainer
          header={{
            title: '',
            breadcrumb: {},
          }}
          loading={false}
        >
          <PageTabs activityKey={fullPath} tabTitle={tabTitle} node={<Outlet />} />
        </PageContainer>
      </ProLayout>
    </ScopeAuthStore>
  );
};

const Layout: React.FC<{ location: Location }> = () => {
  return <Main />;
};

export default Layout;
