import { useMemo, useRef, useState } from 'react';
import { Select, Radio } from 'poizon-design';
import { useRequest, useUpdateEffect } from 'ahooks';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { history } from '@umijs/max';
import { PageModeEnum, tagList, TypeEnum, typeList, allCategory } from '@/pages/homePage/constants';
import {
  fetchByAllCategoryQueryWaitingRankService,
  fetchByOperatorQueryWaitingRankService,
  fetchByAllCategoryGetOverviewService,
  fetchByOperatorGetOverviewService,
} from '@/services/homePage';
import { deleteEmptyParam } from '@/utils/common';
import useColumns from './columns';
import GradientRingChart from './components/chart';
import Rank from './components/rank';
import styles from './index.less';

interface Props {
  pageMode: string;
  categoryId: string | null;
  setCategoryId: (categoryId: string | null) => void;
  categoryOptionList: [];
  queryMode: string;
}

const HomePage: React.FC<Props> = (props) => {
  const { pageMode, categoryId, setCategoryId, categoryOptionList, queryMode } = props;

  // 控制按类目和按人员的切换
  const [queryType, setQueryType] = useState(TypeEnum.按类目);
  const actionRef = useRef<ActionType>();
  const { columns } = useColumns({ pageMode, queryType });

  // 待办总览接口
  const getOverviewDataApi = useMemo(() => {
    if (pageMode === PageModeEnum.单类目模式 || queryType === TypeEnum.按人员) {
      return fetchByOperatorGetOverviewService;
    }
    return fetchByAllCategoryGetOverviewService;
  }, [pageMode, queryType]);

  const { data: overviewDataRes } = useRequest(
    () => getOverviewDataApi({ categoryId: categoryId === allCategory ? '' : categoryId }),
    {
      ready: pageMode !== PageModeEnum.欢迎模式 && !!categoryId,
      refreshDeps: [categoryId, queryMode, queryType],
    },
  );

  const overviewData = overviewDataRes?.data || {};

  useUpdateEffect(() => {
    actionRef.current.reloadAndRest();
  }, [pageMode, categoryId, queryType]);

  // 表格接口
  const tableListApi = useMemo(() => {
    if (pageMode === PageModeEnum.单类目模式 || queryType === TypeEnum.按人员) {
      return fetchByOperatorQueryWaitingRankService;
    }
    return fetchByAllCategoryQueryWaitingRankService;
  }, [pageMode, queryType]);

  const hanlerSort = (sort) => {
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
          <div className={styles.title}>线索待办概览</div>
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
          {overviewData?.bizDate && (
            <div className={styles.updateTime}>更新于{overviewData?.bizDate}</div>
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
          <div className={styles.title}>线索待办排行</div>
          <ProTable
            columns={columns}
            actionRef={actionRef}
            options={false}
            request={async (params = {}, sort) => {
              const { current, pageSize } = params;
              const orderingRule = hanlerSort(sort);
              const reqParmas = {
                categoryId: categoryId === allCategory ? null : categoryId,
                page: current,
                pageSize,
                orderingRule,
              };
              deleteEmptyParam(reqParmas);
              const { data = {} } = await tableListApi(reqParmas);
              return {
                data: data.datas,
                total: data.total,
              };
            }}
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
