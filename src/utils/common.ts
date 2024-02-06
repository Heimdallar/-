import moment from 'moment';
import { ENV } from "../defaultSettings";
/**
 * 返回金额的三种表现形式
 * @param {*} fen 金额，单位分
 * @param {*} type 表现类型 1：¥11.00 2：11.00元 3：11.00 4: 11
 * @returns {String} 显示金额
 */
export function displayMoney(fen: number, type = 1) {
  let negative = '';
  if (!fen) {
    return '-';
  }
  if (fen < 0) {
    negative = '-';
  }
  const r = /[0-9]+(\.[0-9]{1,2})?/;
  const group = parseFloat(String(fen / 100))
    .toString()
    .match(r);
  if (!group || !group[0]) return '0.00';

  const money = Number(Number(group[0]).toFixed(2));
  const moneyWithoutFloatValue = Math.floor(money);

  if (type === 1) {
    return `${negative}¥${money}`;
  }
  if (type === 2) {
    return `${negative}${money}元`;
  }
  if (type === 3) {
    return `${negative}${money}`;
  }
  if (type === 4) {
    return `${negative}${moneyWithoutFloatValue}`;
  }
  return '';
}

export function formatDate(v: moment.MomentInput, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return v ? moment(v).format(fmt) : '--';
}

export function deleteEmptyParam(obj: any) {
  if (typeof obj !== 'object' || obj === null) { throw new Error('Expected an object'); }
  for (let key in obj) {
    if (obj[key] === null ||
        Number.isNaN(obj[key]) ||
        (obj[key] instanceof Object && Object.keys(obj[key]).length === 0) || 
        (Array.isArray(obj[key]) && obj[key].length === 0)) {
      delete obj[key];
    }
  }
  return obj;
}


export const domainPrefixList = [
  'd1',
  'd2',
  't0',
  't1',
  't2',
  't3',
  't4',
  't5',
  't99',
  't620',
  'ft',
  'cstst',
  'pre',
];

const developmentEnv = ENV;
const envUrl = `http://${developmentEnv}-authgw.dewu.com`;

// 获取格式如 d1-eos 的环境
export function getUrlEnv(url = ''): string {
  const reg = /https?:\/\/(.*)\.(shizhuang-inc|dewu)/;
  const regMatch = url.match(reg);
  return url && regMatch ? regMatch[1] : '';
}

export function getEnv(): string {
  const host =
    process.env.NODE_ENV === 'development'
      ? getUrlEnv(envUrl)
      : window.location.hostname.split('.shizhuang-inc')[0];
  const env = host ? host.split('-')[0] : '';
  if (domainPrefixList.includes(env)) {
    if (env === 't620') return 't1';
    return env;
  }
  return 'prod';
}

export const getFullNum = (num: any) => {
  if (isNaN(num)) {
    return num
  }

  const str = `${num}`;
  if (!/e/i.test(str)) {
    return num;
  }

  return num.toFixed(18).replace(/\.?0+$/, '');
};
