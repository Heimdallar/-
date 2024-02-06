import { ProFormInstance } from '@poizon-design/pro-form';
import { isBoolean, isObject } from 'lodash';
import { Button, message } from 'poizon-design';
import * as Service from '../../../api';
import moment from 'moment';
import './index.less';
import { getUploadParams, mergeFormData, filterNotRequired } from '../../../util';
import { CHANGESIZEONE, CHANGESIZETWO, initInternetSaleInfos } from '../../../config/const';
import { APPLY_ITEM_STATUS, countryMap, regStatusMap } from '@/pages/settleIn/applyCommon/config';

interface IStepFooter {
  step: number;
  applyId: string;
  loading: boolean;
  adminEdit: boolean;
  formData: any;
  fromPage: string;
  setFormData: React.Dispatch<any>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBtnAction: React.Dispatch<React.SetStateAction<string>>;
  formRef: React.MutableRefObject<ProFormInstance<any> | undefined>;
  handleBack: () => void;
  handleScrollToTop: () => void;
}

type IUrl = keyof typeof Service;

const successTip: React.FC<any> = ({
  step,
  applyId,
  setStep,
  fromPage,
  loading,
  formRef,
  setShowResult,
  setLoading,
  setBtnAction,
  adminEdit,
  formData,
  setFormData,
  handleBack,
  handleScrollToTop,
}: IStepFooter) => {
  const handleRequest = async (params: any, isAdmin = false, url?: IUrl) => {
    setLoading(true);
    try {
      const {
        // 中、英文 商标注册证开始时间-结束时间
        trademarkTime,
        foreignTrademarkTime,
        brandCountryFlagArr,
        brandCountry,
        countryFlag,
        countryCode,
      } = params || {};

      const country = {
        countryCode: countryCode || '',
        brandCountry: undefined,
      };
      if (Number(countryFlag) === countryMap.国际) {
        if (brandCountry?.includes(':')) {
          const [countryCode, brandcountry] = brandCountry?.replace('+', '')?.split(':') || [];
          country.countryCode = countryCode;
          country.brandCountry = brandcountry;
        } else {
          // 兼容之前国际选择
          country.brandCountry = brandCountry;
        }
      } else {
        country.countryCode = '86';
      }
      const countryArr = brandCountryFlagArr || [];
      let mainCategory = params.mainCategory || '';
      let mainCategoryId = params.mainCategoryId || '';
      const isCategoryObject = isObject(mainCategoryId);
      if (isCategoryObject) {
        mainCategory = mainCategoryId.label;
        mainCategoryId = mainCategoryId.value;
      }
      const len1 = 1;
      const len2 = 2; // 全选

      const brandCountryFlag =
        countryArr.length === len2 ? len2 : countryArr.length === len1 ? countryArr[0] : '';

      const [trademarkStartTime, trademarkEndTime] = trademarkTime || [];
      const [foreignTrademarkStartTime, foreignTrademarkEndTime] = foreignTrademarkTime || [];
      // 判断必填校验 商标专用权期限
      if (!!params.trademarkList?.length && params?.registerStatus === regStatusMap.R标) {
        // 上传中文商标注册证-必填
        if (!(trademarkStartTime && trademarkEndTime)) {
          setLoading(false);
          return message.error('请填写中文商标专用权期限');
        }
      }
      if (
        !!params.foreignTrademarkList?.length &&
        params?.foreignRegisterStatus === regStatusMap.R标
      ) {
        // 上传英文商标注册证-必填
        if (!(foreignTrademarkStartTime && foreignTrademarkEndTime)) {
          setLoading(false);
          return message.error('请填写英文商标专用权期限');
        }
      }
      // 商标注册证逻辑处理
      const filterData = filterNotRequired({
        ...params,
        trademarkStartTime,
        trademarkEndTime,
        foreignTrademarkStartTime,
        foreignTrademarkEndTime,
      });

      let submitFn: keyof typeof Service = 'create';

      if (isAdmin) {
        submitFn = 'adminEdit';
      } else if (applyId) {
        submitFn = 'edit';
      } else {
        submitFn = 'create';
      }
      submitFn = url || submitFn; // 优先使用传入的url
      // 接口调用
      const res = await Service[submitFn]({
        ...(applyId ? { applyId } : {}),
        status: 0,
        ...params,
        foreignTrademarkTime: undefined,
        trademarkTime: undefined,
        brandCountryFlagArr: undefined,
        brandCountryFlag,
        ...country,
        ...filterData,
        trademarkStartTime: filterData?.trademarkStartTime
          ? moment(filterData?.trademarkStartTime).startOf('day').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        trademarkEndTime: filterData?.trademarkEndTime
          ? moment(filterData?.trademarkEndTime).endOf('day').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        foreignTrademarkStartTime: filterData?.foreignTrademarkStartTime
          ? moment(filterData?.foreignTrademarkStartTime)
              .startOf('day')
              .format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        foreignTrademarkEndTime: filterData?.foreignTrademarkEndTime
          ? moment(filterData?.foreignTrademarkEndTime).endOf('day').format('YYYY-MM-DD HH:mm:ss')
          : undefined,
        mainCategory,
        mainCategoryId,
        brandId: params.currentBrandId,
        ...getUploadParams({ ...params, ...filterData }), // 图片字段处理
        ...(params.internetSaleInfos
          ? {
              internetSaleInfos: params.internetSaleInfos.map((item: any) => ({
                ...item,
                storeName: item.storeChannel ? params.enterpriseName : '',
                ...CHANGESIZETWO.reduce((s: any, { key, multiple }) => {
                  const cv = item[key] ?? '';
                  if (cv !== '') {
                    s[key] = Math.round(cv * multiple);
                  }
                  return s;
                }, {}),
              })),
            }
          : {}),
        ...CHANGESIZEONE.reduce((s: any, { key, multiple }) => {
          const cv = params[key] ?? '';
          if (cv !== '') {
            s[key] = Math.round(cv * multiple);
          }
          return s;
        }, {}),
      });
      if (res && isBoolean(res)) {
        setShowResult(true);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setBtnAction('');
    }
  };

  // 对申请单通过的，不展示前两步的保存，直接到最后保存

  let showSaveChange = true;
  let showReSubmitChange = false;
  if (fromPage !== 'applyReview') {
    const { status } = formData || {};
    if (status === APPLY_ITEM_STATUS.reviewPass && step === 2) {
      showReSubmitChange = true;
    }
    if (status === APPLY_ITEM_STATUS.reviewPass) {
      showSaveChange = false;
    }
  }

  return (
    <div className="editorFooter">
      <div className="buttonGroup">
        <Button className="resetHover" type="link" onClick={() => handleBack()}>
          取消
        </Button>
        {step > 0 ? (
          <Button
            disabled={loading}
            onClick={async () => {
              const res = await formRef.current?.getFieldsValue();
              setStep((pre) => pre - 1);
              let { internetSaleInfos, ...params } = formData;
              Object.keys(res).forEach((key) => {
                if (key === 'internetSaleInfos') {
                  params[key] = internetSaleInfos ? internetSaleInfos : [initInternetSaleInfos];
                } else {
                  params[key] = '';
                }
              });
              formRef.current?.setFieldsValue(params);
              handleScrollToTop();
            }}
          >
            上一步
          </Button>
        ) : null}
        {!adminEdit ? (
          <Button
            disabled={loading}
            onClick={async () => {
              const res = await formRef.current?.validateFieldsReturnFormatValue?.();
              const currentBrandId = formRef.current?.getFieldValue('currentBrandId');
              const currentSaveDraft = mergeFormData(formData, { ...res, currentBrandId });
              setFormData(currentSaveDraft);
              handleRequest(currentSaveDraft);
            }}
          >
            保存草稿
          </Button>
        ) : (
          showSaveChange && (
            <Button
              disabled={loading}
              onClick={async () => {
                const res = await formRef.current?.validateFieldsReturnFormatValue?.();
                const currentBrandId = formRef.current?.getFieldValue('currentBrandId');
                const currentSaveForm = mergeFormData(formData, { ...res, currentBrandId });
                setFormData(currentSaveForm);
                handleRequest(currentSaveForm, true);
              }}
            >
              保存变更
            </Button>
          )
        )}
        {showReSubmitChange && (
          <Button
            type="primary"
            disabled={loading}
            onClick={async () => {
              const res = await formRef.current?.validateFieldsReturnFormatValue?.();
              const currentBrandId = formRef.current?.getFieldValue('currentBrandId');
              const currentSaveForm = mergeFormData(formData, { ...res, currentBrandId });
              setFormData(currentSaveForm);
              handleRequest(currentSaveForm, true, 'reSubmit');
            }}
          >
            提交审核
          </Button>
        )}
        {step < 2 ? (
          <Button
            disabled={loading}
            type="primary"
            onClick={async () => {
              const res = await formRef.current?.validateFieldsReturnFormatValue?.();
              setStep((next) => next + 1);
              const currentNextData = mergeFormData(formData, res);
              setFormData(currentNextData);
              setTimeout(() => {
                formRef?.current?.setFieldsValue(currentNextData);
              }, 100);
              handleScrollToTop();
            }}
          >
            下一步
          </Button>
        ) : null}
        {step === 2 && !adminEdit ? (
          <Button
            type="primary"
            onClick={async () => {
              const res = await formRef.current?.validateFieldsReturnFormatValue?.();
              const currentSubmitData = mergeFormData(formData, res);
              setFormData(currentSubmitData);
              setBtnAction('submit');
              handleRequest(currentSubmitData);
            }}
          >
            创建申请单
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default successTip;
