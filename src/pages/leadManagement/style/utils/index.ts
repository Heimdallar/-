import { Modal, Input } from 'poizon-design';
import { RuleObject } from "poizon-design/lib/form";
import { StoreValue } from "poizon-design/lib/form/interface";


export const  validateInput = (rule:RuleObject, value:StoreValue, callback:Function) => {
    const reg = /^[a-zA-Z\u4e00-\u9fa5,]+$/; // 匹配中文和英文
    if (!reg.test(value)) {
      callback('只允许输入中文和英文，多个条目用逗号分隔');
    } else {
    }
  };

  