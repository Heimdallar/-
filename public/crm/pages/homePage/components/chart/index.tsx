import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import { useRequest } from 'ahooks';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'poizon-design';
import {
  fetchByAllCategoryGetRateService,
  fetchByOperatorGetRateService,
} from '@/services/homePage';
import { PageModeEnum, TypeEnum, allCategory } from '@/pages/homePage/constants';
import { deleteEmptyParam } from '@/utils/common';
import styles from './index.less';

interface Props {
  pageMode: string;
  categoryId: string | null;
  queryType: string;
}

const GradientRingChart = (props: Props) => {
  const { pageMode, categoryId, queryType } = props;

  // 图表接口
  const chartApi = useMemo(() => {
    if (pageMode === PageModeEnum.单类目模式 || queryType === TypeEnum.按人员) {
      return fetchByOperatorGetRateService;
    }
    return fetchByAllCategoryGetRateService;
  }, [pageMode, queryType]);

  const { data: chartDataRes } = useRequest(
    () => {
      const params = { categoryId: categoryId === allCategory ? '' : categoryId };
      deleteEmptyParam(params);
      return chartApi(params);
    },
    {
      refreshDeps: [pageMode, queryType, categoryId],
    },
  );

  const { achievedTotalAmount, achievedTotalRate, bizDate, targetTotalAmount } =
    chartDataRes?.data || {};

  const ref = useRef(null);

  const gaugeData = [
    {
      value: achievedTotalRate,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#5FF4F4' },
            { offset: 1, color: '#0CD5D6' },
          ],
        },
      },
      borderRadius: 22,
    },
  ];

  const option = {
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: '100%', // 仪表盘大小
        min: 0,
        max: 100,
        pointer: {
          show: false,
        },
        detail: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          // 填充色圆角需要在value为0的时候去掉否则还是会有展示
          roundCap: Boolean(parseFloat(achievedTotalRate)),
          clip: true,
          itemStyle: {
            backgroundColor: '#F5F5F9',
          },
        },
        axisLine: {
          lineStyle: {
            width: 16,
            color: [[1, '#F5F5F9']],
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
      },
    ],
  };
  useEffect(() => {
    const myChart = echarts.init(ref.current);
    myChart.setOption(option);
  }, [chartDataRes]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        季度出价目标完成情况
        <Tooltip title="统计一级类目下，商家首次出价时间在本季，且在同一类目下在当季出价过ABC品牌的国内企业商家">
          <QuestionCircleOutlined style={{ fontSize: 18, color: '#7f7f8e', marginLeft: 8 }} />
        </Tooltip>
        {bizDate && <span className={styles.updateTime}>更新于{bizDate}</span>}
      </div>
      <div className={styles.row}>
        <div className={styles.chartContainer}>
          <div className={styles.chart} ref={ref}></div>
          <div className={styles.percent}>
            <span>{achievedTotalRate}%</span>
            <div className={styles.percentText}>达成</div>
          </div>
        </div>
        <div className={styles.targetContainer}>
          <div className={styles.item}>
            <div className={styles.title}>已完成</div>
            <div className={styles.num}>{achievedTotalAmount}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.title}>目标值</div>
            <div className={styles.num}>{targetTotalAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientRingChart;
