import { FC } from 'react';
import { Tabs } from 'poizon-design';
import { PageStore } from '@/pages/module-tables/store';
import {
  SimpleSearchTable,
  ComplexSearchTable,
  EditableTable,
} from '@/pages/module-tables/components';

/**
 * 得物查询列表
 * @figma https://www.figma.com/file/dSgEssQTqJ0ZylRBNnmxrK/POIZON-Design-Pro?node-id=10%3A2
 * @author taoliujun sandy
 * @update 2022.09
 */
const PageSearchTable: FC = () => {
  return (
    <PageStore>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="基础查询列表" key="st-1">
          <SimpleSearchTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="高级查询列表" key="st-2">
          <ComplexSearchTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="基础编辑型列表(蚂蚁样例)" key="st-3">
          <EditableTable />
        </Tabs.TabPane>
      </Tabs>
    </PageStore>
  );
};

export default PageSearchTable;
