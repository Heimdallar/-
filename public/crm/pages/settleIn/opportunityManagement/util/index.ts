import { isEmpty } from 'lodash';
import { contactItem } from '../interface';

export function getContact1Url(contactItem?: contactItem) {
  if (isEmpty(contactItem)) return ''
  const item = contactItem[0]
  if (!isEmpty(item.key)) {
    return item.key;
  }
  const { url } = item;
  return (url || '')?.split('com/')[1].split('?')[0];
}
