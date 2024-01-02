import { Alert, Button, Space } from 'poizon-design';
import { FunctionComponent } from 'react';
import { ScopeAuth } from '@finance/scope-auth';

const App: FunctionComponent = () => {
  return (
    <div>
      <Space>
        <Button type="primary">正常显示的按钮</Button>
        <ScopeAuth auth="/api/v1/h5/bounty/backendSupport/queryResourcePage">
          <Button type="primary">需要列表权限的按钮</Button>
        </ScopeAuth>
        <ScopeAuth auth="/api/v1/h5/bounty/backendSupport/saveResource">
          <Button type="primary">需要新增权限的按钮</Button>
        </ScopeAuth>
      </Space>
      <Alert message="按钮（或其他元素）级别的权限控制，满足权限才显示该按钮" showIcon />
    </div>
  );
};

export default App;
