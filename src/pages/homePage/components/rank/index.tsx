import { useState, useMemo, useEffect } from 'react';
import { Pagination, Radio, Tooltip } from 'poizon-design';
import { useRequest } from 'ahooks';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  RankTypeEnum,
  rankTypeList,
  PageModeEnum,
  allCategory,
  TypeEnum,
} from '@/pages/homePage/interface';

import { deleteEmptyParam } from '@/utils/common';
import styles from './index.less';

interface Props {
  pageMode: string;
  categoryId: string | null;
  queryType: string;
}

const Rank = (props: Props) => {
  const { pageMode, categoryId, queryType } = props;
  const [pageNo, setPageNo] = useState(1);
  const [rankType, setRankType] = useState(RankTypeEnum.按完成度);




  useEffect(() => {
    setPageNo(1);
  }, [categoryId, rankType, queryType]);

  const total = 10
  const list = [
    {
        randIndex:1, 
        percent:10, 
        label:3, 
        value:11451 
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          {PageModeEnum.单类目模式 === pageMode || queryType === TypeEnum.按人员 ? (
            <Tooltip title="统计商家入驻时填写的邀请人为对应运营，且商家入驻的品牌类目首次出价时间在本季">
              季度商家入驻且出价完成排行
              <QuestionCircleOutlined style={{ fontSize: 18, color: '#7f7f8e', marginLeft: 8 }} rev={undefined} />
            </Tooltip>
          ) : (
            '季度出价目标完成排行'
          )}
        </div>
        {pageMode !== PageModeEnum.单类目模式 && queryType === TypeEnum.按类目 && (
          <Radio.Group
            value={rankType}
            defaultValue={RankTypeEnum.按完成度}
            buttonStyle="solid"
            onChange={(e) => {
              setPageNo(1);
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
        {list.map((item) => {
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
            setPageNo(page);
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Rank;
