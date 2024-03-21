import { useMemo, useRef, useState } from 'react';
import { Select, Radio } from 'poizon-design';
// import { useRequest, useUpdateEffect } from 'ahooks';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { history } from '@umijs/max';
import { PageModeEnum, tagList, TypeEnum, typeList, allCategory } from '@/pages/homePage/interface';
import { deleteEmptyParam } from '@/utils/common';
import { fixedColums,signleCategoryColumns } from './useColumns';
import GradientRingChart from './components/chart';
import Rank from './components/rank';
import styles from './index.less';
import { SortOrder } from 'poizon-design/lib/table/interface';

// interface Props {
//   pageMode: string;
//   categoryId: string | null;
//   setCategoryId: (categoryId: string | null) => void;
//   categoryOptionList: [];
//   queryMode: string;
// }

const HomePage: React.FC= (props) => {
//   const { pageMode, categoryId, setCategoryId, categoryOptionList, queryMode } = props;
   const pageMode='show'
   const queryMode=PageModeEnum.单类目模式
   const [categoryId,setCategoryId]=useState('ALL')
   const categoryOptionList: any[] | undefined=[]
 

  // 控制按类目和按人员的切换
  const [queryType, setQueryType] = useState(TypeEnum.按类目);
  const actionRef = useRef<ActionType>();
  
//   const { columns } = useColumns({ pageMode, queryType });

  const overviewData =  '2048/1/1';

//   useUpdateEffect(() => {
//     actionRef.current.reloadAndRest();
//   }, [pageMode, categoryId, queryType]);


  const hanlerSort = (sort: Record<string, SortOrder>) => {
    if (Object.keys(sort).length === 0) {
      return {};
    }
    return {
      fieldName: Object.keys(sort)[0],
      asc: sort[Object.keys(sort)[0]] === 'ascend',
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.title}>商品待办概览</div>
          <Select
            disabled={queryType !== TypeEnum.按类目}
            value={categoryId}
            options={categoryOptionList}
            style={{ width: 200, marginRight: 24 }}
            onChange={setCategoryId}
          ></Select>
          {/* 选择非全部类目的时候不展示切换tab */}
          {queryMode !== PageModeEnum.单类目模式 && categoryId === allCategory && (
            <Radio.Group
              value={queryType}
              defaultValue={TypeEnum.按类目}
              buttonStyle="solid"
              onChange={(e) => {
                setQueryType(e.target.value);
              }}
            >
              {typeList.map((item) => {
                return (
                  <Radio.Button value={item.value} key={item.value}>
                    {item.label}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          )}
          {overviewData && (
            <div className={styles.updateTime}>更新于{overviewData}</div>
          )}
        </div>
        {/* 标签 */}
        <div className={styles.numTab}>
          {tagList.map((item) => {
            return (
              <div
                className={styles.tag}
                key={item.key}
                onClick={() => {
                  history.push(item.url);
                }}
              >
                <div className={styles.tagTitle}>{item.label}</div>
                <div className={styles.tagNum}>{overviewData[item.key]}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.table}>
          <div className={styles.title}>商品待办排行</div>
          <ProTable
            columns={fixedColums}
            actionRef={actionRef}
            options={false}
            scroll={{ x: 'max-content' }}
            key={queryType + categoryId}
            rowKey="rankIndex"
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              hideOnSinglePage: true,
              showTotal: undefined,
              size: 'default',
            }}
            search={false}
            toolBarRender={false}
          />
        </div>
      </div>
      <div className={styles.right}>
        <GradientRingChart pageMode={pageMode} categoryId={categoryId} queryType={queryType} />
        <Rank pageMode={pageMode} categoryId={categoryId} queryType={queryType} />
      </div> 
    </div>
  );
};

export default HomePage;
