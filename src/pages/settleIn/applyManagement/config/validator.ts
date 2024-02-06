const urlReg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;

export function isEmptyIgnore(r: any, v: any) {
  return !r.required && (v === '' || v === undefined || v === null);
}

export const validators = {
  required: (value: any) => {
    return value !== undefined && value !== null && value !== '';
  },
  arrayRequired: (value: [] | undefined) => {
    return value && value.length > 0;
  },
  number: (value: number | undefined) => {
    return typeof value === 'number' || value === undefined;
  },
  string: (value: string | undefined) => {
    return typeof value === 'string' || value === undefined;
  },
  number_range: (value: number | undefined, range: (number | undefined | null)[]) => {
    const [min, max] = range;
    if (value === undefined) {
      return true;
    }
    let flag = true;
    if (min || min === 0) {
      flag = value >= min;
    }
    if (max || max === 0) {
      flag = flag && value <= max;
    }
    return flag;
  },
  string_length: (
    value: string | undefined,
    range: [number | undefined | null, number | undefined | null],
  ) => {
    const [min, max = 256] = range;
    if (value === undefined) {
      return true;
    }
    let flag = true;
    if (min || min === 0) {
      flag = value.length >= min;
    }
    if (max || max === 0) {
      flag = flag && value.length <= max;
    }
    return flag;
  },
};

const Number2Text = ['', '一', '两', '三', '四', '五', '六'];
const dotN = (v: number, length: number) => {
  return (String(v).split('.')[1]?.length ?? 0) <= length;
};
// 非必填数字，最多保留n位小数
export const commonValidateFloatNumber = (
  r: any,
  v: any,
  text: string,
  float = true,
  needPositive = true,
  range: any[] = [],
  afterdotLength = 2,
) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (!validators.number(v)) {
    return Promise.reject(`${text}应为数字`);
  }
  if (v !== undefined && float && !dotN(v, afterdotLength)) {
    return Promise.reject(`${text}精确到小数点后${Number2Text[afterdotLength]}位`);
  }
  if ((range[0] || range[1]) && !validators.number_range(v, range)) {
    if (!(range[0] ?? '' === '') && range[1]) {
      return Promise.reject(`${text}应是 ${range.join(' ~ ')} 之间的数值`);
    } else if (range[0]) {
      return Promise.reject(`${text} 应大于 ${range[0]}`);
    }
    return Promise.reject(`${text} 应小于 ${range[1]}`);
  }
  if (v !== undefined && needPositive && v < 0) {
    return Promise.reject(`${text}应不小于0`);
  }
  return Promise.resolve();
};
// 必填正整数
export const commonValidateRequiredPositiveNumber = (
  r: any,
  v: any,
  text: string,
  int = true,
  needPositive = true,
) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (!validators.required(v) && r.required) {
    return Promise.reject(`${text}不得为空`);
  }
  return commonValidatePositiveNumber(r, v, text, int, needPositive);
};
// 正整数或null
export const commonValidatePositiveNumber = (
  r: any,
  v: any,
  text: string,
  int = true,
  needPositive = true,
) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (!validators.number(v)) {
    return Promise.reject(`${text}应为数字`);
  }
  if (v !== undefined && int && !(v % 1 === 0)) {
    return Promise.reject(`${text}应为整数`);
  }
  if (v !== undefined && needPositive && v < 0) {
    return Promise.reject(`${text}应不小于0`);
  }
  return Promise.resolve();
};

// // 百分比非必填
export const commonValidatePrecentNotRequired = (r: any, v: number, text: string) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (!validators.number(v)) {
    return Promise.reject(`${text}应是 0 ～ 100 之间的数值`);
  }
  if (!validators.number_range(v, [0, 100])) {
    return Promise.reject(`${text}应是 0 ～ 100 之间的数值`);
  }
  // return Promise.resolve()
  return commonValidateFloatNumber(r, v, '百分比');
};

// 百分比必填
export const commonValidatePrecent = (r: any, v: any, text: string) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (!validators.required(v) && r.required) {
    return Promise.reject(`${text}不得为空`);
  }
  return commonValidatePrecentNotRequired(r, v, text);
};

// // 必填数字，最多保留n位小数
export const commonValidateRequiredFloatNumber = (
  r: any,
  v: any,
  text: string,
  float = true,
  needPositive = true,
  afterdotLength = 2,
) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (!validators.required(v) && r.required) {
    return Promise.reject(`${text}不得为空`);
  }
  return commonValidateFloatNumber(r, v, text, float, needPositive, [], afterdotLength);
};
export const storeUrlValidator = (r: any, v: any, underline = false, isNotNew = false) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }
  if (isNotNew && !underline && !v && r.required) {
    return Promise.reject('店铺链接不得为空');
  }
  if (v && v.length > 300) {
    return Promise.reject('链接长度最大为300');
  }
  if (v && !urlReg.test(v)) {
    return Promise.reject('请输入合法的链接');
  }
  return Promise.resolve();
};

export const annualSalesValidator = (r: any, v: any, isNotNew = false) => {
  if (isEmptyIgnore(r, v)) {
    return Promise.resolve();
  }

  if (isNotNew && !v && r.required) {
    return Promise.reject('年销售额不得为空');
  }
  return commonValidateFloatNumber(r, v, '年销售额', true, true, [], 4);
};
