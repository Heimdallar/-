import { LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { message, Tooltip } from 'poizon-design';
import React, { useMemo } from 'react';
import { getFullNum } from '@/utils/common';
import { APPROVAL_STATUS } from '../../applyCommon/config';
import { IDetail } from '../../applyCommon/interface';
import { BrandHotInfo } from '../../applyManagement/interface';
import { approvalBatchReview } from '../api';
import { resultOptions } from '../config';
import { InternetSaleInfo, StringObj } from '../interface';
import './index.less';

export function getStatusTag(val: number) {
  const colors: StringObj = {
    10: 'blue',
    20: 'orange',
    30: 'red',
    40: 'green',
  };
  const statusInfo = resultOptions.find((item) => item.value === val);
  if (statusInfo) {
    return {
      label: statusInfo.label,
      color: colors[val],
    };
  }
  return {
    label: val,
    color: '',
  };
}

const flatTree = (tree: any) => {
  return tree.reduce((s: any, c: any) => {
    s[c.menuCode] = c;
    if (c.children && c.children.length) {
      s = {
        ...s,
        ...flatTree(c.children),
      };
    }
    return s;
  }, {});
};

const saleInfoColumns = () => {
  const myColumns = useMemo(() => {
    return [
      {
        title: '店铺渠道',
        dataIndex: 'storeChannel',
        key: 'storeChannel',
        width: 120,
        ellipsis: true,
        render: (_: string, record: InternetSaleInfo) => {
          if (record.storeUrl) {
            return (
              <a
                style={{ color: '#01C2C3' }}
                href={record.storeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <LinkOutlined />
                <span style={{ marginLeft: '5px' }}>{record.storeChannel}</span>
              </a>
            );
          }
          return <span>{record.storeChannel}</span>;
        },
      },
      {
        title: '店铺名称',
        dataIndex: 'storeName',
        key: 'storeName',
        width: 160,
        render: (text: string) => {
          return !text ? (
            <div>-</div>
          ) : (
            <Tooltip title={text} placement="topLeft">
              <div className="textNoWrap">{text}</div>
            </Tooltip>
          );
        },
      },
      {
        title: (
          <>
            近30天销售量
            <Tooltip title="当前店铺近30天的成交订单数">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'recentThirtySales',
        key: 'recentThirtySales',
        width: 130,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: (
          <>
            近30天销售额
            <Tooltip title="当前店铺近30天的销售额">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'recentThirtyTurnover',
        key: 'recentThirtyTurnover',
        width: 130,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: (
          <>
            店铺商品价格带（元）
            <Tooltip title="店铺商品最低至最高的优惠到手价">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'priceRange',
        key: 'priceRange',
        width: 200,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: (
          <>
            商品成交均价（元）
            <Tooltip title="店铺商品平均的优惠到手价">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'averagePrice',
        key: 'averagePrice',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: (
          <>
            Top 1 商品
            <Tooltip title="当前店铺近30天销售量最高的SPU，需展示TOP1商品名称">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'topOneProduct',
        key: 'topOneProduct',
        width: 110,
        customRender: 'text',
        render: (text: string) => {
          return !text ? (
            <div>-</div>
          ) : (
            <Tooltip title={text} placement="topLeft">
              <div className="textNoWrap">{text}</div>
            </Tooltip>
          );
        },
      },
      {
        title: (
          <>
            Top 1 商品单价（元）
            <Tooltip title="店铺销售量最高的SPU的优惠到手价">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'topOnePrice',
        key: 'topOnePrice',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: (
          <>
            Top 1 商品销售量
            <Tooltip title="店铺销售量最高的SPU的近30天成交订单数">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'topOneSales',
        key: 'topOneSales',
        width: 150,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: (
          <>
            Top 1商品销售额（元）
            <Tooltip title="店铺销售量最高的SPU的近30天成交GMV">
              <QuestionCircleOutlined className="mainColor" />
            </Tooltip>
          </>
        ),
        dataIndex: 'topOneTurnover',
        key: 'topOneTurnover',
        width: 190,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '年销售额(亿)',
        dataIndex: 'annualSales',
        key: 'annualSales',
        width: 100,
        render: (_: number, record: InternetSaleInfo) => {
          return !record.annualSales ? '-' : getFullNum(record.annualSales / 10000000000);
        },
      },
      {
        title: '粉丝数(万)',
        dataIndex: 'fansNum',
        key: 'fansNum',
        width: 100,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
    ];
  }, []);
  return myColumns;
};

const brandHotColumns = (detailInfo: IDetail) => {
  const columns = useMemo(() => {
    return [
      {
        title: '品牌',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 160,
        ellipsis: true,
        render: (text: string, record: BrandHotInfo) => {
          return !text ? (
            <div>-</div>
          ) : (
            <Tooltip
              title={
                (record.topOne
                  ? 'Top 1 品牌: '
                  : detailInfo.brandName === text
                  ? '当前品牌: '
                  : '') + text
              }
              placement="topLeft"
            >
              <div className="textNoWrap">
                {record.topOne ? 'Top 1 品牌: ' : detailInfo.brandName === text ? '当前品牌: ' : ''}{' '}
                {text}
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: '小红书帖子数（近3天）',
        dataIndex: 'redbookPostNumber',
        key: 'redbookPostNumber',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '小红书点赞数（近3天）',
        dataIndex: 'redbookLikeNumber',
        key: 'redbookLikeNumber',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '抖音发布视频数（近7天）',
        dataIndex: 'tiktokPostNumber',
        key: 'tiktokPostNumber',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '抖音总点赞数（近7天）',
        dataIndex: 'tiktokLikeNumber',
        key: 'tiktokLikeNumber',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微博总文章数（近30天）',
        dataIndex: 'weiboKeywordContents30',
        key: 'weiboKeywordContents30',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微博总文章转发数（近30天）',
        dataIndex: 'weiboKeywordReposts30',
        key: 'weiboKeywordReposts30',
        width: 210,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微博总文章评论数（近30天）',
        dataIndex: 'weiboKeywordComments30',
        key: 'weiboKeywordComments30',
        width: 210,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微博总文章点赞数（近30天）',
        dataIndex: 'weiboKeywordLikes30',
        key: 'weiboKeywordLikes30',
        width: 210,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微信指数-点赞数（近30天）',
        dataIndex: 'weixinIndexLikes30',
        key: 'weixinIndexLikes30',
        width: 210,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微信指数-总篇数（近30天）',
        dataIndex: 'weixinIndexContents30',
        key: 'weixinIndexContents30',
        width: 210,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: '微信指数-阅读数（近30天）',
        dataIndex: 'weixinIndexReads30',
        key: 'weixinIndexReads30',
        width: 210,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: 'b站发布视频数（近90天）',
        dataIndex: 'bilibiliKeywordContents90',
        key: 'bilibiliKeywordContents90',
        width: 200,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: 'b站总点赞数（近90天）',
        dataIndex: 'bilibiliKeywordLikes90',
        key: 'bilibiliKeywordLikes90',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: 'b站总转发数（近90天）',
        dataIndex: 'bilibiliKeywordReposts90',
        key: 'bilibiliKeywordReposts90',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
      {
        title: 'b站总评论数（近90天）',
        dataIndex: 'bilibiliKeywordComments90',
        key: 'bilibiliKeywordComments90',
        width: 180,
        render: (text: number) => {
          return !text ? <div>-</div> : <div className="fr">{text}</div>;
        },
      },
    ];
  }, [detailInfo]);
  return columns;
};

export const handleApprovalBatchReview = async (
  idList: string,
  targetState: number,
  e: React.MouseEvent<HTMLElement, MouseEvent>,
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<number[]>>,
  refreshList: () => void,
) => {
  try {
    e?.preventDefault();
    e?.stopPropagation();
    const result = await approvalBatchReview({
      idList,
      targetState,
    });
    if (result) {
      message.success('评审成功');
      setSelectedRowKeys([]);
      refreshList();
    } else {
      message.error('评审失败');
    }
  } catch (err) {
    console.error('评审失败', err);
  }
};

export { saleInfoColumns, brandHotColumns };
