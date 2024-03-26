import { LinkOutlined } from '@ant-design/icons';
import { isEmpty, cloneDeep, map, forEach } from 'lodash';
import { Tag } from 'poizon-design';
import { IListItem } from '../interface';
export function transfromV(record: IListItem, type: string) {
  const obj = record[type];
  if (isEmpty(obj)) return '-';
  const { storeName, storeUrl } = obj;
  if (storeUrl) {
    return (
      <a
        style={{ color: '#01C2C3' }}
        href={storeUrl.includes('http') ? storeUrl : `http://${storeUrl}`}
        target="_blank"
      >
        <LinkOutlined rev={undefined} />
        <span style={{ marginLeft: '5px' }}>{storeName}</span>
      </a>
    );
  } else {
    return <span>{storeName}</span>;
  }
}

export const transfrom = (datas) => {
  const data = cloneDeep(datas);
  const newList = map(data, (v, i) => {
    const { internetSaleInfos } = v;
    const result = {
      ...v,
    }
    const channelMap = 
    forEach(internetSaleInfos, (value, index) => {
      const { storeChannel } = value;
      if (channelMap[storeChannel]) {
        result[channelMap[storeChannel]] = value;
      }
    });
    return result;
  });
  return newList;
};

export const generatePeopleTag = (creator = '') => {
  let creators: string[] = [];
  try {
    creators = JSON.parse(creator);
  } catch {
    creators = [creator];
  }
  if (creators && creators.length) {
    return creators.map((item, index) => <Tag key={index + item + Math.random()}>{item}</Tag>);
  }
  return null;
};

export const transBrandName = (names = '') => {
  let nameList = (names || '').split('，');
  nameList = nameList.filter((s: any) => s !== '');
  if (nameList.length > 20) {
    nameList = nameList.slice(0, 20);
  }
  return nameList;
};

export const useQuery = () => {
  return Object.fromEntries(new URLSearchParams(window.location.href.split('?')?.[1]));
};

export const sortHandleFn = (sort: { [key: string]: 'ascend' | string }) => {
  const newSort: { [key: string]: string | boolean } = {};
  Object.keys(sort).forEach((key: string) => {
    newSort['fieldName'] = key
    newSort.asc = sort[key] === 'ascend'
  });
  return newSort;
};
