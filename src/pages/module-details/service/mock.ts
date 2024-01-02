import { BaseRequest } from '@/utils/request';
import { IResultDetailData, IResultModalDetailData } from './interface';

// 没有使用mooncake是因为脱离耦合，让业务发开人员删除mock数据就可以立即使用。
// 虽然定义和api.ts里是重复的，但不要在代码中混用，mock.ts是完全独立的。

export const getMockDrawerDetailData = (): Omit<IResultDetailData, 'demandList'> => {
  return {
    name: '白冰冰1',
    nick: '小叮当1',
    age: '18',
    country: '英国1',
    type: 'huzhao',
    number: '352521199312190218',
    sign: '2021-01-01',
    expiration: '2023-12-31',
    email: 'doahghg@163.com',
    address: '上海市杨浦区XX路XXX弄XXX号上海市上海市杨浦区XX路XXX弄X',
    employeeNo: '2929292929',
    workRelations: 2,
    organization: '人力资源部',
    job: '人力资源总监',
    timeType: 'fullTime',
    directManager: '白冰',
    serviceTime: '15',
    entryDate: '2010-10-10',
    business: '识装',
    workingYears: '28',
    orkProgress: '70',
    updateTime: '2022-09-15',
    idPhoto: 'https://cdn.poizon.com/node-common/6088e98c-ab5f-32da-496c-0cc8dce74026-512-512.png',
  };
};

/** 详情 */
export const getMockModalDetailData = (): IResultModalDetailData => {
  return {
    categoryName: '鞋',
    productTitle: '运动鞋',
    color: '极光蓝',
    name: '白冰冰',
    applyNo: 'AP1010012600137',
    paidNo: 'PF16000047553175',
    createTime: '2022-09-07 17:11:07',
    upTime: '2022-09-07 17:11:07',
    time: '2021-12-10:10:00',
    hour: '12',
    price: '111.00',
    section: '12',
    min: '500.00',
    bail: '10.00',
    ratio: '5.2%',
    image: 'https://cdn.poizon.com/node-common/6088e98c-ab5f-32da-496c-0cc8dce74026-512-512.png',
  };
};

/** 详情 */
export const getMockDetailData = (): IResultDetailData => {
  return {
    name: '白冰冰2',
    nick: '小叮当2',
    age: '18',
    country: '英国',
    type: 'huzhao',
    number: '352521199312190218',
    sign: '2021-01-01',
    expiration: '2023-12-31',
    email: 'doahghg@163.com',
    address: '上海市杨浦区XX路XXX弄XXX号上海市上海市杨浦区XX路XXX弄X',
    employeeNo: '2929292929',
    workRelations: 2,
    organization: '人力资源部',
    job: '人力资源总监',
    timeType: 'fullTime',
    directManager: '白冰',
    serviceTime: '15',
    entryDate: '2010-10-10',
    business: '识装',
    workingYears: '28',
    orkProgress: '80',
    updateTime: '2022-09-15',
    idPhoto: 'https://cdn.poizon.com/node-common/6088e98c-ab5f-32da-496c-0cc8dce74026-512-512.png',
    demandList: [
      {
        logoUrl:
          'https://cdn.poizon.com/pro-img/origin-img/20210527/8832818867d749c893ce8022c9c11ddf.jpeg',
        num: 18,
        properties: '35',
        skuId: 6039273382,
        title: 'nike-taTfizEaa',
        articleNumber: 'nike-taTfizE001',
      },
      {
        logoUrl:
          'https://cdn.poizon.com/pro-img/origin-img/20210527/8832818867d749c893ce8022c9c11ddf.jpeg',
        num: 53,
        properties: '41',
        skuId: 6039273383,
        title: 'nike-taTfizEee',
      },
      {
        logoUrl:
          'https://cdn.poizon.com/pro-img/origin-img/20210527/8832818867d749c893ce8022c9c11ddf.jpeg',
        num: 100,
        properties: '43',
        skuId: 6039273385,
        title: 'nike-taTfizEdd',
      },
    ],
  };
};

/** 枚举 */
export const getMockEnums = (params: BaseRequest): Record<string, Record<string, string>> => {
  return {
    timeType: {
      fullTime: '全职',
      partTime: '兼职',
      home: '居家',
    },
    demo: {
      demo: JSON.stringify(params),
    },
  };
};
