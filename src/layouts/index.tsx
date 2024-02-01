import { ComponentProps, FunctionComponent, useCallback } from 'react';
import { request, Outlet, proRoute } from '@umijs/max';
import { PageContainer } from '@poizon-design/pro-layout';
import { ScopeAuthStore } from '@finance/scope-auth';
import { useGlobalContainer } from '@/globalStore';
import { HeaderRightContent } from './HeaderRightContent';
import { mock } from './route';
import { Layout as DuLayout } from './CustomLayout';
import { Menu } from './Menu';
import { MenuType } from './CustomLayout/constant';
import { PageTabs } from './Tabs';

const Main: FunctionComponent = () => {
  const { rawMenuList /* , userInfo */ } = useGlobalContainer();

  const {
    /** 路由菜单名 */
    title: tabTitle,
    pathname,
  } = proRoute.useCurrentRoute(rawMenuList);

  // 接口请求的实例
  const scopeRequest: ComponentProps<typeof ScopeAuthStore>['request'] = useCallback((opt) => {
    return request(`/api/v1/h5${opt.url}`, { ...opt });
  }, []);

  return (
    <ScopeAuthStore request={scopeRequest}>
      <DuLayout
        title="青训营训练项目"
        rightContentRender={<HeaderRightContent />}
        menuRender={<Menu items={mock} />}
        menuType={MenuType.PRO}
        logo="https://cdn.dewu.com/node-common/3947b668818be48e13c47b6468f75293.svg"
      >
        <PageContainer
          header={{
            title: false,
            breadcrumb: {},
          }}
        >
          {/* <Outlet /> */}
          {/* 使用 Tab 模式 */}
          <PageTabs activityKey={pathname} tabTitle={tabTitle} />
        </PageContainer>
      </DuLayout>
    </ScopeAuthStore>
  );
};

const Layout: React.FC<{ location: Location }> = () => {
  /* eslint no-underscore-dangle: ["error", { "allow": ["__POWERED_BY_QIANKUN__"] }] */
  return window?.__POWERED_BY_QIANKUN__ ? <Outlet /> : <Main />;
};

export default Layout;
