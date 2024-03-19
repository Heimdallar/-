import { forEach, size } from 'lodash';
import { Modal, Input } from 'poizon-design';
import { RuleObject } from "poizon-design/lib/form";
import { StoreValue } from "poizon-design/lib/form/interface";


export const  validateInput = (rule:RuleObject, value:StoreValue, callback:Function) => {
    const reg = /^[a-zA-Z\u4e00-\u9fa50-9,]+$/; // 匹配中文和英文
    if (!reg.test(value)) {
      callback('只允许输入中文和英文，多个条目用逗号分隔');
    } else {
    }
  };

export const validateInput2=(rule:RuleObject, value:StoreValue, callback:Function)=>{

  if (!value) return Promise.resolve()
  const wordList = value.split(/,|，/) || []

  let isCE = true
  let isLengthOver = false
  forEach(wordList, value => {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9,，/]+$/g
    const match: any = reg.test(value.trim())
    if (!match && value) {
      isCE = false
    }
    if (size(value) > 20) {
      isLengthOver = true
    }
  })
  if (!isCE) {
    return Promise.reject('风格格式仅支持中英文和数字')
  }
  if (isLengthOver) {
    return Promise.reject('每个风格值长度不得超过20字符')
  }
  if (wordList.length > 30) {
    return Promise.reject('每一个类目最多允许填入30个风格')
  }
  return Promise.resolve()
}
  