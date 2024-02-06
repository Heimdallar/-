import { parse } from 'querystring';
import { history } from '@umijs/max';

/** url query */
export const useQuery = <T = Record<string, string>>() => {
  const query = parse(history.location.search) as unknown as T;

  return query;
};
