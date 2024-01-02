import { FC } from 'react';
import { IEntityOrderList } from '@/pages/module-tables/entity';
import styles from './index.less';

type DataEntity = IEntityOrderList['contents'][0];

// 商品单元格
export const Product: FC<{ record: DataEntity }> = ({ record }) => {
  return (
    <div className={styles.goodsInfo}>
      <div className={styles.proImg} data-record-id={record.id}>
        <span>
          <img src="https://cdn.poizon.com/source-img/origin-img/20201225/6cfae33f73914316b442af267e6544d8.jpg" />
        </span>
      </div>
      <div className="flex-1">
        <span className="block">
          货号：<strong>159771C</strong>
        </span>
        <span className={styles.textEllipsis}>
          Converse All Star 70 高帮草绿 1970s 老版 男女同款in_testin_test1
        </span>
      </div>
    </div>
  );
};
