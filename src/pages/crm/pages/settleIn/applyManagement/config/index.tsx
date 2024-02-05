import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { DownloadLine } from '@poizon-design/icons';
import ProCard from '@poizon-design/pro-card';
import { FormListActionType, ProFormColumnsType, ProFormSelect } from '@poizon-design/pro-form';
import { debounce, isEmpty, isObject } from 'lodash';
import { Button, FormInstance, SelectProps, Tooltip, DatePicker,  } from 'poizon-design';
import { Input, AutoComplete } from 'poizon-design';
const TextArea = Input.TextArea;
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getBrandByName } from '@/service/api';
import {
  APPLY_ITEM_STATUS,
  BRAND_COUNTRY_FLAG_TYPES,
  BRAND_LAYER_SELFE_VALUATION_TYPES,
  BRAND_NAME,
  BRAND_PRIORITY_TYPES,
  BRAND_TAGS,
  BRAND_TYPES,
  commonYesNoMap,
  COUNTRY_FLAG_TYPES,
  ESTIMATED_TIME,
  LUXURY_STYLES,
  ONE_PRODUCT_MULTI_MERCHANT_TYPES,
  QUALIFICATION_TYPE,
  REG_STATUS,
  SUPPLY_MODES,
  countryMap,
  regStatusMap,
  supplyModeMap,
} from '@/pages/settleIn/applyCommon/config';
import { selectOptionsItem } from '@/entities/interface';
import ProUpload, { UploadScene } from '@/components/ProUpload/index';
import {
  getCountryCodeList,
  getBrandClassesByLevel1Category,
  getBrandInfo,
  getBrandStyleByClass,
  getCategoryList,
  getCategoryListByBrand,
} from '../api';
import { IEventTarget } from '../interface';
import { categoryRequireHandler, formDisableHandler, getFieldIfExist } from '../util';
import { INIT_STORE_CHANNELS, IS_OR_NOT } from './const';
import './index.less';
import moment from 'moment';
import {
  annualSalesValidator,
  commonValidateFloatNumber,
  commonValidatePositiveNumber,
  commonValidatePrecent,
  commonValidatePrecentNotRequired,
  commonValidateRequiredFloatNumber,
  commonValidateRequiredPositiveNumber,
  isEmptyIgnore,
  storeUrlValidator,
  validators,
} from './validator';

const useStepColumns = (
  formRef: any,
  step: number,
  formData: any,
  fromPage: string,
  applyId: string,
  setFormData: (v: any) => void,
) => {
  const [isNotNew, setIsNotNew] = useState(false);
  const [isLuxry, setIsLuxry] = useState(false);
  const [storeChannelOptions, setStoreChannelOptions] = useState<any>(INIT_STORE_CHANNELS);
  const actionRef = useRef<FormListActionType<any>>();
  const isClearSelectInput = useRef(false);
  const [brandOptions, setBrandOptions] = useState<SelectProps<any>['options']>([]);
  const [categoryOptions, setCategoryOptions] = useState<SelectProps<any>['options']>([]);
  const [categoryIsArt, setCategoryIsArt] = useState(false);
  const [categoryIsTicket, setCategoryIsTicket] = useState(false);
  const [isReviewPassNot, setIsReviewPassNot] = useState(false);
  const [enterpriseNameRequired, setEnterpriseNameRequired] = useState(true);
  const [curBrandId, setCurBrandId] = useState(-1);
  const formDatas = formRef?.current?.getFieldsValue() || {};
  // 判断中文/英文商标注册证必选一个上传
  const [trademark, setTrademark] = useState({
    zh: true,
    en: true,
  });
  // 中文/英文商标注册证是否上传文件
  const [fileLists, setFileLists] = useState({
    zh: [],
    en: [],
  });
  // 当品牌国别选择【国内】且【商标注册状态】选择【TM标】
  const [linkage, setLinkage] = useState(false);
  const [foreignLinkage, setForeignLinkage] = useState(false);
  // 中、英文商标专用权期限
  const [dates, setDates] = useState<moment.Moment[] | null>(null);
  const [foreignDates, setForeignDates] = useState<moment.Moment[] | null>(null);
  const [countryCodeList, setCountryCodeList] = useState<[]>([]);
  // 中文商标注册证校验，注册证上传就为必选
  const isTrademarkList = trademark?.zh;
  // 英文商标注册证校验，注册证上传就为必选
  const isForeignTrademarkList = trademark?.en;

  const clearSelectInput = (name: string) => {
    const obj: Record<string, undefined> = {};
    obj[name] = undefined;
    formRef.current?.setFieldsValue(obj);
    isClearSelectInput.current = true;
    setFormData({
      ...formData,
      ...obj,
    });
  };

  // 编辑进入时处理中英文商标注册证校验及商标专用权期限反显
  useEffect(() => {
    // 防止调用clearSelectInput，重置注册证校验
    if (isClearSelectInput?.current) {
      return;
    }
    const {
      trademarkList,
      foreignTrademarkList,
      trademarkStartTime,
      trademarkEndTime,
      foreignTrademarkStartTime,
      foreignTrademarkEndTime,
    } = formData || {};

    setDates([trademarkStartTime || null, trademarkEndTime || null]);
    setForeignDates([foreignTrademarkStartTime || null, foreignTrademarkEndTime || null]);
    if (!trademarkList?.length && !foreignTrademarkList) {
      return;
    }
    if (trademarkList?.length && foreignTrademarkList?.length) {
      setFileLists({
        zh: trademarkList,
        en: foreignTrademarkList,
      });
    }
    if (trademarkList?.length) {
      setFileLists({
        ...fileLists,
        zh: trademarkList,
      });
      setTrademark({
        en: false,
        zh: true,
      });
    } else if (foreignTrademarkList?.length) {
      setFileLists({
        ...fileLists,
        en: foreignTrademarkList,
      });
      setTrademark({
        en: true,
        zh: false,
      });
    }
  }, [formData]);

  // 中文商标专用权期限值设置
  useEffect(() => {
    if (dates?.length) {
      formRef?.current?.setFieldsValue({ trademarkTime: dates });
    } else {
      formRef?.current?.setFieldsValue({ trademarkTime: null });
    }
  }, [dates]);

  // 英文商标专用权期限值设置
  useEffect(() => {
    if (foreignDates?.length) {
      formRef?.current?.setFieldsValue({ foreignTrademarkTime: foreignDates });
    } else {
      formRef?.current?.setFieldsValue({ foreignTrademarkTime: null });
    }
  }, [foreignDates]);

  const handleStoreSaleInfos = (form?: FormInstance, isInit?: boolean) => {
    const internetSaleInfos = isInit
      ? formData?.internetSaleInfos || []
      : form?.getFieldValue('internetSaleInfos') || [];
    const saleInfoSelectedStrs = internetSaleInfos
      .map((item: { storeChannel: string; [key: string]: any }) => {
        if (item?.storeChannel) {
          return item.storeChannel;
        }
      })
      .filter((d: string | undefined) => !!d);

    const saleInfoSelected = saleInfoSelectedStrs.reduce((acc: string[], cur: string) => {
      if (cur && acc) {
        return acc.concat(cur);
      }
    }, []);

    const newOptions = storeChannelOptions?.map((item: any) => {
      if (saleInfoSelected && saleInfoSelected.includes(item.value)) {
        item.disabled = true;
      } else {
        item.disabled = false;
      }
      return item;
    });
    setStoreChannelOptions(newOptions);
  };

  useEffect(() => {
    const { brandType, supplyMode, isLuxury: formIsLuxury, mainCategoryId, status } = formData;
    setIsNotNew(() => brandType !== BRAND_TYPES[0].value);
    setEnterpriseNameRequired(
      () => supplyMode !== supplyModeMap['C 端供给'] && supplyMode !== supplyModeMap.供给未明确,
    );
    setIsLuxry(!!formIsLuxury);
    let mainCategoryValue = mainCategoryId;
    if (!mainCategoryValue) return;
    if (isObject(mainCategoryValue)) {
      mainCategoryValue = mainCategoryValue.value;
    }

    setIsReviewPassNot(status === APPLY_ITEM_STATUS.reviewPass && fromPage !== 'applyReview');
    const [artItem] = categoryOptions?.filter((item) => item.label === '艺术品');
    const [ticketItem] = categoryOptions?.filter((item) => item.label === '演出票务');
    !isEmpty(artItem) && setCategoryIsArt(() => mainCategoryValue === artItem.value);
    !isEmpty(ticketItem) && setCategoryIsTicket(() => mainCategoryValue === ticketItem.value);
  }, [formData, categoryOptions]);

  useEffect(() => {
    if (step === 1) {
      handleStoreSaleInfos(undefined, true);
    }
  }, [step]);

  const columns = useMemo<ProFormColumnsType<any>[][]>(() => {
    const domain = 'wcjs.sbj.cnipa.gov.cn';
    return [
      [
        {
          dataIndex: 'brandName', // 后端备注：品牌名称
          title: '品牌官方名',
          formItemProps: {
            extra: (
              <>
                <span className="helperText warnning">
                  <span>
                    请前往商标网检索校验品牌名称
                    <a href={`http://${domain}`} target="_blank" rel="noreferrer">
                      http://wcjs.sbj.cnipa.gov.cn/
                    </a>
                    ，若与商标网不一致将会失败，需要重新提交！
                  </span>
                </span>
              </>
            ),
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandName'),
                message: '品牌官方名不得为空',
              },
              {
                validator: (r: any, v: any) => {
                  if (isEmptyIgnore(r, v)) {
                    return Promise.resolve();
                  }
                  if (!validators.required(v) && r.required) {
                    return Promise.reject('品牌官方名不得为空');
                  }
                  if (!validators.string_length(v, [null, 100])) {
                    return Promise.reject('品牌官方名最多100个字符');
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
          renderFormItem: () => {
            return (
              <AutoComplete
                allowClear={true}
                placeholder="为避免重名，请先核查品牌池"
                style={{ width: '100%' }}
                disabled={formDisableHandler(
                  { isReviewPassNot },
                  'brandName',
                  Boolean(applyId && fromPage === 'applyReview'),
                )}
                onSelect={debounce(async (name = '') => {
                  const [brandIItem] = brandOptions?.filter((d) => d.label === name);
                  if (isEmpty(brandIItem)) return;
                  const brandId = brandIItem?.id;
                  setCurBrandId(brandId);
                  formRef?.current?.setFieldsValue({
                    currentBrandId: brandId,
                  });
                  const data: any = await getBrandInfo({ brandId });
                  if (!data) {
                    return;
                  }

                  const {
                    countryFlag,
                    brandCountryFlag,
                    brandChineseName,
                    brandEnglishName,
                    brandAlias,
                    brandStory,
                    brandLogo,
                    oneProductMultiMerchant,
                  } = data;

                  let brandCountryFlagArr: any = [];
                  const _brandCountryFlag = Number(brandCountryFlag);
                  if (_brandCountryFlag === 2) {
                    brandCountryFlagArr = [0, 1];
                  }
                  if (_brandCountryFlag === 1 || _brandCountryFlag === 0) {
                    brandCountryFlagArr = [_brandCountryFlag];
                  }

                  formRef?.current?.setFieldsValue({
                    countryFlag: getFieldIfExist(formRef?.current, 'countryFlag', countryFlag),
                    brandCountryFlagArr,
                  });

                  if (_brandCountryFlag === 1) {
                    formRef?.current?.setFieldsValue({
                      brandEnglishName: brandEnglishName || '',
                    });
                  }
                  if (_brandCountryFlag === 0) {
                    formRef?.current?.setFieldsValue({
                      brandChineseName: brandChineseName || '',
                    });
                  }

                  if (_brandCountryFlag === 2) {
                    formRef?.current?.setFieldsValue({
                      brandChineseName: brandChineseName || '',
                      brandEnglishName: brandEnglishName || '',
                    });
                  }

                  const _mainCategoryId = formRef?.current?.getFieldValue('mainCategoryId');

                  formRef?.current?.setFieldsValue({
                    brandAlias: brandAlias || '',
                    brandStory: brandStory || '',
                    oneProductMultiMerchant:
                      oneProductMultiMerchant >= 0 ? oneProductMultiMerchant : 1,
                    mainCategoryId: isReviewPassNot ? _mainCategoryId : null,
                  });

                  if (brandLogo) {
                    formRef?.current?.setFieldsValue({
                      brandLogo: [
                        {
                          url: brandLogo,
                        },
                      ],
                    });
                  }
                }, 100)}
                onClear={() => {
                  setCurBrandId(-1);
                  formRef?.current?.setFieldsValue({
                    currentBrandId: -1,
                  });
                }}
                onSearch={async (keyWord = '') => {
                  const resp: any = await getBrandByName({
                    name: keyWord,
                    pageSize: 200,
                    pageNum: 1,
                  });
                  const res =
                    resp.contents?.map((item: any) => {
                      return {
                        label: item.name,
                        value: item.name,
                        id: item.id,
                      };
                    }) || [];
                  setBrandOptions(res);
                }}
              >
                {brandOptions.map((item) => {
                  return (
                    <AutoComplete.Option key={item.value} value={item.value}>
                      {item.label}
                    </AutoComplete.Option>
                  );
                })}
              </AutoComplete>
            );
          },
        },
        {
          dataIndex: 'brandRightSubject', //  后端备注：品牌主题权益
          title: '品牌权利主体名称',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  '品牌权利主体名称',
                ),
                message: '品牌权利主体名称不得为空',
              },
            ],
            extra: (
              <>
                <span className="helperText">请填写品牌创始公司或主理人</span>
              </>
            ),
          },
          fieldProps: {
            placeholder: '最多输入50个字符',
            maxLength: 50,
          },
        },
        {
          dataIndex: 'currentBrandId',
          hideInForm: true,
        },
        {
          dataIndex: 'brandLayerSelfEvaluation',
          title: '品牌分层自评',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'brandLayerSelfEvaluation',
                ),
                message: '品牌分层自评不得为空',
              },
            ],
            extra: (
              <span>
                品牌分层标签请参考
                <a
                  href="https://poizon.feishu.cn/sheets/shtcn0oRXugkQjdDxGAu814jftd?sheet=CXweNj"
                  target="_blank"
                  rel="noreferrer"
                >
                  品牌层级A-E重新构建
                </a>
              </span>
            ),
          },
          valueType: 'select',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandLayerSelfEvaluation'),
            options: BRAND_LAYER_SELFE_VALUATION_TYPES,
          },
        },
        {
          dataIndex: 'brandValueDesc',
          title: '品牌分层满足规则描述',
          width: '100%',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandValueDesc'),
                message: '品牌分层满足规则描述不得为空',
              },
            ],
          },
          renderFormItem: (_, a, form) => {
            const formProps = {
              placeholder: '最多输入500个字符',
              showCount: true,
              maxLength: 500,
              rows: 4,
              disabled: formDisableHandler({ isReviewPassNot }, 'brandValueDesc'),
            };
            const val = form.getFieldValue('brandValueDesc');
            return (
              <div style={{ display: 'flex', width: '100%' }}>
                <TextArea value={val} style={{ flex: 1 }} {...formProps} />
                <Tooltip
                  placement="bottom"
                  color="#fff"
                  title={
                    <div className="tooltipStyle">
                      <p>填写举例</p>
                      <div>
                        <p>纯新</p>
                        <span>
                          需要有合作门槛，品牌在得物的差异化支持是什么，新品资源、首发资源等；
                        </span>
                      </div>
                      <div>
                        <p>纯线下</p>
                        <span>
                          线上运营的能力如何，以及线下门店在国内/外核心商圈/商场有开店，例举2~3个门店；
                        </span>
                      </div>
                      <div>
                        <p>全渠道</p>
                        <span> 品牌全年生意规模，线上线下生意占比&线下门店规模；</span>
                      </div>
                      <div>
                        <p>互联网品牌</p>
                        <span>可不做补充；</span>
                      </div>
                      <div>
                        <p>全渠道</p>
                        <span>其他补充</span>
                      </div>
                    </div>
                  }
                  overlayStyle={{ minWidth: '400px' }}
                >
                  <span style={{ color: '#01c2c3' }}>示例</span>
                </Tooltip>
              </div>
            );
          },
        },
        {
          dataIndex: 'layerRuleList',
          title: '附件',
          formItemProps: {
            valuePropName: 'fileList',
            extra: '限制为不超过10M的jpg/png格式文件',
            rules: [
              {
                required: false,
              },
            ],
          },
          renderFormItem: () => {
            return (
              <ProUpload
                bizCode="merchant_entry"
                accept=".jpg,.png"
                size={10}
                listType="picture-card"
                scene={UploadScene.crm}
                maxCount={3}
              />
            );
          },
        },
        {
          dataIndex: 'brandPriority',
          title: '品牌优先级',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandPriority'),
                message: '品牌优先级不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandPriority'),
            options: BRAND_PRIORITY_TYPES,
          },
          valueType: 'select',
        },
        {
          dataIndex: 'countryFlag',
          title: '品牌国别',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'countryFlag'),
                message: '品牌国别不得为空',
              },
            ],
            extra: '请正确填写品牌注册地或者品牌总部所在地的国别',
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'countryFlag'),
            options: COUNTRY_FLAG_TYPES,
          },
          valueType: 'radio',
        },
        {
          valueType: 'dependency',
          name: ['countryFlag'],
          columns: ({ countryFlag }: { countryFlag?: number }) => {
            return countryFlag === countryMap.国际
              ? [
                  {
                    dataIndex: 'brandCountry',
                    title: '国家名称',
                    formItemProps: {
                      rules: [
                        {
                          required: categoryRequireHandler(
                            categoryIsArt,
                            categoryIsTicket,
                            'brandCountry',
                          ),
                          message: '国家名称不得为空',
                        },
                        {
                          validator: (rule, value, callback) => {
                            if (value.length > 1) {
                              callback(new Error('最多选择1个国家'));
                            }
                            callback();
                          },
                        },
                      ],
                    },
                    transform: (value) => {
                      const isOld = countryCodeList.find((country) => country.value === (Array.isArray(value) ? value[0] : value));
                      // hack逻辑，因为用户侧返回的境外国家不全，所以需要支持运营手动输入国家，这时带给后端的国家code写死为0，后端 王思思
                      if (Array.isArray(value)) {
                        return {
                          brandCountry: isOld ? value[0] : `0:${value[0]}`
                        };
                      }

                      return {
                        brandCountry: isOld ? value : `0:${value}`
                      }
                    },
                    fieldProps: {
                      disabled: formDisableHandler({ isReviewPassNot }, 'brandCountry'),
                      addonBefore: '国际-',
                      className: 'extra-item',
                      mode: 'tags',
                    },
                    renderFormItem: () => (
                      <ProFormSelect
                        showSearch
                        width="md"
                        request={async ({ keyWords }) => {
                          // 国际： 中国大陆、香港、澳门、台湾 禁用
                          const ChinaCode = ['86', '852', '853', '886'];
                          const USA = '美国';
                          let countryList = countryCodeList;
                          if (countryList?.length < 1) {
                            const data = await getCountryCodeList();
                            const change = data?.map((item) => {
                              return {
                                label: item?.name,
                                // 美国、加拿大code都为1
                                value:
                                  item?.name === USA
                                    ? `+${item?.code}:${item?.name}`
                                    : `${item?.code}:${item?.name}`,
                                disabled: ChinaCode.includes(item?.code),
                              };
                            });
                            countryList = change;
                            setCountryCodeList(change);
                          }

                          if (keyWords ?? true) {
                            return countryList;
                          }
                          const filterList = countryList?.filter(
                            (item) =>
                              item.label?.includes(keyWords) || item.value?.includes(keyWords),
                          );
                          return filterList;
                        }}
                        placeholder="请选择国家名称"
                      />
                    ),
                  },
                ]
              : [];
          },
        },
        {
          dataIndex: 'brandCountryFlagArr', // brandCountryFlag 接口请求处理
          title: '品牌中英文',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'brandCountryFlagArr',
                ),
                message: '品牌中英文不得为空',
              },
              {
                validator: (r: any, v: any) => {
                  if (isEmptyIgnore(r, v)) {
                    return Promise.resolve();
                  }
                  if (!validators.arrayRequired(v) && r.required) {
                    return Promise.reject('品牌中英文不得为空');
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
          fieldProps: {
            options: BRAND_COUNTRY_FLAG_TYPES,
            mode: 'multiple',
            placeholder: '请选择品牌中英文',
            disabled: formDisableHandler({ isReviewPassNot }, 'brandCountryFlagArr'),
            onChange: (selected) => {
              const { brandChineseName, brandEnglishName } =
                formRef?.current?.getFieldsValue() || {};
              const _datas = {
                brandChineseName: selected?.includes(BRAND_NAME.中文名) ? brandChineseName : '',
                brandEnglishName: selected?.includes(BRAND_NAME.英文名) ? brandEnglishName : '',
              };
              formRef?.current?.setFieldsValue(_datas);
            },
          },
          valueType: 'select',
        },
        {
          valueType: 'dependency',
          name: ['brandCountryFlagArr'],
          columns: ({ brandCountryFlagArr = [] }: { brandCountryFlagArr?: number[] }) => {
            if (brandCountryFlagArr.includes(0) && brandCountryFlagArr.includes(1)) {
              return [
                {
                  dataIndex: 'brandChineseName',
                  title: '品牌中文名',
                  formItemProps: {
                    rules: [
                      {
                        required: categoryRequireHandler(
                          categoryIsArt,
                          categoryIsTicket,
                          'brandChineseName',
                        ),
                        message: '品牌中文名不得为空',
                      },
                    ],
                  },
                  fieldProps: {
                    disabled: formDisableHandler({ isReviewPassNot }, 'brandChineseName'),
                  },
                },
                {
                  dataIndex: 'brandEnglishName',
                  title: '品牌英文名',
                  formItemProps: {
                    rules: [
                      {
                        required: categoryRequireHandler(
                          categoryIsArt,
                          categoryIsTicket,
                          'brandEnglishName',
                        ),
                        message: '品牌英文名不得为空',
                      },
                    ],
                  },
                  fieldProps: {
                    disabled: formDisableHandler({ isReviewPassNot }, 'brandEnglishName'),
                  },
                },
              ];
            }
            if (brandCountryFlagArr.includes(0)) {
              return [
                {
                  dataIndex: 'brandChineseName',
                  title: '品牌中文名',
                  formItemProps: {
                    rules: [
                      {
                        required: categoryRequireHandler(
                          categoryIsArt,
                          categoryIsTicket,
                          'brandChineseName',
                        ),
                        message: '品牌中文名不得为空',
                      },
                    ],
                  },
                  fieldProps: {
                    disabled: formDisableHandler({ isReviewPassNot }, 'brandChineseName'),
                  },
                },
              ];
            }
            if (brandCountryFlagArr.includes(1)) {
              return [
                {
                  dataIndex: 'brandEnglishName',
                  title: '品牌英文名',
                  formItemProps: {
                    rules: [
                      {
                        required: categoryRequireHandler(
                          categoryIsArt,
                          categoryIsTicket,
                          'brandEnglishName',
                        ),
                        message: '品牌英文名不得为空',
                      },
                    ],
                  },
                  fieldProps: {
                    disabled: formDisableHandler({ isReviewPassNot }, 'brandEnglishName'),
                  },
                },
              ];
            }
            return [];
          },
        },
        {
          dataIndex: 'brandAlias',
          title: '品牌别名',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandAlias'),
            placeholder: '请输入品牌别名',
          },
        },
        {
          dataIndex: 'brandStory',
          title: '品牌故事',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandStory'),
                message: '品牌故事不得为空',
              },
            ],
            extra: (
              <>
                品牌故事填写规范请参考{' '}
                <Button
                  type="link"
                  onClick={() => {
                    window.open('https://poizon.feishu.cn/docx/doxcnlq4HF1riGzlsTesXIOywdc');
                  }}
                >
                  品牌故事文字版审核规则
                </Button>{' '}
              </>
            ),
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandStory'),
            placeholder: '最多输入1000个字符',
            showCount: true,
            maxLength: 1000,
            rows: 5,
          },
          valueType: 'textarea',
        },
        {
          dataIndex: 'oneProductMultiMerchant',
          title: '是否一品多商',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'oneProductMultiMerchant',
                ),
                message: '是否一品多商不得为空',
              },
            ],
            extra:
              '申请为【一品一商】后将默认任何企业都不能申请入驻！系统将默认为【一品多商】进入品牌信息落库，若为【一品一商】，可在商家入驻后前往品牌信息关闭。',
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'oneProductMultiMerchant', true),
            options: ONE_PRODUCT_MULTI_MERCHANT_TYPES,
          },
          initialValue: commonYesNoMap.是,
          valueType: 'radio',
        },
        {
          dataIndex: 'brandType',
          title: '品牌类型',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandType'),
                message: '品牌类型不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandType'),
            options: BRAND_TYPES,
            placeholder: '请选择该品牌类型',
            onChange: (brandType: number) => {
              const isNot = brandType !== BRAND_TYPES[0].value;
              setIsNotNew(isNot);
            },
          },
          valueType: 'select',
        },
        {
          dataIndex: 'brandTag',
          title: '品牌标签',
          valueType: 'select',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandTag'),
            placeholder: '请选择品牌标签',
            options: BRAND_TAGS,
            allowClear: true,
          },
        },
        {
          dataIndex: 'mainCategoryId',
          title: '主营类目',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'mainCategoryId'),
                message: '主营类目不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler(
              { isReviewPassNot },
              'mainCategoryId',
              applyId && fromPage === 'applyReview',
            ),
            placeholder: '请选择主营类目',
            allowClear: true,
            labelInValue: true,
            onChange: (selected) => {
              const { label = '' } = selected || {};
              if (label === '艺术品') {
                setCategoryIsArt(true);
              } else {
                setCategoryIsArt(false);
              }
              if (label === '演出票务') {
                setCategoryIsTicket(true);
              } else {
                setCategoryIsTicket(false);
              }
              formRef?.current?.setFieldsValue({
                brandClasses: null,
                brandStyle: null,
              });
            },
          },
          valueType: 'select',
          dependencies: ['currentBrandId'],
          request: async ({ currentBrandId }) => {
            const parm: {
              pid: number;
              queryType: number;
              treeFlag: boolean;
              spuCountFlag: boolean;
            } = {
              pid: 0,
              queryType: 0,
              treeFlag: true,
              spuCountFlag: false,
            };
            if (currentBrandId && currentBrandId !== -1) {
              parm.brandId = currentBrandId;
              const resp: {
                id?: number;
                name?: string;
                level?: number;
                brandBoundTag?: boolean;
                status?: number;
              }[] = await getCategoryListByBrand(parm);
              const ret = resp.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                  brandBoundTag: item.brandBoundTag,
                  disabled: item.brandBoundTag === true,
                };
              });
              setCategoryOptions(ret);
              return ret;
            }
            const resp: Record<string, any>[] = await getCategoryList(parm);
            const ret = resp.map((item: Record<string, any>) => {
              return {
                label: item.name,
                value: item.id,
                brandBoundTag: item.brandBoundTag,
                disabled: item.brandBoundTag === true,
              };
            });
            setCategoryOptions(ret);
            return ret;
          },
        },
        {
          dataIndex: 'brandClasses',
          title: '大类',
          valueType: 'select',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandClasses'),
                message: '大类不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandClasses'),
            placeholder: '请选择大类',
            onChange: () => {
              formRef?.current?.setFieldsValue({
                brandStyle: null,
              });
            },
          },
          dependencies: ['mainCategoryId'],
          request: async ({ mainCategoryId }: { mainCategoryId: selectOptionsItem }) => {
            if (!mainCategoryId) return [];
            const resp: any = await getBrandClassesByLevel1Category({
              level1CategoryId: isObject(mainCategoryId) ? mainCategoryId.value : mainCategoryId,
            });
            return resp.map((item: any) => {
              return {
                label: item?.name,
                value: item?.name,
              };
            });
          },
        },
        {
          dataIndex: 'brandStyle',
          title: '风格线',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandStyle'),
                message: '风格线不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'brandStyle'),
            placeholder: '请选择风格线',
          },
          dependencies: ['mainCategoryId', 'brandClasses'],
          request: async ({
            mainCategoryId,
            brandClasses,
          }: {
            mainCategoryId: selectOptionsItem;
            brandClasses: string;
          }) => {
            if (!mainCategoryId || !brandClasses) {
              return [];
            }
            let requestBrandClasses = brandClasses;
            if (isNaN(requestBrandClasses)) {
              const resp: any = await getBrandClassesByLevel1Category({
                level1CategoryId: isObject(mainCategoryId) ? mainCategoryId.value : mainCategoryId,
              });
              const [retObj] = resp.filter((d: any) => d.name === brandClasses);
              requestBrandClasses = retObj.code;
            }
            const resp: any = await getBrandStyleByClass({
              level1CategoryId: isObject(mainCategoryId) ? mainCategoryId.value : mainCategoryId,
              brandClassCode: requestBrandClasses,
            });
            return resp.map((item: any) => {
              return {
                label: item?.name,
                value: item?.name,
              };
            });
          },
          valueType: 'select',
        },
        {
          dataIndex: 'brandLogo',
          title: '品牌LOGO',
          formItemProps: {
            valuePropName: 'fileList',
            extra:
              '尺寸最小400*400，格式建议：PNG（推荐）、JPG、JPEG，建议使用白色底色，深色文字或图形logo。非白色背景logo，避免超出被裁切，导致展示不全',
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'brandLogo'),
                validator: (r: any, v: Record<string, any>[]) => {
                  if (!v || v.length <= 0) {
                    return Promise.reject('品牌LOGO不能为空');
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
          renderFormItem: () => {
            return (
              <ProUpload
                bizCode="merchant_entry"
                accept=".jpg,.png,.jpeg,.bmp"
                size={5}
                listType="picture-card"
                scene={UploadScene.crm}
                disabled={formDisableHandler({ isReviewPassNot }, 'brandLogo')}
                maxCount={1}
                imageRatio="1:1"
                imageSizeRatio="400:400"
              />
            );
          },
        },
        {
          dataIndex: 'trademarkList',
          title: '中文商标注册证',
          formItemProps: {
            valuePropName: 'fileList',
            extra: '中文商标注册证或英文商标注册证至少上传一项，格式限制为10M以内的JPG/PNG格式文件',
            rules: [
              {
                required: isTrademarkList,
                validator: (r: any, v: Record<string, any>[]) => {
                  setFileLists({
                    ...fileLists,
                    zh: v,
                  });
                  if (!v || v.length <= 0) {
                    // 中文商标注册证删除，英文商标注册证有无上传
                    if (trademark?.zh && !trademark?.en) {
                      if (fileLists?.en?.length) {
                        // 英文商标注册证已有上传
                        setTrademark({
                          zh: false,
                          en: true,
                        });
                      } else {
                        // 英文商标注册证没有有上传
                        setTrademark({
                          ...trademark,
                          en: true,
                        });
                      }
                    } else if (trademark?.zh && trademark?.en) {
                      if (!fileLists?.en?.length) {
                        setTrademark({
                          zh: true,
                          en: true,
                        });
                      } else {
                        // 英文注册证已上传
                        setTrademark({
                          zh: false,
                          en: true,
                        });
                      }
                    }
                    // 已上传英文，删除中文
                    if (trademark?.zh && trademark?.en && fileLists?.en?.length) {
                      return Promise.resolve();
                    }

                    if (!trademark?.zh) {
                      return Promise.resolve();
                    }
                    return Promise.reject('中文/英文商标注册证不能为空');
                  }
                  // 英文商标注册证已经上传
                  if (fileLists?.en?.length) {
                    if (!trademark?.zh && trademark?.en) {
                      setTrademark({
                        zh: true,
                        en: true,
                      });
                    }
                  } else if (trademark?.zh && trademark?.en) {
                    setTrademark({
                      ...trademark,
                      en: false,
                    });
                  }

                  return Promise.resolve();
                },
              },
            ],
          },
          renderFormItem: () => {
            return (
              <ProUpload
                bizCode="merchant_entry"
                accept=".jpg,.png"
                size={10}
                listType="picture-card"
                scene={UploadScene.crm}
                maxCount={3}
              />
            );
          },
        },
        {
          dataIndex: 'foreignTrademarkList',
          title: '英文商标注册证',
          formItemProps: {
            valuePropName: 'fileList',
            extra: '中文商标注册证或英文商标注册证至少上传一项，格式限制为10M以内的JPG/PNG格式文件',
            rules: [
              {
                required: isForeignTrademarkList,
                validator: (r: any, v: Record<string, any>[]) => {
                  setFileLists({
                    ...fileLists,
                    en: v,
                  });
                  if (!v || v.length <= 0) {
                    // 英文删除，中文有无上传
                    if (!trademark?.zh && trademark?.en) {
                      if (fileLists?.zh?.length) {
                        setTrademark({
                          en: false,
                          zh: true,
                        });
                      } else {
                        setTrademark({
                          ...trademark,
                          zh: true,
                        });
                      }
                    } else if (trademark?.zh && trademark?.en) {
                      if (!fileLists.zh?.length) {
                        setTrademark({
                          en: true,
                          zh: true,
                        });
                      } else {
                        // 中文注册证已上传
                        setTrademark({
                          en: false,
                          zh: true,
                        });
                      }
                    }

                    // 已上传中文，删除英文
                    if (trademark.zh && trademark?.en && fileLists.zh?.length) {
                      return Promise.resolve();
                    }
                    if (!trademark?.en) {
                      return Promise.resolve();
                    }

                    return Promise.reject('英文/中文商标注册证不能为空');
                  }
                  // 英文商标注册证已经上传
                  if (fileLists?.zh?.length) {
                    if (trademark?.zh && !trademark?.en) {
                      setTrademark({
                        zh: true,
                        en: true,
                      });
                    }
                  } else if (trademark?.zh && trademark?.en) {
                    setTrademark({
                      ...trademark,
                      zh: false,
                    });
                  }

                  return Promise.resolve();
                },
              },
            ],
          },
          renderFormItem: () => {
            return (
              <ProUpload
                bizCode="merchant_entry"
                accept=".jpg,.png"
                size={10}
                listType="picture-card"
                scene={UploadScene.crm}
                maxCount={3}
              />
            );
          },
        },
        {
          dataIndex: 'registerStatus',
          title: '中文商标注册状态',
          formItemProps: {
            rules: [
              {
                required: isTrademarkList,
                message: '中文商标注册状态不得为空',
              },
            ],
            extra: linkage
              ? '请在商标受理完成后，及时在品牌信息补充提交商标注册证（R标）及其专用权期限'
              : '',
          },
          fieldProps: {
            placeholder: '请选择中文商标注册状态',
            options: REG_STATUS,
            onClear: () => {
              clearSelectInput('registerStatus');
            },
          },
          valueType: 'select',
        },
        {
          valueType: 'dependency',
          name: ['registerStatus', 'countryFlag'],
          columns: ({ registerStatus, countryFlag }) => {
            setLinkage(false);
            if (registerStatus === regStatusMap.R标) {
              return [
                {
                  dataIndex: 'trademarkTime',
                  title: '中文商标专用权期限',
                  formItemProps: {
                    rules: [
                      {
                        required: isTrademarkList,
                        message: '中文商标专用权期限不得为空',
                      },
                    ],
                  },
                  renderFormItem: () => {
                    return (
                      <>
                        <DatePicker
                          value={dates?.[0]}
                          disabledDate={(current) => {
                            return current && current > dayjs().endOf('day');
                          }}
                          onChange={(val) => {
                            setDates([val, dates?.[1] ? dates?.[1] : null]);
                          }}
                        />{' '}
                        ~{' '}
                        <DatePicker
                          value={dates?.[1]}
                          disabledDate={(current) => {
                            return current && current < dayjs().endOf('day');
                          }}
                          onChange={(val) => {
                            setDates([dates?.[0] ? dates?.[0] : null, val]);
                          }}
                        />
                      </>
                    );
                  },
                },
              ];
            }
            if (registerStatus === regStatusMap.未注册) {
              return [
                {
                  dataIndex: 'commitmentProofList',
                  title: '中文承诺函证明/特批截图',
                  formItemProps: {
                    valuePropName: 'fileList',
                    extra: (
                      <>
                        <span>
                          请上传商家签署的承诺函或飞书流企业商家资质特批入驻申请审批通过的截图，限制为不超过10M的jpg/png格式文件
                        </span>
                        <Button
                          type="link"
                          onClick={() => {
                            window.open(
                              'https://h5static.dewucdn.com/node-common/38f98f67-707c-2284-8360-ebe19bacc3ad.docx',
                            );
                          }}
                        >
                          <DownloadLine />
                          下载模版
                        </Button>
                      </>
                    ),
                    rules: [
                      {
                        required: isTrademarkList,
                        validator: (r: any, v: any) => {
                          if (!v || v.length <= 0) {
                            if (!isTrademarkList) {
                              return Promise.resolve();
                            }
                            return Promise.reject('中文承诺函证明/特批截图不能为空');
                          }
                          return Promise.resolve();
                        },
                      },
                    ],
                  },
                  renderFormItem: () => {
                    return (
                      <ProUpload
                        bizCode="merchant_entry"
                        accept=".jpg,.png"
                        size={10}
                        listType="picture-card"
                        scene={UploadScene.crm}
                        maxCount={2}
                      />
                    );
                  },
                },
              ];
            }
            if (registerStatus === regStatusMap.TM标) {
              if (countryFlag === countryMap.国际) {
                return [
                  {
                    dataIndex: 'relationshipProofList',
                    title: '中文品牌方关系证明',
                    formItemProps: {
                      valuePropName: 'fileList',
                      extra:
                        '请在商标受理完成后，及时在品牌信息补充提交商标注册证（R标）及其专用权期限',
                      rules: [
                        {
                          required: isTrademarkList,
                          validator: (r: any, v: any) => {
                            if (!v || v.length <= 0) {
                              if (!isTrademarkList) {
                                return Promise.resolve();
                              }
                              return Promise.reject('中文品牌方关系证明不能为空');
                            }
                            return Promise.resolve();
                          },
                        },
                      ],
                    },
                    renderFormItem: () => {
                      return (
                        <ProUpload
                          bizCode="merchant_entry"
                          accept=".jpg,.png"
                          size={10}
                          listType="picture-card"
                          scene={UploadScene.crm}
                          maxCount={2}
                        />
                      );
                    },
                  },
                ];
              }
              if (countryFlag === countryMap.国内) {
                setLinkage(true);
              }
            }
            return [];
          },
        },
        {
          dataIndex: 'foreignRegisterStatus',
          title: '英文商标注册状态',
          formItemProps: {
            rules: [
              {
                required: isForeignTrademarkList,
                message: '英文商标注册状态不得为空',
              },
            ],
            extra: foreignLinkage
              ? '请在商标受理完成后，及时在品牌信息补充提交商标注册证（R标）及其专用权期限'
              : '',
          },
          fieldProps: {
            placeholder: '请选择英文商标注册状态',
            options: REG_STATUS,
            onClear: () => {
              clearSelectInput('foreignRegisterStatus');
            },
          },
          valueType: 'select',
        },
        {
          valueType: 'dependency',
          name: ['foreignRegisterStatus', 'countryFlag'],
          columns: ({ foreignRegisterStatus, countryFlag }) => {
            setForeignLinkage(false);
            if (foreignRegisterStatus === regStatusMap.R标) {
              return [
                {
                  dataIndex: 'foreignTrademarkTime',
                  title: '英文商标专用权期限',
                  formItemProps: {
                    rules: [
                      {
                        required: isForeignTrademarkList,
                        message: '英文商标专用权期限不得为空',
                      },
                    ],
                  },
                  renderFormItem: () => {
                    return (
                      <>
                        <DatePicker
                          value={foreignDates?.[0]}
                          disabledDate={(current) => {
                            return current && current > dayjs().endOf('day');
                          }}
                          onChange={(val) => {
                            setForeignDates([val, foreignDates?.[1] ? foreignDates?.[1] : null]);
                          }}
                        />{' '}
                        ~{' '}
                        <DatePicker
                          value={foreignDates?.[1]}
                          disabledDate={(current) => {
                            return current && current < dayjs().endOf('day');
                          }}
                          onChange={(val) => {
                            setForeignDates([foreignDates?.[0] ? foreignDates?.[0] : null, val]);
                          }}
                        />
                      </>
                    );
                  },
                },
              ];
            }
            if (foreignRegisterStatus === regStatusMap.未注册) {
              return [
                {
                  dataIndex: 'foreignCommitmentProofList',
                  title: '英文承诺函证明/特批截图',
                  formItemProps: {
                    valuePropName: 'fileList',
                    extra: (
                      <>
                        <span>
                          请上传商家签署的承诺函或飞书流企业商家资质特批入驻申请审批通过的截图，限制为不超过10M的jpg/png格式文件
                        </span>
                        <Button
                          type="link"
                          onClick={() => {
                            window.open(
                              'https://h5static.dewucdn.com/node-common/38f98f67-707c-2284-8360-ebe19bacc3ad.docx',
                            );
                          }}
                        >
                          <DownloadLine />
                          下载模版
                        </Button>
                      </>
                    ),
                    rules: [
                      {
                        required: isForeignTrademarkList,
                        validator: (r: any, v: Record<string, any>[]) => {
                          if (!v || v.length <= 0) {
                            if (!isForeignTrademarkList) {
                              return Promise.resolve();
                            }
                            return Promise.reject('英文承诺函证明/特批截图不能为空');
                          }
                          return Promise.resolve();
                        },
                      },
                    ],
                  },
                  renderFormItem: () => {
                    return (
                      <ProUpload
                        bizCode="merchant_entry"
                        accept=".jpg,.png"
                        size={10}
                        listType="picture-card"
                        scene={UploadScene.crm}
                        maxCount={2}
                      />
                    );
                  },
                },
              ];
            }
            if (foreignRegisterStatus === regStatusMap.TM标) {
              if (countryFlag === countryMap.国际) {
                return [
                  {
                    dataIndex: 'foreignRelationshipProofList',
                    title: '英文品牌方关系证明',
                    formItemProps: {
                      valuePropName: 'fileList',
                      extra:
                        '请在商标受理完成后，及时在品牌信息补充提交商标注册证（R标）及其专用权期限',
                      rules: [
                        {
                          required: isForeignTrademarkList,
                          validator: (r: any, v: Record<string, any>[]) => {
                            if (!v || v.length <= 0) {
                              if (!isForeignTrademarkList) {
                                return Promise.resolve();
                              }
                              return Promise.reject('英文品牌方关系证明不能为空');
                            }
                            return Promise.resolve();
                          },
                        },
                      ],
                    },
                    renderFormItem: () => {
                      return (
                        <ProUpload
                          bizCode="merchant_entry"
                          accept=".jpg,.png"
                          size={10}
                          listType="picture-card"
                          scene={UploadScene.crm}
                          maxCount={2}
                        />
                      );
                    },
                  },
                ];
              }
              if (countryFlag === countryMap.国内) {
                setForeignLinkage(true);
              }
            }
            return [];
          },
        },
        {
          dataIndex: 'supplyMode',
          title: '供给模式',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'supplyMode'),
                message: '供给模式不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'supplyMode'),
            placeholder: '请选择供给模式',
            options: SUPPLY_MODES,
            onChange: (value: number) => {
              // C 端供给、供给未明确
              if (value === supplyModeMap['C 端供给'] || value === supplyModeMap.供给未明确) {
                setEnterpriseNameRequired(false);
              } else {
                setEnterpriseNameRequired(true);
              }
            },
          },
          valueType: 'select',
        },
        {
          dataIndex: 'enterpriseName',
          title: '企业全称',
          formItemProps: {
            extra: '企业名称务必填写标准',
            rules: [
              {
                required:
                  categoryRequireHandler(categoryIsArt, categoryIsTicket, 'enterpriseName') &&
                  enterpriseNameRequired,
                message: '企业全称不得为空',
              },
              {
                validator: (r: any, v: any) => {
                  if (isEmptyIgnore(r, v)) {
                    return Promise.resolve();
                  }
                  if (!validators.required(v) && r.required) {
                    return Promise.reject('企业全称不得为空');
                  }
                  if (!validators.string_length(v, [null, 100])) {
                    return Promise.reject('企业全称最多100个字符');
                  }
                  return Promise.resolve();
                },
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler(
              { isReviewPassNot },
              'enterpriseName',
              applyId && fromPage === 'applyReview',
            ),
            placeholder: '请输入企业名称',
            maxLength: 100,
          },
        },
        {
          dataIndex: 'price',
          title: '件单价',
          width: '100%',
          formItemProps: {
            extra: '平均件单价',
            rules: [
              {
                required: categoryRequireHandler(categoryIsArt, categoryIsTicket, 'price'),
                message: '件单价不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredFloatNumber(r, v, '件单价', true, true, 2),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'price'),
            addonAfter: '元',
            className: 'extra-item',
            placeholder: '请输入该品牌的平均件单价',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'isNewBrand',
          title: (
            <>
              是否为纯新品牌
              <Tooltip
                placement="bottom"
                title={
                  <div className="popoverStyle">
                    <p>1、淘宝/天猫无店铺；</p>
                    <p>2、淘宝/天猫新开店无销售；</p>
                    <p>3、线上全年体量小于400万；</p>
                    <p>4、纯线下品牌；</p>
                    <p>5、无任何销售渠道完全新品牌，填写范围为是/否。</p>
                  </div>
                }
                overlayStyle={{ minWidth: '340px' }}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </>
          ),
          formItemProps: {
            rules: [
              {
                required: false,
                message: '是否为纯新品牌不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'isNewBrand'),
            options: IS_OR_NOT,
          },
          valueType: 'radio',
        },
        {
          dataIndex: 'qualificationType',
          title: '资质类型',
          formItemProps: {
            rules: [
              {
                required: false,
                message: '资质类型不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'qualificationType'),
            placeholder: '请选择资质类型',
            options: QUALIFICATION_TYPE,
            allowClear: true,
            onClear: () => {
              clearSelectInput('qualificationType');
            },
          },
          valueType: 'select',
        },
        // 删除 isSupplyClear 供给是否确定
        {
          dataIndex: 'dailyPriceIndex',
          width: '100%',
          title: (
            <>
              日销价格指数
              <Tooltip
                placement="bottom"
                title={
                  <div className="popoverStyle">
                    <p>日常销售时价值指数</p>
                    <p>
                      基于天猫旗舰店的价格指数=天猫旗舰店价格/得物预计销售价格”，没有天猫旗舰店的品牌填写基于淘宝/其他平台/线下渠道的价格指数即可。
                    </p>
                  </div>
                }
                overlayStyle={{ minWidth: '340px' }}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </>
          ),
          formItemProps: {
            rules: [
              {
                required: false,
                message: '日销价格指数不得为空',
              },
              {
                validator: (r: any, v: any) => {
                  if (isEmptyIgnore(r, v)) {
                    return Promise.resolve();
                  }
                  if ((v ?? '') === '' && r.required) {
                    return Promise.reject('日销价格指数不得为空');
                  }
                  return commonValidateFloatNumber(r, v, '日销价格指数', true, true, [0, 10000], 2);
                },
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'dailyPriceIndex'),
            placeholder: '请输入该品牌外网/得物的日常销售价格指数',
            addonAfter: '%',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'pricePromotionIndex',
          width: '100%',
          title: (
            <>
              A/S级促销价格指数
              <Tooltip
                placement="bottom"
                title={
                  <div className="popoverStyle">
                    <p>A级/S级促销时价格指数</p>
                    <p>
                      基于天猫旗舰店的价格指数=天猫旗舰店价格/得物预计销售价格”，没有天猫旗舰店的品牌填写基于淘宝/其他平台/线下渠道的价格指数即可。
                    </p>
                  </div>
                }
                overlayStyle={{ minWidth: '340px' }}
              >
                <QuestionCircleOutlined />
              </Tooltip>
            </>
          ),
          formItemProps: {
            rules: [
              {
                required: false,
                message: 'A/S级促销价格指数不得为空',
              },
              {
                validator: (r: any, v: any) => {
                  if (isEmptyIgnore(r, v)) {
                    return Promise.resolve();
                  }
                  if ((v ?? '') === '' && r.required) {
                    return Promise.reject('A/S级促销价格指数不得为空');
                  }
                  return commonValidateFloatNumber(
                    r,
                    v,
                    'A/S级促销价格指数',
                    true,
                    true,
                    [0, 10000],
                    2,
                  );
                },
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'pricePromotionIndex'),
            addonAfter: '%',
            placeholder: '请输入该品牌外网/得物的A/S级促销价格指数',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'estimatePriceArriveTime',
          title: '预计到达规定价格指数时间',
          formItemProps: {
            rules: [
              {
                required: false,
                message: '预计到达规定价格指数时间不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'estimatePriceArriveTime'),
            placeholder: '请选择到达规定价格指数时间',
            options: ESTIMATED_TIME,
            onClear: () => {
              clearSelectInput('estimatePriceArriveTime');
            },
          },
          valueType: 'select',
        },
        {
          dataIndex: 'spuNum',
          title: '计划平均每月上新SPU数',
          width: '100%',
          formItemProps: {
            rules: [
              {
                required: false,
                message: '计划平均每月上新SPU数不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredPositiveNumber(r, v, '计划平均每月上新SPU数'),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'spuNum'),
            placeholder: '请输入该品牌计划平均每月上新SPU数',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'monthlySales',
          title: '预计贡献月销售额',
          width: '100%',
          formItemProps: {
            rules: [
              {
                required: false,
                message: '预计贡献月销售额不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredFloatNumber(r, v, '预计贡献月销售额', true, true, 4),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'monthlySales'),
            addonAfter: '元',
            placeholder: '请输入预计贡献月销售额',
            min: 0,
            moneySymbol: false,
            precision: 4,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'estimateSaleArriveTime',
          title: '达到预计销售额需要时间',
          formItemProps: {
            rules: [
              {
                required: false,
                message: '达到预计销售额需要时间不得为空',
              },
            ],
          },
          valueType: 'select',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'estimateSaleArriveTime'),
            placeholder: '请选择时间',
            options: ESTIMATED_TIME,
            onClear: () => {
              clearSelectInput('estimateSaleArriveTime');
            },
          },
        },
        {
          dataIndex: 'serviceRate',
          title: '费率',
          width: '100%',
          formItemProps: {
            extra: '填写目前费率收费比率，技术服务费，不含 1% 提现手续费，最多支持填写 10 个',
            rules: [
              {
                required: false,
                message: '请输入该品牌的技术服务费率',
              },
              {
                validator: (r: any, v: any) => {
                  if (isEmptyIgnore(r, v)) {
                    return Promise.resolve();
                  }
                  if (!v && r.required) {
                    return Promise.reject('请输入该品牌的技术服务费率');
                  }
                  const spv = String(v).split('，');
                  if (spv.length > 10) {
                    return Promise.reject('最多支持填写 10 个费率');
                  }
                  return Promise.all(
                    spv.map((spvItem: any) =>
                      commonValidatePositiveNumber(r, Number(spvItem), 'a'),
                    ),
                  )
                    .then(() => Promise.resolve())
                    .catch((e) => {
                      return Promise.reject('费率格式只支持正整数！多个费率请用中文逗号分隔！');
                    });
                  // return Promise.resolve()
                },
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'serviceRate'),
            addonAfter: '%',
            placeholder: '请输入该品牌的技术服务费率，不含提现手续费',
          },
        },
        {
          dataIndex: 'fixedCost',
          title: '收费建议',
          width: '100%',
          formItemProps: {
            extra: '查验鉴别包装等固定费用的收取金额',
            rules: [
              {
                required: false,
                message: '收费建议不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredFloatNumber(r, v, '收费建议', true, true, 2),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'fixedCost'),
            placeholder: '请输入该品牌的固定费用',
            addonAfter: '元',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        // 删除 freeFreightGoodsPercent 包邮商品比例
        {
          dataIndex: 'taoDataGmv',
          title: '淘数据GMV',
          width: '100%',
          formItemProps: {
            rules: [
              {
                validator: (r: any, v: any) =>
                  commonValidateFloatNumber(r, v, '淘数据GMV', true, true, [0, 10000], 4),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'taoDataGmv'),
            placeholder: '请输入淘数据GMV',
            addonAfter: '亿',
            min: 0,
            moneySymbol: false,
            precision: 4,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'isLuxury',
          title: '是否为奢品',
          formItemProps: {
            rules: [
              {
                required: false,
                message: '是否为奢品不得为空',
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'isLuxury'),
            options: IS_OR_NOT,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const isQuired = (e.target as unknown as IEventTarget).value === 1;
              setIsLuxry(isQuired);
            },
          },
          valueType: 'radio',
        },
        {
          dataIndex: 'luxuryStyle',
          title: '奢品风格',
          formItemProps: {
            rules: [{ required: false, message: '奢品风格不得为空' }],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'luxuryStyle'),
            placeholder: '请选择奢品风格',
            options: LUXURY_STYLES,
            onClear: () => {
              clearSelectInput('luxuryStyle');
            },
          },
          valueType: 'select',
        },
        {
          dataIndex: 'luxuryReason',
          title: '符合奢品的具体原因',
          formItemProps: {
            rules: [{ required: false, message: '符合奢品的具体原因不得为空' }],
          },
          renderFormItem: (_, a, form) => {
            const formProps = {
              placeholder: '最多输入500个字符',
              showCount: true,
              maxLength: 500,
              rows: 4,
            };
            const val = form.getFieldValue('luxuryReason') || '';

            return (
              <div style={{ display: 'flex', width: '100%' }}>
                <TextArea
                  disabled={formDisableHandler({ isReviewPassNot }, 'luxuryReason')}
                  value={val}
                  style={{ flex: 1 }}
                  {...formProps}
                />
                <Tooltip
                  placement="bottom"
                  color="#fff"
                  title={
                    <div className="tooltipStyle">
                      <p>填写举例</p>
                      <div>
                        <p>重奢</p>
                        <span>
                          重奢大型上市时尚集团品牌，大型上市时尚集团旗下品牌，四大时装周秀场或者日本东京秀场常客。主副线同级。主打品类均价5000+，全品类品牌，系列主牌为重奢，副牌为轻奢。（化妆品均价500+，手表均价30000+）；
                        </span>
                      </div>
                      <div>
                        <p>轻奢</p>
                        <span>
                          型上市时尚集团品牌，主打品类均价2000+，全品类品牌，系列主牌为轻奢，副牌为街头/休闲。（配件：知名时尚或珠宝品牌，零售客单价区间在300-2000区间）轻奢（手表）：重奢品牌的唯一第二维度标签，单指重奢品牌在手表品类的权重变更。；
                        </span>
                      </div>
                      <div>
                        <p>美妆奢品</p>
                        <span>
                          大型上市集团品牌；丝芙兰陈列位置奢品区；线下奢品区设立专柜（日本银座/AFC/IN77/K11/SKP）；天猫奢品频道已有品牌；主打品类均价
                          {'>'}500；（满足之一即可提报）。
                        </span>
                      </div>
                    </div>
                  }
                  overlayStyle={{ minWidth: '400px' }}
                >
                  <span style={{ color: '#01c2c3' }}>示例</span>
                </Tooltip>
              </div>
            );
          },
        },
      ],
      [
        {
          title: '',
          valueType: 'group',
          dataIndex: 'saleGroup',
          colProps: {
            className: 'sale-group-infos',
          },
          fieldProps: {
            title: '销售情况',
          },
          columns: [
            {
              dataIndex: 'offlineStoreAmount',
              title: '国内外官方线下店铺数量',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    validator: (r: any, v: any) => {
                      return commonValidateRequiredPositiveNumber(r, v, '国内外官方线下店铺数量');
                    },
                  },
                ],
              },
              fieldProps: {
                disabled: formDisableHandler({ isReviewPassNot }, 'offlineStoreAmount'),
                placeholder: '请输入国内外官方线下店铺数量',
                addonAfter: '个',
                min: 0,
                moneySymbol: false,
              },
              valueType: 'money',
            },
            {
              dataIndex: 'annualSaleScale',
              title: '线上线下销售规模（年度）',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    validator: (r: any, v: any) => {
                      return commonValidateRequiredFloatNumber(
                        r,
                        v,
                        '线上线下销售规模（年度）',
                        true,
                        true,
                        4,
                      );
                    },
                  },
                ],
              },
              fieldProps: {
                disabled: formDisableHandler({ isReviewPassNot }, 'annualSaleScale'),
                placeholder: '请输入线上线下销售规模（年度）',
                addonAfter: '亿',
                min: 0,
                moneySymbol: false,
                precision: 4,
              },
              valueType: 'money',
            },
            {
              dataIndex: 'monthlySaleAmount',
              title: '淘宝（含天猫）月销量',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    validator: (r: any, v: any) =>
                      commonValidateRequiredPositiveNumber(r, v, '淘宝（含天猫）月销量'),
                  },
                ],
              },
              fieldProps: {
                disabled: formDisableHandler({ isReviewPassNot }, 'monthlySaleAmount'),
                placeholder: '请输入淘宝（含天猫）月销量',
                addonAfter: '件',
                min: 0,
                moneySymbol: false,
              },
              valueType: 'money',
            },
            {
              dataIndex: 'tianMaoFans',
              title: '淘宝天猫粉丝数',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    validator: (r: any, v: any) => {
                      return commonValidateRequiredFloatNumber(
                        r,
                        v,
                        '淘宝天猫粉丝数',
                        true,
                        true,
                        4,
                      );
                    },
                  },
                ],
              },
              fieldProps: {
                disabled: formDisableHandler({ isReviewPassNot }, 'tianMaoFans'),
                placeholder: '请输入淘宝天猫粉丝数',
                addonAfter: '万',
                min: 0,
                moneySymbol: false,
                precision: 4,
              },
              valueType: 'money',
            },
          ],
        },
        {
          title: '',
          valueType: 'formList',
          dataIndex: 'internetSaleInfos',
          fieldProps: (form) => {
            return {
              copyIconProps: false,
              creatorButtonProps: false,
              deleteIconProps: false,
              itemContainerRender: (doms: any, { index }: any) => {
                return (
                  <>
                    <ProCard
                      title={`店铺渠道${index + 1}`}
                      direction="column"
                      style={{ marginBlockStart: 16, marginBlockEnd: 20 }}
                      bordered
                      gutter={[8, 0]}
                    >
                      {doms}
                      {index !== 0 ? (
                        <div
                          className="deleteIcon"
                          onClick={() => {
                            actionRef.current?.remove?.(index);
                            handleStoreSaleInfos(form);
                          }}
                        >
                          <DeleteOutlined />
                        </div>
                      ) : null}
                    </ProCard>
                    {(form.getFieldValue('internetSaleInfos') || []).length === index + 1 ? (
                      <Button
                        className="btn"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          actionRef.current?.add?.();
                        }}
                      >
                        新增店铺渠道
                      </Button>
                    ) : null}
                  </>
                );
              },
              actionRef,
            };
          },
          rowProps: {
            className: 'internet-sale-infos',
          },
          columns: [
            {
              dataIndex: 'storeChannel',
              title: '店铺渠道',
              valueType: 'select',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    required: isNotNew,
                    message: '店铺渠道不得为空',
                  },
                ],
              },
              fieldProps: (form) => {
                return {
                  disabled: formDisableHandler({ isReviewPassNot }, 'storeChannel'),
                  placeholder: '请选择店铺渠道',
                  allowClear: false,
                  options: storeChannelOptions,
                  onChange: () => {
                    handleStoreSaleInfos(form);
                  },
                };
              },
            },
            {
              dataIndex: 'annualSales',
              title: '年销售额',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    required: isNotNew,
                    message: '年销售额不得为空',
                  },
                  {
                    validator: (r: any, v: any) => annualSalesValidator(r, v, isNotNew),
                  },
                ],
              },
              fieldProps: {
                disabled: formDisableHandler({ isReviewPassNot }, 'annualSales'),
                placeholder: '请输入该品牌外网的店铺年销售额',
                addonAfter: '亿',
                min: 0,
                moneySymbol: false,
                precision: 4,
              },
              valueType: 'money',
            },
            {
              valueType: 'dependency',
              name: ['storeChannel'],
              columns: ({ storeChannel }: { storeChannel?: string }) => {
                return [
                  {
                    dataIndex: 'storeUrl',
                    title: '外网链接',
                    width: '100%',
                    formItemProps: {
                      rules: [
                        {
                          required: isNotNew && storeChannel !== '线下门店',
                          message: '外网链接不得为空',
                        },
                        {
                          validator: (r: any, v: any) => storeUrlValidator(r, v, false, isNotNew),
                        },
                      ],
                    },
                    fieldProps: {
                      disabled: formDisableHandler({ isReviewPassNot }, 'storeUrl'),
                      placeholder: '请输入该品牌的店铺链接',
                    },
                  },
                ];
              },
            },
            {
              dataIndex: 'fansNum',
              title: '粉丝数',
              width: '100%',
              formItemProps: {
                rules: [
                  {
                    validator: (r: any, v: any) =>
                      commonValidateFloatNumber(r, v, '粉丝数', true, true, [], 4),
                  },
                ],
              },
              fieldProps: {
                disabled: formDisableHandler({ isReviewPassNot }, 'fansNum'),
                placeholder: '请输入该品牌外网的店铺粉丝数',
                addonAfter: '万',
                min: 0,
                moneySymbol: false,
                precision: 4,
              },
              valueType: 'money',
            },
          ],
        },
      ],
      [
        {
          dataIndex: 'communitySeedingNum',
          title: '社区每月Seeding数量',
          width: '100%',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'communitySeedingNum',
                ),
                message: '社区每月Seeding数量不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredPositiveNumber(r, v, '社区每月Seeding数量'),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'communitySeedingNum'),
            placeholder: '请输入该品牌社区每月Seeding数量',
            addonAfter: '篇',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'layGoodsPercent',
          title: '可在穿搭/晒单/开箱精选铺设的商品比例',
          width: '100%',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'layGoodsPercent',
                ),
                message: '可在穿搭/晒单/开箱精选一周内铺设的商品比例不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidatePrecent(r, v, '可在穿搭/晒单/开箱精选一周内铺设的商品比例'),
              },
            ],
            extra: '预计在穿搭/晒单/开箱精选铺设的商品占总上架商品比例',
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'layGoodsPercent'),
            placeholder: '请输入该品牌铺设的商品比例',
            addonAfter: '%',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'isSocialMediaDiversion',
          title: '是否可在社媒每月导流',
          width: '100%',
          formItemProps: {
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'isSocialMediaDiversion',
                ),
                message: '是否可在社媒每月导流不得为空',
              },
            ],
          },
          valueType: 'radio',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'isSocialMediaDiversion'),
            options: IS_OR_NOT,
          },
        },
        // 删除 insideBudgetAmount 每月站内社区投入预算金额
        {
          dataIndex: 'insideBudgetAmountPercent',
          title: '每月站内社区投入预算占比',
          width: '100%',
          formItemProps: {
            extra: '每月投入到得物平台内容（站内社区）上的预算占GMV百分比',
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'insideBudgetAmountPercent',
                ),
                message: '每月站内社区投入预算占比不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidatePrecent(r, v, '每月站内社区投入预算占比'),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'insideBudgetAmountPercent'),
            placeholder: '请输入该品牌每月站内社区投入预算占比',
            addonAfter: '%',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'gravityBudgetAmount',
          title: '每月引力平台投入预算金额',
          width: '100%',
          formItemProps: {
            extra: '每月在引力平台投入到得物平台内容（站内社区）上的预算。',
            rules: [
              {
                required: categoryRequireHandler(
                  categoryIsArt,
                  categoryIsTicket,
                  'gravityBudgetAmount',
                ),
                message: '每月引力平台投入预算金额不得为空',
              },
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredFloatNumber(
                    r,
                    v,
                    '每月引力平台投入预算金额',
                    true,
                    true,
                    2,
                  ),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'gravityBudgetAmount'),
            placeholder: '请输入该品牌每月引力平台投入预算金额',
            addonAfter: '元',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'outsideBudgetAmount',
          title: '每月外投预算金额',
          width: '100%',
          formItemProps: {
            rules: [
              {
                validator: (r: any, v: any) =>
                  commonValidateFloatNumber(r, v, '每月外投预算金额', true, true, [], 2),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'outsideBudgetAmount'),
            placeholder: '请输入该品牌每月外投预算金额',
            addonAfter: '元',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'outsideBudgetAmountPercent',
          title: '每月外投预算占比',
          width: '100%',
          formItemProps: {
            extra: '每月投入到得物平台内容（站内社区）上的预算占GMV百分比',
            rules: [
              {
                validator: (r: any, v: any) =>
                  commonValidatePrecentNotRequired(r, v, '每月站内社区投入预算占比'),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'outsideBudgetAmountPercent'),
            placeholder: '请输入该品牌每月外投预算占比',
            addonAfter: '%',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'dewuPostsNum',
          title: '得物社区帖子数',
          width: '100%',
          formItemProps: {
            rules: [
              {
                validator: (r: any, v: any) => commonValidatePositiveNumber(r, v, '得物社区帖子数'),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'dewuPostsNum'),
            placeholder: '请输入该品牌在得物社区帖子数',
            addonAfter: '篇',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'xiaohongshuPostsNum',
          title: '小红书社区帖子数',
          width: '100%',
          formItemProps: {
            rules: [
              {
                validator: (r: any, v: any) =>
                  commonValidateRequiredPositiveNumber(r, v, '小红书社区帖子数'),
              },
            ],
          },
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'xiaohongshuPostsNum'),
            placeholder: '请输入该品牌在小红书社区帖子数',
            addonAfter: '篇',
            min: 0,
            moneySymbol: false,
          },
          valueType: 'money',
        },
        {
          dataIndex: 'weiboFans',
          title: '微博粉丝数',
          width: '100%',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'weiboFans'),
            placeholder: '请输入该品牌在微博粉丝数',
            addonAfter: '万',
            min: 0,
            precision: 16,
            moneySymbol: false,
          },
          valueType: 'money',
          // formItemProps: {
          //   rules: [
          //     {
          //       validator: (r: any, v: any) =>
          //         commonValidateRequiredPositiveNumber(r, v, '微博粉丝数'),
          //     },
          //   ],
          // },
        },
        {
          dataIndex: 'tiktokFans',
          title: '抖音粉丝数',
          width: '100%',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'tiktokFans'),
            placeholder: '请输入该品牌在抖音粉丝数',
            addonAfter: '万',
            min: 0,
            precision: 16,
            moneySymbol: false,
          },
          valueType: 'money',
          // formItemProps: {
          //   rules: [
          //     {
          //       validator: (r: any, v: any) =>
          //         commonValidateRequiredPositiveNumber(r, v, '抖音粉丝数'),
          //     },
          //   ],
          // },
        },
        {
          dataIndex: 'tiktokVideoNum',
          title: '抖音视频数',
          width: '100%',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'tiktokVideoNum'),
            placeholder: '请输入该品牌在抖音视频数',
            addonAfter: '篇',
            min: 0,
            moneySymbol: false,
          },
          formItemProps: {
            rules: [
              {
                validator: (r: any, v: any) => commonValidatePositiveNumber(r, v, '抖音视频数'),
              },
            ],
          },
          valueType: 'money',
        },
        {
          dataIndex: 'tiktokVideoLikeNum',
          title: '抖音视频点赞数',
          width: '100%',
          fieldProps: {
            disabled: formDisableHandler({ isReviewPassNot }, 'tiktokVideoLikeNum'),
            placeholder: '请输入该品牌抖音视频点赞数',
            addonAfter: '赞',
            min: 0,
            moneySymbol: false,
          },
          formItemProps: {
            rules: [
              {
                validator: (r: any, v: any) => commonValidatePositiveNumber(r, v, '抖音视频点赞数'),
              },
            ],
          },
          valueType: 'money',
        },
      ],
    ];
  }, [
    step,
    isNotNew,
    formDatas,
    isLuxry,
    storeChannelOptions,
    categoryIsArt,
    categoryIsTicket,
    enterpriseNameRequired,
    curBrandId,
    brandOptions,
    fromPage,
    applyId,
  ]);
  return columns;
};

export { useStepColumns };
