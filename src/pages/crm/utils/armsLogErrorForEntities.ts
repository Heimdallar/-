import lodash from 'lodash'

export enum DataType {
  object = 'object',
  array = 'array',
  number = 'number',
  string = 'string',
  boolean = 'boolean',
  undefined = 'undefined',
  symbol = 'symbol'
}


interface Config {
  /** key可以是字符串，如 name ；也可以是路径，比如a.b.c[0].d  如果是嵌套层级的字段，建议key写全路径哦，如：a.b.c, 方便上报异常时定位问题 */
  key: string;
  /** 这里为了兼容历史接口的类型定义，所以没有删除'object' | 'array' | 'number' | 'string' | 'boolean' | 'undefined' | "symbol"，推荐使用 DataType 这个枚举定义，string类型是 DataType.string */
  type: 'object' | 'array' | 'number' | 'string' | 'boolean' | 'undefined' | "symbol" | DataType;
  required?: boolean;
}

const getDataType = (data) => {
  if (data instanceof Array) {
    return 'array'
  }

  if (data instanceof Object) {
    return 'object'
  }

  if (data === null) {
    return null
  }

  if (data === undefined) {
    return undefined
  }

  return typeof data
}

/** 校验服务端返回字段是否符合预期，不符合则通过arms上报 */
const validEntitiesDataAndLogError = <T>({path, configs, data}: {
  path: string;
  configs: Config[];
  data: T;
}) => {
  if (data instanceof Array || data instanceof Function || !(data instanceof Object)) {
    return
  }

  // @ts-ignore
  if (!(window?.DUOTEL instanceof Object) && !(window?.DUOTEL.send instanceof Object)) {
    return
  }

  try {
    if (Array.isArray(configs) && configs.length) {
      configs.forEach(config => {
        const dataType = getDataType(lodash.get(data, config.key))

        if (config.required && dataType !== config.type) {

          if (dataType === undefined) {
            // @ts-ignore
            window.DUOTEL.send('entityDataError', {
              path: path,
              data: JSON.stringify(data),
              message: `接口(${path})：${config.key}是必填字段，但未接收到该字段`
            }, {})
            return
          }

          // @ts-ignore
          window.DUOTEL.send('entityDataError', {
            path: path,
            data: JSON.stringify(data),
            message: `接口(${path})：${config.key}预期是【${config.type}】类型，但接收到【${dataType}】类型`
          }, {})
        }

        // @ts-ignore
        if (!config.required && ![config.type, undefined, null].includes(dataType)) {
          // @ts-ignore
          window.DUOTEL.send('entityDataError', {
            path: path,
            data: JSON.stringify(data),
            message: `接口(${path})：${config.key}预期是【${config.type}】类型，但接收到【${dataType}】类型`
          }, {})
        }
      })
    }
  } catch(error) {    
  }
}

export default validEntitiesDataAndLogError
