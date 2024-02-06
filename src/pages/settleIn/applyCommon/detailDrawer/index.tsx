import { isEmpty } from 'lodash';
import {
  Button,
  Col,
  Drawer,
  Image,
  message,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  Tooltip,
} from 'poizon-design';
import React, { useState } from 'react';
import moment from 'moment';
import { createSearchParams, useNavigate } from '@umijs/max';
import store from '@/store';
import './index.less';
import { getFullNum } from '@/utils/common';
import { submit } from '../../applyManagement/api';
import { fullName } from '../../applyManagement/util';
import { approvalBatchReview } from '../../applyReview/api';
import { BrandTab, DetailField, IDetail } from '../interface';
import { brandCountryMap, countryMap, generateConstMaps, tabs } from '../config';
import { getDetail } from '../useSettleInDrawer';

interface DetailDrawer {
  detailVisible: boolean;
  title: string;
  detailInfo: IDetail;
  statusInfo: { label: string | number; color: string; name?: string };
  setDetailVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setReMarkVisible?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setDetailInfo: React.Dispatch<IDetail>;
  refreshList: () => void;
  detailField: DetailField;
  detailInfoOneLine?: string[];
  detailInfoEmphasize?: string[];
  saleColumns: any[];
  brandColumns: any[];
  showFooter: boolean;
  fromManager: boolean;
  showRemark?: boolean;
  curApplyId: number;
  currentId?: number;
}

export default ({
  detailVisible,
  detailInfo,
  title,
  statusInfo,
  setDetailVisible,
  setReMarkVisible,
  fromManager,
  setDetailInfo,
  refreshList,
  detailField = {
    brandMsg: {
      品牌权利主体名称: 'brandRightSubject',
      品牌分层自评: 'brandLayerSelfEvaluation',
      品牌优先级: 'brandPriority',
      品牌国别: 'countryFlag',
      品牌中英文: 'brandCountryFlag',
      品牌别名: 'brandAlias',
      是否一品多商: 'oneProductMultiMerchant',
      大类: 'brandClasses',
      风格线: 'brandStyle',
      申请单ID: 'applyId',
      企业全称: 'enterpriseName',
      提报人: 'creator',
      主营类目: 'mainCategory',
      品牌类型: 'brandType',
      品牌标签: 'brandTag',
      资质类型: 'qualificationType',
      件单价: 'price',
      是否为纯新品牌: 'isNewBrand',
      供给模式: 'supplyMode',
      品牌LOGO: 'brandLogo',
      中文商标注册证: 'trademarkList',
      中文商标注册状态: 'registerStatus',
      中文商标专用权期限: 'trademarkStartTime,trademarkEndTime',
      '中文承诺函证明/特批截图': 'commitmentProofList',
      中文品牌方关系证明: 'relationshipProofList',
      英文商标注册证: 'foreignTrademarkList',
      英文商标注册状态: 'foreignRegisterStatus',
      英文商标专用权期限: 'foreignTrademarkStartTime,foreignTrademarkEndTime',
      '英文承诺函证明/特批截图': 'foreignCommitmentProofList',
      英文品牌方关系证明: 'foreignRelationshipProofList',
      品牌故事: 'brandStory',
      品牌分层满足规则描述: 'brandValueDesc',
      附件: 'layerRuleList',
    },
    brandData: {
      日销价格指数: 'dailyPriceIndex',
      'A/S级促销价格指数': 'pricePromotionIndex',
      预计到达规定价格指数时间: 'estimatePriceArriveTime',
      计划平均每月上新SPU数: 'spuNum',
      预计贡献月销售额: 'monthlySales',
      达到预计销售需要时间: 'estimateSaleArriveTime',
      费率: 'rate',
      收费建议: 'fixedCost',
      社区每月Seeding数量: 'communitySeedingNum',
      '可在穿搭/晒单/开箱精选铺设的商品比例': 'layGoodsPercent',
      是否可在社媒每月导流: 'isSocialMediaDiversion',
      每月引力平台投入预算金额: 'gravityBudgetAmount',
      每月站内社区投入预算占比: 'insideBudgetAmountPercent',
      每月外投预算金额: 'outsideBudgetAmount',
      每月外投预算占比: 'outsideBudgetAmountPercent',
      得物社区帖子数: 'dewuPostsNum',
      小红书社区帖子数: 'xiaohongshuPostsNum',
      抖音视频数: 'tiktokVideoNum',
      抖音视频点赞数: 'tiktokVideoLikeNum',
      是否为奢品: 'isLuxury',
      奢品风格: 'luxuryStyle',
      淘数据GMV: 'taoDataGmv',
      符合奢品的具体原因: 'luxuryReason',
      国内外官方线下店铺数量: 'offlineStoreAmount',
      '线上线下销售规模（年度）': 'annualSaleScale',
      '淘宝（含天猫）月销量': 'monthlySaleAmount',
      淘宝天猫粉丝数: 'tianMaoFans',
      微博粉丝数: 'weiboFans',
      抖音粉丝数: 'tiktokFans',
    },
  },
  detailInfoOneLine = ['brandName', 'brandValueDesc', 'luxuryReason', 'brandStory'],
  detailInfoEmphasize = [],
  saleColumns,
  brandColumns,
  showFooter = true,
  showRemark = false,
  curApplyId,
  currentId,
}: DetailDrawer) => {
  const [activeKey, setActiveKey] = useState('brandMsg');

  const renderDetailTag = () => {
    const tagMap: { [key: string]: string } = {
      '0': '新品牌新类目',
      '1': '老品牌新类目',
    };
    return tagMap[detailInfo?.applyTag] || '';
  };
  const oneLineSpan = (val: string) => {
    if (detailInfoOneLine?.includes(val)) {
      return 24;
    }
    return 8;
  };

  const emphasizeClass = (val: string) => {
    if (detailInfoEmphasize?.includes(val)) {
      return 'emphasize';
    }
    return '';
  };

  const oneLineText = (val: string) => {
    if (val.length > 16) {
      const spVal = val.split('');
      return `${spVal.splice(0, 12).join('')} ... ${spVal.splice(spVal.length - 4, 4).join('')}`;
    }
    return val;
  };

  const constMaps = generateConstMaps();

  const JudgData = (value?: string | number) => {
    return (value ?? '') === '' || (value ?? '') === -1 || value === 0;
  };

  const translateObj: Record<string, (v: string | number) => void> = {
    offlineStoreAmount: (v: number) => (JudgData(v) ? '-' : `${v} 个`),
    annualSaleScale: (v: number) => (JudgData(v) ? '-' : `${v} 亿`),
    monthlySaleAmount: (v: number) => (JudgData(v) ? '-' : `${v} 件`),
    tianMaoFans: (v: number) => (JudgData(v) ? '-' : `${v} 万`),

    weiboFans: (v: number) => (JudgData(v) ? '-' : `${v} 万`),
    tiktokFans: (v: number) => (JudgData(v) ? '-' : `${v} 万`),

    price: (v: number) => (JudgData(v) ? '-' : `${v / 100} 元`),
    dailyPriceIndex: (v: string) => (JudgData(v) ? '-' : `${v}%`),
    pricePromotionIndex: (v: string) => (JudgData(v) ? '-' : `${v}%`),
    spuNum: (v: number) => (JudgData(v) || (v ?? '') === -1 ? '-' : `${v}`),
    monthlySales: (v: number) => (JudgData(v) ? '-' : `${v / 100} 元`),
    rate: (v: string) =>
      JudgData(v)
        ? '-'
        : v
            .split('，')
            .map((c) => `${String(c).trim()}%`)
            .join(','),
    fixedCost: (v: number) => (JudgData(v) ? '-' : `${v / 100} 元`),
    communitySeedingNum: (v: number) => (JudgData(v) ? '-' : `${v} 篇`),
    freeFreightGoodsPercent: (v: string) => (JudgData(v) ? '-' : `${v}%`),
    layGoodsPercent: (v: string) => (JudgData(v) ? '-' : `${v}%`),
    insideBudgetAmount: (v: number) => (JudgData(v) ? '-' : `${v / 100} 元`),
    gravityBudgetAmount: (v: number) => (JudgData(v) ? '-' : `${v / 100} 元`),
    insideBudgetAmountPercent: (v: string) => (JudgData(v) ? '-' : `${v}%`),
    outsideBudgetAmount: (v: number) => (JudgData(v) ? '-' : `${v / 100} 元`),
    outsideBudgetAmountPercent: (v: string) => (JudgData(v) ? '-' : `${v}%`),
    dewuPostsNum: (v: number) => (JudgData(v) ? '-' : `${v} 篇`),
    xiaohongshuPostsNum: (v: number) => (JudgData(v) ? '-' : `${v} 篇`),
    tiktokVideoNum: (v: number) => (JudgData(v) ? '-' : `${v} 篇`),
    tiktokVideoLikeNum: (v: number) => (JudgData(v) ? '-' : `${v} 赞`),
    taoDataGmv: (v: number) => (JudgData(v) ? '-' : `${getFullNum(v / 100000000)} 亿`),
  };

  const getBrandCountry = (value: string, detail: { brandCountry?: string }) => {
    const { brandCountry = '' } = detail || {};
    if (Number(value) === countryMap.国内) {
      // 国内
      return '中国';
    }
    if (Number(value) === countryMap.国际) {
      // 国外
      return `国际-${brandCountry}`;
    }
    return '-';
  };

  const getBrandCountryString = (value?: string | number) => {
    const { brandChineseName = '', brandEnglishName = '' } = detailInfo || {};
    if (Number(value) === brandCountryMap.中文) {
      return brandChineseName;
    }
    if (Number(value) === brandCountryMap.英文) {
      return brandEnglishName;
    }
    if (Number(value) === brandCountryMap.中英文) {
      return `${brandChineseName}-${brandEnglishName}`;
    }
    return '-';
  };

  const valueComputed = (key: string) => {
    const val = detailInfo[key];
    if (typeof val === 'boolean') {
      return val ? '是' : '否';
    }
    // 枚举选项
    if (
      [
        'brandType',
        'brandLayerSelfEvaluation',
        'brandPriority',
        'oneProductMultiMerchant',
        'supplyMode',
        'estimatePriceArriveTime',
        'estimateSaleArriveTime',
        'luxuryStyle',
        'brandType',
        'brandTag',
        'qualificationType',
        'registerStatus',
        'foreignRegisterStatus',
      ].includes(key)
    ) {
      return constMaps[key][val] || '-';
    }
    // radio
    if (key === 'countryFlag') {
      return getBrandCountry(val, detailInfo);
    }
    // 多选
    if (key === 'brandCountryFlag') {
      return getBrandCountryString(val);
    }
    if (key.startsWith('is')) {
      const obj: { [key: number]: string } = { 0: '否', 1: '是' };
      return obj[val] || '-';
    }
    if (typeof translateObj[key] === 'function') {
      return translateObj[key](val);
    }
    // 时间区间 trademarkStartTime\trademarkEndTime
    if (key.includes(',')) {
      const [start, end] = key.split(',');
      const startValue = detailInfo[start];
      const endValue = detailInfo[end];
      return startValue && endValue
        ? `${moment(startValue).format('YYYY-MM-DD HH:mm:ss')} ~ ${moment(endValue).format(
            'YYYY-MM-DD HH:mm:ss',
          )}`
        : '-';
    }
    return val && val !== 0 && val !== '' && val !== -1 ? val : '-';
  };

  const brandLogoComputed = () => {
    const values = detailInfo.brandLogo;
    return values?.url || '';
  };

  const trademarkComputed = (name: string) => {
    const values = detailInfo?.[name];
    const isEmptyRes = isEmpty(values);
    if (isEmptyRes) return [];
    return values?.map((item) => item.url);
  };

  const previewOptions = {
    brandLogo: {
      visible: false,
      onVisibleChange: (val: boolean) => {
        previewOptions.brandLogo.visible = val;
      },
    },
    trademarkList: {
      visible: false,
      onVisibleChange: (val: boolean) => {
        previewOptions.trademarkList.visible = val;
      },
    },
  };
  const [showPreview, setShowPreview] = useState(false);

  const tableDsComputed = detailInfo.internetSaleInfos.map((item) => ({
    ...item,
    storeName: detailInfo?.enterpriseName || '-',
  }));

  const { userStore } = store.modules;
  const currentUserName = fullName(userStore.userInfo);
  const navigate = useNavigate();

  // 设计上传图片的字段
  const imgList = [
    'brandLogo',
    'trademarkList',
    'commitmentProofList',
    'relationshipProofList',
    'foreignTrademarkList',
    'foreignCommitmentProofList',
    'foreignRelationshipProofList',
    'layerRuleList',
  ];

  return (
    <div>
      <Drawer
        visible={detailVisible}
        bodyStyle={{
          flex: '1',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 0,
          paddingBottom: '66px',
        }}
        drawerStyle={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        width={800}
        placement="right"
        mask={false}
        closable={true}
        onClose={() => {
          setDetailVisible(false);
        }}
        maskClosable={false}
        title={
          <div className="drawer-header">
            <span className="drawer-header_title">{title}</span>
            <Tag className="drawer-header_status" color={statusInfo.color}>
              {statusInfo.name || statusInfo.label}
            </Tag>
          </div>
        }
      >
        <Tabs
          activeKey={activeKey}
          onChange={(val) => {
            setActiveKey(val);
            const target: any = document.querySelector(`.${val}`);
            const ele = document.querySelector('.scrollContainer');
            if (target && ele) {
              ele.scrollTo(0, target.offsetTop);
            }
          }}
        >
          {tabs.map((item: BrandTab) => {
            return <Tabs.TabPane tab={item.name} key={item.key} />;
          })}
        </Tabs>
        <div className="scrollContainer">
          <Spin spinning={false} className="df fdc bsbb pr f1" wrapperClassName="spinning">
            <div>
              <div className="brandMsg">
                <div className="blockTitle">
                  {detailInfo.brandName}
                  <span style={{ color: 'red', paddingLeft: '8px', fontWeight: 'normal' }}>
                    {renderDetailTag()}
                  </span>
                </div>
                <Row gutter={[24, 0]}>
                  {Object.keys(detailField.brandMsg).map((key) => {
                    const value = detailField.brandMsg[key];
                    const showValue = valueComputed(value) !== '-';
                    return (
                      showValue && (
                        <Col
                          key={key + Math.random()}
                          span={oneLineSpan(value)}
                          className={emphasizeClass(value)}
                        >
                          {key.length > 16 ? (
                            <Tooltip title={key} mouseEnterDelay={0.5}>
                              <div className="key">{oneLineText(key)}</div>
                            </Tooltip>
                          ) : (
                            <div className="key">{key}</div>
                          )}
                          <div className="value">
                            {/* 图片预览展示 */}
                            {imgList.includes(value) ? (
                              <span
                                className={`image-wrapper ${
                                  value === 'brandLogo' ? 'logo-img' : ''
                                }`}
                              >
                                {value === 'brandLogo' ? (
                                  brandLogoComputed() ? (
                                    <>
                                      <Button type="link" onClick={() => setShowPreview(true)}>
                                        {' '}
                                        查看{key}
                                      </Button>
                                      <Image
                                        width="100"
                                        preview={{
                                          visible: showPreview,
                                          onVisibleChange: (val: boolean) => setShowPreview(val),
                                        }}
                                        src={brandLogoComputed()}
                                      />
                                    </>
                                  ) : (
                                    <span>-</span>
                                  )
                                ) : trademarkComputed(value)?.length ? (
                                  <Image.PreviewGroup>
                                    {trademarkComputed(value).map((v: any, index: number) => {
                                      return (
                                        <Image
                                          key={v + Math.random()}
                                          width={100}
                                          height={100}
                                          src={v}
                                        />
                                      );
                                    })}
                                  </Image.PreviewGroup>
                                ) : (
                                  <span>-</span>
                                )}
                              </span>
                            ) : (
                              <span>{valueComputed(value)}</span>
                            )}
                          </div>
                        </Col>
                      )
                    );
                  })}
                </Row>
              </div>
              <div className="brandData">
                <div className="blockTitle">品牌数据</div>
                <Row gutter={[24, 0]}>
                  {Object.keys(detailField.brandData).map((key) => {
                    const value = detailField.brandData[key];
                    const showValue = valueComputed(value) !== '-';
                    return (
                      showValue && (
                        <Col
                          key={key + Math.random()}
                          span={oneLineSpan(value)}
                          className={emphasizeClass(value)}
                        >
                          {key.length > 16 ? (
                            <Tooltip title={key} mouseEnterDelay={0.5}>
                              <div className="key">{oneLineText(key)}</div>
                            </Tooltip>
                          ) : (
                            <div className="key">{key}</div>
                          )}
                          <div className="value">
                            <span>{valueComputed(value)}</span>
                          </div>
                        </Col>
                      )
                    );
                  })}
                </Row>
              </div>
              <div className="saleChannel">
                <div className="blockTitle">渠道销售</div>
                <Table
                  style={{ width: '752px' }}
                  dataSource={tableDsComputed}
                  columns={saleColumns}
                  pagination={false}
                  rowKey={(record) => record.storeChannel}
                  size="small"
                  bordered
                  scroll={{ x: 776 }}
                />
              </div>
              <div className="brandPopularity">
                <div className="blockTitle">品牌热度</div>
                <Table
                  style={{ width: '752px' }}
                  dataSource={detailInfo.brandHotInfoList}
                  columns={brandColumns}
                  pagination={false}
                  rowKey={(record) => record.brandName}
                  size="small"
                  bordered
                  scroll={{ x: 776 }}
                />
              </div>
              {detailInfo.remark ? (
                <div className="remark other">
                  <div className="key">备注</div>
                  <div className="value">{detailInfo.remark}</div>
                </div>
              ) : null}
            </div>
          </Spin>
        </div>
        {showFooter ? (
          <div className="drawerFooter">
            <Space className="tr w100p jcfs" size={12}>
              {fromManager && detailInfo.status === 0 && detailInfo.creator === currentUserName ? (
                <>
                  <Button
                    onClick={() => {
                      navigate(
                        {
                          pathname: '/settleIn/applyManagement/edit',
                          search: createSearchParams({
                            applyId: curApplyId.toString(),
                          }).toString(),
                        },
                        { replace: true },
                      );
                    }}
                  >
                    编辑
                  </Button>
                  <Popconfirm
                    title={() => {
                      return (
                        <>
                          <div className="confirmTitle">确定提交审核申请单？</div>
                          <span className="confirmContent">提交后进入评审，将无法撤回</span>
                        </>
                      );
                    }}
                    placement="top"
                    onConfirm={async () => {
                      await submit({ applyId: curApplyId });
                      message.success('申请单提交成功！');
                      refreshList();
                      await getDetail(curApplyId, setDetailInfo);
                    }}
                  >
                    <Button type="primary"> 提交审核 </Button>
                  </Popconfirm>
                </>
              ) : null}
              {!fromManager && detailInfo.status === 10 ? (
                <>
                  <Button
                    type="primary"
                    size="middle"
                    onClick={async () => {
                      try {
                        const result = await approvalBatchReview({
                          idList: [currentId].join(','),
                          targetState: 40,
                        });
                        if (result) {
                          message.success('评审成功');
                          setDetailVisible(false);
                          refreshList();
                        } else {
                          message.error('评审失败');
                        }
                      } catch (err) {
                        console.error('评审失败', err);
                      }
                    }}
                  >
                    通过
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    className="next-btn"
                    onClick={async () => {
                      try {
                        const result = await approvalBatchReview({
                          idList: [currentId].join(','),
                          targetState: 20,
                        });
                        if (result) {
                          message.success('评审成功');
                          setDetailVisible(false);
                          refreshList();
                        } else {
                          message.error('评审失败');
                        }
                      } catch (err) {
                        console.error('评审失败', err);
                      }
                    }}
                  >
                    下次评审
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    danger
                    onClick={async () => {
                      try {
                        const result = await approvalBatchReview({
                          idList: [currentId].join(','),
                          targetState: 30,
                        });
                        if (result) {
                          message.success('评审成功');
                          setDetailVisible(false);
                          refreshList();
                        } else {
                          message.error('评审失败');
                        }
                      } catch (err) {
                        console.error('评审失败', err);
                      }
                    }}
                  >
                    不通过
                  </Button>
                </>
              ) : null}
              {showRemark ? (
                <Button
                  size="middle"
                  onClick={() => {
                    setReMarkVisible && setReMarkVisible(true);
                  }}
                >
                  {detailInfo.remark ? '修改备注' : '备注'}
                </Button>
              ) : null}
            </Space>
          </div>
        ) : null}
      </Drawer>
    </div>
  );
};
