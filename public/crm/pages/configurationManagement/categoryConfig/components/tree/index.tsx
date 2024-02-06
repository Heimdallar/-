import { Tree, Popconfirm } from 'poizon-design';
import { CloseOutlined } from '@ant-design/icons';
import { rootId } from '../../constants';
import type { SelectedNodeDataProps } from '../../index';
import styles from './index.module.less';

interface Iprops {
  treeData: SelectedNodeDataProps[];
  setSelectedNodeData: (data: SelectedNodeDataProps) => void;
  deleteFn: (orgId: number) => void;
}
const TreeComponent = (props: Iprops) => {
  const { treeData = [], setSelectedNodeData, deleteFn } = props;

  if (!treeData?.length || !Array.isArray(treeData)) return null;
  return (
    <Tree
      treeData={treeData}
      defaultExpandAll
      titleRender={(item) => {
        const { orgId, title } = item;
        return (
          <div className={styles.title}>
            <span>{title}</span>
            {orgId !== rootId && (
              <Popconfirm title={`确认删除${title}么？`} onConfirm={() => deleteFn?.(orgId)}>
                <CloseOutlined style={{ color: 'red', fontSize: 12, marginLeft: 8 }} />
              </Popconfirm>
            )}
          </div>
        );
      }}
      autoExpandParent
      onSelect={(key, e) => {
        setSelectedNodeData(e.node);
      }}
    />
  );
};

export default TreeComponent;
