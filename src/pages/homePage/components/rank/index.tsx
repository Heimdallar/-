import { useState, useMemo, useEffect } from 'react';
import { Pagination, Radio, Tooltip } from 'poizon-design';
import { useRequest } from 'ahooks';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  RankEnum,
  rankTypeList,
} from '../../interface';
import'../../service';
import { deleteEmptyParam } from '@/utils/common';
import styles from './index.less';
import { fetchAllAchievedRate, fetchAllAmountRate, fetchSingleAmountRate } from '../../service';

interface Props {
  page: string;
  categoryId: string | null;
  query: string;
}

const Rank = (props: Props) => {
  const { page, categoryId, query } = props;
  const [pageNo, setpageNo] = useState(1);
  const [rankType, setRankType] = useState(RankEnum.按完成度);

  const rankApi = useMemo(() => {
    if (
      'single' === page ||
      ('multi' === page && query === 'people')
    ) {
      return fetchSingleAmountRate;
    }
    if ('multi' === page && rankType === RankEnum.按完成度) {
      return fetchAllAchievedRate;
    }
    return fetchAllAmountRate;
  }, [page, query, rankType]);

  // todo 切换的时候进行请求
  const { data, run } = useRequest(
    ({ p } = { p: 1 }) => {
      const params = {
        categoryId: categoryId === 'all' ? null : categoryId,
        pageSize: 10,
        page: p,
      };
      deleteEmptyParam(params);
      return rankApi(params);
    },
    {
      ready: !!categoryId,
    },
  );

  useEffect(() => {
    setpageNo(1);
    run({ p: 1 });
  }, [categoryId, rankType, query]);

  
  const { total = 0, data: list = [] } = data?.data || {};

  console.log('rank',list)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {'single' === page || query === 'people' ? (
            <Tooltip title="统计商家入驻时填写的邀请人为对应运营，且商家入驻的品牌类目首次出价时间在本季">
              季度商家入驻且出价完成排行
              <QuestionCircleOutlined style={{ fontSize: 18, color: '#7f7f8e', marginLeft: 8 }} rev={undefined} />
            </Tooltip>
          ) : (
            '季度出价目标完成排行'
          )}
        </div>
        {page !== 'single' && query === 'category' && (
          <Radio.Group
            value={rankType}
            defaultValue={RankEnum.按完成度}
            buttonStyle="solid"
            onChange={(e) => {
              setpageNo(1);
              setRankType(e.target.value);
            }}
          >
            {rankTypeList.map((item) => {
              return (
                <Radio.Button value={item.value} key={item.value}>
                  {item.label}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        )}
      </div>

      <div className={styles.list}>
        {list.map((item:any) => {
          const { randIndex, percent, label, value } = item;
          return (
            <div className={styles.item} key={randIndex}>
              <div className={styles.lable}>{label}</div>
              <div className={styles.processBar}>
                <div className={styles.process} style={{ width: `${percent}%` }}></div>
                <div className={styles.achievedAmount}>{value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <Pagination
          pageSize={10}
          total={total}
          current={pageNo}
          onChange={(page) => {
            setpageNo(page);
            run({ p: page });
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Rank;
