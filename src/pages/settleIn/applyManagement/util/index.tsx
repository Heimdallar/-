import { LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@poizon-design/pro-form';
import { cloneDeep, isEmpty } from 'lodash';
import { Tooltip } from 'poizon-design';
import React, { MutableRefObject, useMemo } from 'react';
import moment from 'moment';
import { getFullNum } from '@/utils/common';
import {
  APPROVAL_STATUS,
  BRAND_NAME,
  countryMap,
  regStatusMap,
} from '@/pages/settleIn/applyCommon/config';
import { IDetail } from '../../applyCommon/interface';
import { details, queryInterfaceList, queryMenu } from '../api';
import {
  artSettingKeys,
  CHANGESIZEONE,
  CHANGESIZETWO,
  initInternetSaleInfos,
  initValues,
  STRINGNO2NO,
  ticketSettingKeys,
  reviewPassDisbleKeys,
  selectTypeName,
} from '../config/const';
import { BrandHotInfo, InternetSaleInfo, StringObj } from '../interface';
import './index.less';

export function getStatusTag(val: number) {
  const colors: StringObj = {
    0: '',
    10: 'blue',
    20: 'orange',
    30: 'red',
    40: 'green',
  };
  const statusInfo = APPROVAL_STATUS.find((item) => item.value === val);
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

export const fetchIsBDAdmin = async (
  setIsBDAdmin: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const menuTree = await queryMenu();
  const flatedmenu = flatTree(menuTree);
  const currentMenu = flatedmenu['settleIn/applyManagement'];
  if (!currentMenu) {
    setIsBDAdmin(false);
  } else {
    const { backstageId, id: menuId } = currentMenu;
    const interfaceList = await queryInterfaceList({
      backstageId,
      menuId,
    });
    if (
      interfaceList.some(
        (item: any) =>
          item.elementCode ===
            '/api/v1/h5/youthcamp-mer-customer/merchant/customer/brand/apply/reportSet' && item.checked,
      )
    ) {
      setIsBDAdmin(true);
    }
  }
};

export const fullName = (userInfo: any = {}) => {
  const { username, realname } = userInfo;
  const num = username.match(/\d+/g);
  return `${realname}${num ? num[0] : ''}`;
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

export { saleInfoColumns, brandHotColumns };

const getBrandCountryArr = (brandCountryFlag = 0) => {
  switch (brandCountryFlag) {
    case 0:
      return [0];
    case 1:
      return [1];
    case 2:
      return [0, 1];
    default:
      break;
  }
};

export const initFormData = async (
  step: number,
  formRef: MutableRefObject<ProFormInstance<any> | undefined>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setFromPage: React.Dispatch<React.SetStateAction<string>>,
  setAdminEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setBtnAction: React.Dispatch<React.SetStateAction<string>>,
  setApplyId: React.Dispatch<React.SetStateAction<string>>,
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>,
  setFormData: React.Dispatch<any>,
) => {
  const searchParams = window.location.search;
  const queryParams = new URLSearchParams(searchParams);
  const theApplyId = queryParams.get('applyId');
  const spec = queryParams.get('spec');
  const from = queryParams.get('from');
  if (theApplyId != null) {
    setApplyId(theApplyId);
    if (spec !== null) {
      setAdminEdit(true);
    }
    if (from) {
      setFromPage(from);
    }
    setLoading(true);
    const res = await details({ applyId: theApplyId });
    if (spec !== null) {
      setBtnAction('adminSave');
    } else if (res.status !== 0 && res.status !== 30) {
      setShowResult(true);
      setBtnAction('submit');
    }

    if (spec !== null || res.status === 0 || res.status === 30) {
      const {
        brandLogo,
        trademarkList,
        commitmentProofList,
        relationshipProofList,
        foreignTrademarkList,
        foreignCommitmentProofList,
        foreignRelationshipProofList,
        layerRuleList,
        trademarkStartTime,
        trademarkEndTime,
        foreignTrademarkStartTime,
        foreignTrademarkEndTime,
        foreignRegisterStatus,
        registerStatus,
        tianMaoFans,
        tiktokFans,
        weiboFans,
        fansNum,
      } = res || {};
      const tempValue = {
        ...res,
        brandLogo: brandLogo ? [brandLogo] : [],
        trademarkList: trademarkList || [],
        // 5.23 新增字段处理
        // '中文承诺函证明/特批截图'
        commitmentProofList: commitmentProofList || [],
        // 中文品牌方关系证明
        relationshipProofList: relationshipProofList || [],
        // 英文商标注册证
        foreignTrademarkList: foreignTrademarkList || [],
        foreignCommitmentProofList: foreignCommitmentProofList || [],
        foreignRelationshipProofList: foreignRelationshipProofList || [],
        layerRuleList: layerRuleList || [],
        trademarkStartTime: trademarkStartTime ? moment(trademarkStartTime) : undefined,
        trademarkEndTime: trademarkEndTime ? moment(trademarkEndTime) : undefined,
        registerStatus: registerStatus || undefined,
        foreignRegisterStatus: foreignRegisterStatus || undefined,
        foreignTrademarkStartTime: foreignTrademarkStartTime
          ? moment(foreignTrademarkStartTime)
          : undefined,
        foreignTrademarkEndTime: foreignTrademarkEndTime
          ? moment(foreignTrademarkEndTime)
          : undefined,
        tianMaoFans: tianMaoFans || undefined,
        tiktokFans: tiktokFans || undefined,
        weiboFans: weiboFans || undefined,
        fansNum: fansNum || undefined,
        ...STRINGNO2NO.reduce((s: any, c) => {
          if (res[c] !== null && res[c] !== undefined && res[c] !== '') {
            s[c] = Number(res[c]);
          }
          return s;
        }, {}),
        ...CHANGESIZEONE.reduce((s: any, { key, multiple }) => {
          const cv = res[key];
          if (cv !== null && cv !== undefined && cv !== '') {
            s[key] = cv / multiple;
          }
          return s;
        }, {}),
        // 外网销售情况
        ...(res.internetSaleInfos?.length
          ? {
              internetSaleInfos: res.internetSaleInfos.map((item: any) => {
                return {
                  ...item,
                  ...CHANGESIZETWO.reduce((s: any, { key, multiple }) => {
                    const cv = item[key] ?? '';
                    if (cv !== '') {
                      s[key] = cv / multiple;
                    }
                    return s;
                  }, {}),
                };
              }),
            }
          : {}),
      };
      const data = Object.keys(tempValue).reduce((s: any, c) => {
        const cv = tempValue[c];
        if (![-1, -0.01, undefined, null, ''].includes(cv)) {
          s[c] = cv;
        }
        return s;
      }, {});

      // 待回显处理
      const { internetSaleInfos, brandCountryFlag, brandCountry, countryFlag } = data;
      const brandCountryFlagArr = getBrandCountryArr(brandCountryFlag);
      const isInternetSalesEmpty = isEmpty(internetSaleInfos);
      const formParams = {
        ...initValues,
        ...data,
        brandCountry: countryFlag === countryMap.国内 ? undefined : Array.isArray(brandCountry) ? brandCountry : [brandCountry],
        brandCountryFlagArr,
        internetSaleInfos: isInternetSalesEmpty ? [initInternetSaleInfos] : internetSaleInfos,
      };
      setFormData(formParams);
      formRef.current?.setFieldsValue(formParams);
    }
    setLoading(false);
  } else if (step === 1) {
    const res = formRef.current?.getFieldsValue();
    const params = {
      ...res,
      internetSaleInfos: [initInternetSaleInfos],
    };
    formRef.current?.setFieldsValue(params);
  }
};

const getArrKey = (arr: { key: string; thumbUrl: string }[]) => {
  if (!arr || arr?.length < 1) {
    return [];
  }
  return arr.map((item) => item.key);
};

export const getUploadParams = (data: any) => {
  data = data || {};
  const {
    trademarkList = [],
    brandLogo = [],
    commitmentProofList = [],
    relationshipProofList = [],
    foreignTrademarkList = [],
    foreignCommitmentProofList = [],
    foreignRelationshipProofList = [],
    layerRuleList = [],
  } = cloneDeep(data);

  return {
    trademarkList: getArrKey(trademarkList) || [],
    commitmentProofList: getArrKey(commitmentProofList) || [],
    relationshipProofList: getArrKey(relationshipProofList) || [],
    foreignTrademarkList: getArrKey(foreignTrademarkList) || [],
    foreignCommitmentProofList: getArrKey(foreignCommitmentProofList) || [],
    foreignRelationshipProofList: getArrKey(foreignRelationshipProofList) || [],
    layerRuleList: getArrKey(layerRuleList) || [],
    brandLogo: brandLogo[0]?.key || '',
  };
};

export const categoryRequireHandler = (
  categoryIsArt: boolean,
  categoryIsTicket: boolean,
  key: string,
) => {
  if (!categoryIsArt && !categoryIsTicket) return true;
  if (categoryIsArt && artSettingKeys.includes(key)) {
    return true;
  }
  if (categoryIsTicket && ticketSettingKeys.includes(key)) {
    return true;
  }
  return false;
};

/* 针对禁用的普适逻辑 */
export const formDisableHandler = (
  flagMap: { [key: string]: any },
  key: string,
  originValue?: boolean, // 原先逻辑
) => {
  let commValue = false;
  const { isReviewPassNot } = flagMap;

  if (isReviewPassNot) {
    // 针对评审通过的编辑，但是审批流未过场景
    commValue = !reviewPassDisbleKeys.includes(key);
  }

  if (commValue === false && originValue !== undefined) {
    // 如果普适逻辑，不禁用当前选项，采用原先逻辑，
    // 如果普适逻辑，要求禁用当前表单项，则优先禁用
    return originValue;
  }
  return commValue;
};

export const getFieldIfExist = (form: any, fieldName: string, newValue: any) => {
  if (newValue === undefined) {
    return form?.getFieldValue(fieldName);
  }
  return newValue;
};

// 合并表单数据
// 因表单会自动去除空字符串的key，导致merge时，存在无法覆盖初始值的情况
export const mergeFormData = (initData: any = {}, newData: any = {}) => {
  let output = { ...initData, ...newData };

  function handleBrandName(data: any) {
    const { brandCountryFlagArr = [] } = data || {};
    if (brandCountryFlagArr.length <= 0) {
      data.brandChineseName = '';
      data.brandEnglishName = '';
    }
    if (brandCountryFlagArr.length === 1) {
      if (brandCountryFlagArr.includes(BRAND_NAME.中文名)) {
        data.brandEnglishName = '';
      }
      if (brandCountryFlagArr.includes(BRAND_NAME.英文名)) {
        data.brandChineseName = '';
      }
    }
    return data;
  }
  output = handleBrandName(output);

  return output;
};

export const filterNotRequired = (data) => {
  const {
    registerStatus,
    trademarkStartTime,
    trademarkEndTime,
    commitmentProofList,
    relationshipProofList,

    foreignRegisterStatus,
    foreignTrademarkStartTime,
    foreignTrademarkEndTime,
    foreignCommitmentProofList,
    foreignRelationshipProofList,
    countryFlag,
  } = data || {};
  const newData = {
    trademarkStartTime,
    trademarkEndTime,
    commitmentProofList,
    relationshipProofList,
    foreignTrademarkStartTime,
    foreignTrademarkEndTime,
    foreignCommitmentProofList,
    foreignRelationshipProofList,
  };

  switch (registerStatus) {
    case regStatusMap.R标:
      // 展示时间区间,其余为空
      newData.commitmentProofList = [];
      newData.relationshipProofList = [];
      break;
    case regStatusMap.未注册:
      // 上传 commitmentProofList
      newData.trademarkStartTime = undefined;
      newData.trademarkEndTime = undefined;
      newData.relationshipProofList = [];
      break;
    case regStatusMap.TM标:
      newData.trademarkStartTime = undefined;
      newData.trademarkEndTime = undefined;
      newData.commitmentProofList = [];
      if (countryFlag !== countryMap.国际) {
        // 国际 需 上传 relationshipProofList
        newData.relationshipProofList = [];
      }
      break;
    default:
      newData.trademarkStartTime = undefined;
      newData.trademarkEndTime = undefined;
      newData.commitmentProofList = [];
      newData.relationshipProofList = [];

      break;
  }
  switch (foreignRegisterStatus) {
    case regStatusMap.R标:
      // 展示时间区间,其余为空
      newData.foreignCommitmentProofList = [];
      newData.foreignRelationshipProofList = [];
      break;
    case regStatusMap.未注册:
      // 上传 foreignCommitmentProofList
      newData.foreignTrademarkStartTime = undefined;
      newData.foreignTrademarkEndTime = undefined;
      newData.foreignRelationshipProofList = [];
      break;
    case regStatusMap.TM标:
      newData.foreignTrademarkStartTime = undefined;
      newData.foreignTrademarkEndTime = undefined;
      newData.foreignCommitmentProofList = [];
      if (countryFlag !== countryMap.国际) {
        // 国际需上传 foreignRelationshipProofList
        newData.foreignRelationshipProofList = [];
      }
      break;
    default:
      newData.foreignTrademarkStartTime = undefined;
      newData.foreignTrademarkEndTime = undefined;
      newData.foreignRelationshipProofList = [];
      newData.foreignCommitmentProofList = [];
      break;
  }
  return newData;
};
