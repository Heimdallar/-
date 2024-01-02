/**
 * 唯一 ID
 */
export const uuid = () => {
  return new Date().getTime();
};

/**
 * Map对象转Option对象
 */
export const map2Options = (dataMap: { [key: string]: any }, needAll?: boolean) => {
  const optionList: { value: string | number; label: string | number }[] = needAll
    ? [{ value: 'mendianAllOptions', label: '全部' }]
    : [];
  Object.keys(dataMap).forEach((dataKey: string) => {
    optionList.push({
      value: !Number.isNaN(Number(dataKey)) ? Number(dataKey) : dataKey,
      label: dataMap[dataKey],
    });
  });
  return optionList;
};

/**
 * 枚举值转为Option对象
 */
export const buildOptions: (options: any) => { label: string; value: number }[] = (options) => {
  return Object.values(options)
    .filter((item) => {
      return typeof item !== 'number';
    })
    .map((item: any) => {
      return {
        label: item,
        value: options[item],
      };
    });
};

/**
 * Option对象转Map对象
 */
export const options2Map = (options: { label: string; value: any }[]) => {
  return options.reduce((prev, next) => {
    /* eslint no-param-reassign: "off" */
    prev[next.value] = next.label;
    return prev;
  }, {} as Record<string, string>);
};

/**
 * 尝试转数字
 */
const tryConvertToNumber = <T>(value: T, defaultOnFailure?: number): number | T => {
  const number = Number(value);
  if (!Number.isNaN(number)) {
    return number;
  }
  if (defaultOnFailure !== undefined) {
    return defaultOnFailure;
  }
  return value;
};

/**
 * 格式化数字
 */
const formatNumber = (num: number, fixedDigits?: number): string => {
  if (fixedDigits === undefined) {
    return `${num}`;
  }
  return num.toFixed(fixedDigits);
};

/**
 * 分 转 元
 */
export const fenToYuan = (money: number | undefined, fixedDigits?: number) => {
  const yuanBased = Math.floor(tryConvertToNumber(money || 0, 0));
  return formatNumber(yuanBased, fixedDigits);
};

/** 元 转 分 */
export const yuanToFen = (money: number | undefined): number => {
  return (Number(money) || 0) * 100;
};

/**
 * 千位分隔
 */
export const thousandsFormat = (input: number | string): string => {
  return Number(input || 0).toLocaleString();
};

/** 人民币符号 */
export const cnyUnit = '¥';

/** 手动延迟 */
export const sleepSync = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
