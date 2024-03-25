import { useEffect,  useRef, useState } from 'react';
import { Select, Radio } from 'poizon-design';
import {  useUpdateEffect } from 'ahooks';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import {  TableMultiItem, tagList, typeList} from '@/pages/homePage/interface';
import './service';

import { deleteEmptyParam } from '@/utils/common';
import {multicolumns,singlecolumns} from './useColumns';
import GradientRingChart from './components/chart';
import Rank from './components/rank';
import styles from './index.less';
import { fetchAllOverview, fetchSingleOverview, fetchTableAll, fetchTableSingle } from './service';
import { fetchTitle } from '../leadManagement/style/service';


const HomePage: React.FC = () => {
 
  const [overviewDataRes, setOverviewDataRes] = useState({nums:[12,23,45,55,66],date:'2024/2/3'});
  const [query, setquery] = useState('category');
  const [categoryId,setCategoryId]=useState('all')
  const [categoryOptionList,setOptions]=useState([])
  const [page,setPage]=useState('multi')
  const [queryMode,setqueryMode]=useState('people')

  const actionRef = useRef<ActionType>();
  
  let columns= (page === 'single' || query === 'people')? singlecolumns:multicolumns
  console.log(page,query,'columns',columns)

 

  // 总览数据
  const getOverviewData = (page?: string,query?: string ) => {
    if (page === 'single' || query === 'people') {
         const data= fetchSingleOverview();
          return data
    }else{
         const data= fetchAllOverview();
    
         return data
    }
  
  };
   // 表格数据
   const tableList = (params={}) => {
    if (page === 'single' || query === 'people') {
      return fetchTableSingle(params);
    }
    return fetchTableAll(params);
  }


  useEffect(  ()=>{
    const fetchOverviewData = async () => {
      const data = await getOverviewData();
      setOverviewDataRes(data);
    };
    const fetchOrderList=async()=>{
      const data=await fetchTitle()
      const options=data.map((item:any)=>{
        return {
         label: item.name,
         value:item.name
        }
      })
      setOptions(options)
      }
    fetchOrderList()
    fetchOverviewData();

  }, []); // 空数组表示只在组件挂载时请求一次数据


  useUpdateEffect(() => {
    actionRef.current.reloadAndRest();
  }, []);

 

  const hanlerSort = (sort:any) => {
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
            disabled={query !== 'category'}
            value={categoryId}
            options={categoryOptionList}
            style={{ width: '200px',marginRight:'10px' }}
            onChange={setCategoryId}
          ></Select>
          {/* 选择非全部类目的时候不展示切换tab */}
          {queryMode !== 'single' && categoryId === 'all' && (
            <Radio.Group
              value={query}
              defaultValue={'category'}
              buttonStyle="solid"
              onChange={(e) => {
                setquery(e.target.value);
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
          {overviewDataRes && (
            <div className={styles.updateTime}>更新于{overviewDataRes.date}</div>
          )}
        </div>
        {/* 标签 */}
        <div className={styles.numTab}>
          {tagList.map((item,index) => {
            return (
              <div
                className={styles.tag}
                key={item.key}
               
              >
                <div className={styles.tagTitle}>{item.label}</div>
                <div className={styles.tagNum}>{overviewDataRes.nums[index]}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.table}>
          <div className={styles.title}>商品待办排行</div>
          <ProTable
            columns={columns}
            actionRef={actionRef}
            options={false}
            request={async (params = {}, sort) => {
              const { current, pageSize } = params;
              const orderingRule = hanlerSort(sort);
              const reqParmas = {
                categoryId: categoryId === 'all' ? null : categoryId,
                page: current,
                pageSize,
                orderingRule,
              };
              console.log('categoryID',categoryId)
              deleteEmptyParam(reqParmas);
           
              const {datas={}} =await tableList(reqParmas)
           
              return Promise.resolve({
                data:datas,
                success:true
              })

            }}
            scroll={{ x: 'max-content' }}
            key={query + categoryId}
            rowKey="rankIndex"
            pagination={{
              pageSize: 10,
              size: 'default',
            }}
            search={false}
            toolBarRender={false}
          />
        </div>
      </div>
      <div className={styles.right}>
        <GradientRingChart page={page} categoryId={categoryId} query={query} />
        <Rank page={page} categoryId={categoryId} query={query} />
      </div>
    </div>
  );
};

export default HomePage;
