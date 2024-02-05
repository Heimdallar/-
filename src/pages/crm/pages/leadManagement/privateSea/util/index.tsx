import { getEnv } from '@/utils/common';
import { CheckCircleFilled, LinkOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { isEmpty, cloneDeep, map, forEach } from 'lodash';
import { message, Modal, Tag } from 'poizon-design';
import { DataElement, IListItem, OperateDescListType } from '../interface';
import { ChannelColumn, getChannelMap } from '@/entities/storeChannel';

export function transfromV(record: IListItem, type: string) {
  const obj = record[type]
  if(isEmpty(obj)) return '-'
  const { storeName, storeUrl } = obj
  if (storeUrl) {
    return (<a 
      style={{color: '#01C2C3'}} 
      href={storeUrl.includes('http') ? storeUrl : `http://${storeUrl}`} 
      target="_blank">
        <LinkOutlined />
        <span style={{marginLeft: '5px'}}>{storeName}</span>
      </a>)
  } else {
    return <span>{storeName}</span>
  }
}

export const transfrom = (datas: Array<any>) => {
  const data = cloneDeep(datas)
  const newList = map(data, (v, i) => {
    const { internetSaleInfos } = v
      const result = {
        ...v,
      };
      const channelMap = getChannelMap(ChannelColumn.Label, ChannelColumn.Key);
      forEach(internetSaleInfos, (value, index) => {
        const { storeChannel } = value;
        if (channelMap[storeChannel]) {
          result[channelMap[storeChannel]] = value;
        }
      });
      return result;
  })
  return newList
}

export const generatePeopleTag = (creator = '') => {
  let creators: string[] = []
  try {
    creators = JSON.parse(creator)
  } catch {
    creators = [creator]
  }
  if (creators && creators.length) {
    return creators.map((item, index) => <Tag key={index+item+Math.random()}>{item}</Tag>)
  }
  return null
}

export function getGondorDomain(): string {
  const gondorDomainMap: any = {
    d1: 'd1-gondor.shizhuang-inc.net',
    t1: 't1-gondor.shizhuang-inc.net',
    pre: 'pre-gondor.shizhuang-inc.com',
    prod: 'gondor.shizhuang-inc.com',
  }

  const env = getEnv()
  return gondorDomainMap[env] || 'gondor.shizhuang-inc.com'
}

export const setOperateDescList = (data: DataElement[]) => {
  const list = data.map((item) => {
    if (item.operator !== '智能外呼机器人') return item;
    try {
      const operateDescList: OperateDescListType[] = JSON.parse(item.operateDesc);
      const operateDesc = operateDescList?.reduce((acc: string, current: OperateDescListType) => {
        return current.type === 'text'
          ? acc + current.content
          : `${acc} <a href='${current.content}' target='_blank'>${current.title}</a>`;
      }, '');
      return { ...item, operateDesc };
    } catch (error) {
      return item;
    }
  });
  return list;
};
