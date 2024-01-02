import { useLocation } from '@umijs/max';

/** url query */
export const useQuery = <T = Record<string, string>>() => {
  const urlParams = new URLSearchParams(useLocation().search);
  return Object.fromEntries(urlParams) as unknown as T;
};
