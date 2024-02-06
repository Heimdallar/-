import React, { useEffect, useMemo, useState } from 'react';
import { Tabs, Spin } from 'poizon-design';
import { useRequest } from 'ahooks';
import fetchCategoryListService from '@/services/configurationManagement/queryCategoryList';
import fetchOrgSelectOrgDataRoleService from '@/services/configurationManagement/querySelectOrgDataRole';
import type { SelectedNodeDataProps } from '../../index';
import { OrgTypeEnums, TabKeyEnums, rootId } from '../../constants';
import DepDetail from './components/depDetail';
import DepAdd from './components/depAdd';
import AddUser from './components/addUser';

interface FormProps {
  selectedNodeData: SelectedNodeDataProps;
  queryTree?: () => void;
  treeLoading?: boolean;
  setLoading?: (loading: boolean) => void;
}

const Form = (props: FormProps) => {
  const { selectedNodeData = {}, queryTree, treeLoading, setLoading } = props;
  const [activeKey, setActiveKey] = useState<string>(TabKeyEnums.部门详情);
  const [addDepCategoryList, setAddDepCategoryList] = useState([]);
  const { orgId, orgName, spId, orgType, sort, parentId } = selectedNodeData;

  const { data, loading: orgSelectOrgDataRoleLoading } = useRequest(
    () =>
      fetchOrgSelectOrgDataRoleService({
        orgId: parentId,
      }),
    {
      ready: orgId || orgId === rootId,
      refreshDeps: [orgId],
    },
  );

  const depData = data?.data || {};

  // 获取全部一级类目
  const { data: categoryListRes, loading: categoryListLoading } = useRequest(() =>
    fetchCategoryListService({
      pid: 0,
      queryType: 0,
      treeFlag: true,
      spuCountFlag: false,
    }),
  );

  const categoryList = useMemo(() => {
    const temp = categoryListRes?.data.filter(
      (item) => (depData.categoryIdList || []).indexOf(item.value) > -1,
    );
    return temp;
  }, [categoryListRes, depData, orgId]);

  useEffect(() => {
    setActiveKey(TabKeyEnums.部门详情);
  }, [selectedNodeData]);

  useEffect(() => {
    setLoading(treeLoading || orgSelectOrgDataRoleLoading || categoryListLoading);
  }, [treeLoading, orgSelectOrgDataRoleLoading, categoryListLoading]);
  return (
    <Spin spinning={treeLoading || orgSelectOrgDataRoleLoading || categoryListLoading}>
      <Tabs activeKey={activeKey} onChange={(e) => setActiveKey(e)}>
        <Tabs.TabPane tab="部门详情" key={TabKeyEnums.部门详情}>
          <DepDetail
            selectedNodeData={selectedNodeData}
            categoryList={categoryList}
            queryTree={queryTree}
            setAddDepCategoryList={setAddDepCategoryList}
          />
        </Tabs.TabPane>
        {orgType === OrgTypeEnums.其他部门 ? (
          <Tabs.TabPane tab="新增子部门" key={TabKeyEnums.新增子部门}>
            {activeKey === TabKeyEnums.新增子部门 && (
              <DepAdd
                selectedNodeData={selectedNodeData}
                categoryList={addDepCategoryList}
                queryTree={queryTree}
              />
            )}
          </Tabs.TabPane>
        ) : (
          <Tabs.TabPane tab="关联用户" key={TabKeyEnums.关联用户}>
            <AddUser selectedNodeData={selectedNodeData} />
          </Tabs.TabPane>
        )}
      </Tabs>
    </Spin>
  );
};

export default Form;
