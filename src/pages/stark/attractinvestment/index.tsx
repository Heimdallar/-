import React from 'react';
import { Timeline } from 'poizon-design';
import moment from 'moment';
import { useRequest } from 'ahooks';
import fetchIeaObtainMeetingsService from '@/services/attractinvestment/queryObtainMeetings';
import CardItem from './components/cardItem';
import { data } from './contants';
import styles from './index.module.less';

const Index = () => {
  const { data: dataList } = useRequest(fetchIeaObtainMeetingsService);
  return (
    <div className={styles.attractinvestment}>
      <div className={styles.attractinvestmentBox}>
        <Timeline>
          {dataList?.data.map((item, index) => {
            return (
              <div
                className={
                  moment().format('YYYYMMDD') >= moment(item.dayStr).format('YYYYMMDD') 
                    ? ''
                    : styles.box
                }
              >
                <Timeline.Item
                  color={
                    moment().format('YYYYMMDD') > moment(item.dayStr).format('YYYYMMDD')
                      ? 'gray'
                      : '#01C2C3'
                  }
                >
                  <div className={styles.flex}>
                    <div className={styles.time}>{moment(item.dayStr).format('MM.DD')}</div>
                    <CardItem index={index} meetings={item.meetings} />
                  </div>
                </Timeline.Item>
              </div>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};

export default Index;
