import { useState } from 'react';
import { useRequest } from 'ahooks';
import { Spin } from 'poizon-design';
import type { Data } from '@/entities/configurationManagement/interface/queryOrgSelectOrgTree';
import queryOrgSelectOrgTree from '@/services/configurationManagement/queryOrgSelectOrgTree';
import delOrg from '@/services/configurationManagement/delOrg';
import Tree from './components/tree';
import Form from './components/formTab';
import styles from './index.module.less';

export interface SelectedNodeDataProps extends Data {
  key: string;
  title: string;
  children?: SelectedNodeDataProps;
}

export default () => {
  const [rootInfo, setRootInfo] = useState<SelectedNodeDataProps>();
  const [selectedNodeData, setSelectedNodeData] = useState<SelectedNodeDataProps>();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data,
    run: queryTree,
    loading: treeLoading,
  } = useRequest(queryOrgSelectOrgTree, {
    onSuccess: (res) => {
      setRootInfo(res?.data[0]);
    },
  });
  const treeData = data?.data || [];

  const deleteFn = async (orgId: number) => {
    const { code } = await delOrg({ orgId });
    if (code === 200) {
      queryTree();
      setSelectedNodeData(undefined);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Spin spinning={treeLoading || loading}>
          <Tree treeData={treeData} setSelectedNodeData={setSelectedNodeData} deleteFn={deleteFn} />
        </Spin>
      </div>
      <div className={styles.right}>
        <Form
          selectedNodeData={selectedNodeData || rootInfo}
          queryTree={queryTree}
          treeLoading={treeLoading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};
