

import { useEffect, useMemo, useState } from 'react';
import { brandTypeOptions, qualificationOptions, storeChannelOptions, Column_Type } from './constants';
import fetchCategoryListService from '@/services/attractinvestment/fetch-category-list'
import { Datum } from '@/entities/attractinvestment/interface/fetch-category-list'
import type { FormInstance } from 'poizon-design'
import _ from 'lodash'

interface Props {
  infoData: any | undefined
  form: FormInstance
  setCategoryArr: (val: Datum[]) => Datum[]
}
const useFormItems = ({ infoData, form, setCategoryArr }: Props) => {

  const [categoryList, setCategoryList] = useState([])

  const getCategoryList = async () => {
    const res = await fetchCategoryListService({})
    if (res.success) {
      const list = res.data.map((item) =>{return {
        ...item,
        value: item.id,
        label: item.name
      }})
      setCategoryArr(res.data)
      setCategoryList(list)
    }
  }

  const categoryFilterIdsList = useMemo(() => {
    if (infoData?.mainCateIds?.length){
      const data = categoryList.filter((item) => {return infoData.mainCateIds?.includes(item.value)})
      return data
    }

    return categoryList
  }, [categoryList, infoData])

  useEffect(() => {
    if (!_.isEmpty(infoData)) {
      getCategoryList()
    }

  }, [infoData])

  const columns = useMemo(() => {
    let colomn = [
      {
        name: 'enterpriseName',
        label: '公司名称',
        placeholder: '请输入贵公司名称',
        maxLength: 50,
        rules: [
          {
            required: true,
            message: '请输入贵公司名称'
          },
          {
            validator: (rule, value, callback) => {
              if (!value || value.length >= 2 && value.length <= 50) {
                callback();
              } else {
                callback([new Error('长度需在2-50个字符之间，不能包含非法字符')]);
              }
            }
          }
        ],
      },
      {
        name: 'brandId',
        label: '主营品牌',
        placeholder: '请选择主营品牌',
        type: 'select',
        options: [],
        rules: [
          {
            required: true,
            message: '请选择主营品牌'
          },
        ],
      },
      {
        name: 'mainCategoryId',
        label: '主营类目',
        placeholder: '请选择',
        options: categoryFilterIdsList,
        type: 'select',
        rules: [
          {
            required: true,
            message: '请选择主营类目'
          },
        ],
      },
      {
        name: 'contactName',
        label: '联系人',
        placeholder: '请输入联系人姓名',
        maxLength: 20,
        rules: [
          {
            required: true,
            message: '请输入联系人姓名'
          },
          {
            validator: (rule, value, callback) => {
              if (!value || value.length <= 20) {
                callback();
              } else {
                callback([new Error('不能超过20个字符')]);
              }
            }
          }
        ],
      },
      {
        name: 'contactMobileNumber',
        label: '联系电话',
        placeholder: '请输入联系人手机号码',
        type: 'number',
        maxLength: 11,
        rules: [
          {
            required: true,
            message: '请输入联系人手机号码'
          },
          {
            validator: (rule, value, callback) => {
              if ([undefined, null, ''].includes(value) || /^1\d{10}$/.test(value)) {
                callback();
              } else {
                callback([new Error('请输入正确的手机号')]);
              }
            }
          }
        ],
      },
      {
        name: 'manageType',
        label: '品牌资质类型',
        placeholder: '请选择',
        type: 'select',
        options: qualificationOptions,
        rules: [
          {
            required: true,
            message: '请选择品牌资质类型'
          },
        ],
      },
      {
        name: 'brandType',
        label: '品牌类型',
        placeholder: '请选择',
        type: 'select',
        options: brandTypeOptions,
        rules: [
          {
            required: true,
            message: '请选择品牌类型'
          },
        ],
      },
      {
        name: 'storeChannel',
        label: '外网店铺渠道',
        placeholder: '请选择',
        type: 'select',
        options: storeChannelOptions,
        rules: [
          {
            required: true,
            message: '请选择外网店铺渠道'
          },
        ],
      },
      {
        name: 'storeName',
        label: '店铺名称',
        maxLength: 50,
        placeholder: '请输入',
        rules: [
          {
            required: true,
            message: '请输入店铺名称'
          },
        ],
      },
      {
        name: 'storeUrl',
        label: '店铺地址',
        maxLength: 100,
        placeholder: '请输入店铺地址或网址链接',
        rules: [
          {
            required: true,
            message: '请输入店铺地址或网址链接'
          },
          {
            validator: (rule, value, callback) => {
              const storeChannel = form.getFieldValue('storeChannel') || []
              const isCheckUrl = !storeChannel.includes('线下门店') && storeChannel.length
              if (isCheckUrl) {
                if (/^((http:\/\/)|(https:\/\/)|(ftp:\/\/))?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9\-\._\?\,\’\/\\\+&amp;%\$#\=~]*)?$/.test(value)) {
                  callback();
                } else {
                  callback([new Error('请输入正确网址链接')]);
                }
              } else {
                callback()
              }
            }
          }
        ],
      },
      {
        name: 'annualSales',
        label: '年销售总金额(亿)',
        placeholder: '请输入',
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入年销售总金额(亿)'
          },
          {
            validator: (rule, value, callback) => {
              if ([undefined, null, ''].includes(value) || /^\d+(\.\d{1,4})?$/.test(value)) {
                callback();
              } else {
                callback([new Error('输入格式为正整数或最多4位小数')]);
              }
            }
          }
        ],
      },
      {
        name: 'xiaohongshuPostsNum',
        label: '小红书帖子数(条)',
        placeholder: '请输入',
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入小红书帖子数(条)'
          },
          {
            validator: (rule, value, callback) => {
              if ([undefined, null, ''].includes(value) || /^(?:0|(?:[1-9]\d*))$/.test(value)) {
                callback();
              } else {
                callback([new Error('请输入非负整数')]);
              }
            }
          }
        ],
      },
      {
        name: 'tiktokFansNum',
        label: '抖音官方账号粉丝数(人)',
        placeholder: '请输入',
        type: 'number',
        rules: [
          {
            required: true,
            message: '请输入抖音官方账号粉丝数(人)'
          },
          {
            validator: (rule, value, callback) => {
              if ([undefined, null, ''].includes(value) || /^(?:0|(?:-?[1-9]\d*))$/.test(value)) {
                callback();
              } else {
                callback([new Error('请输入非负整数')]);
              }
            }
          }
        ],
      }
    ];
    
    if (infoData?.needFill?.length) {
      colomn = colomn.filter((item) => {
        return infoData?.needFill?.includes(Column_Type[item.name])
      })
    }

    return colomn
  }, [infoData, categoryFilterIdsList]);
  return columns;
};
export default useFormItems;
