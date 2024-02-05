import type { ReactNode } from 'react';
export type PromiseType<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;

export type RequestOptionsType = {
  label: React.ReactNode;
  value: string | number;
  /** 渲染的节点类型 */
  optionType?: 'optGroup' | 'option';
  options?: Omit<RequestOptionsType, 'children' | 'optionType'>[];
  [key: string]: any;
};

export type ProFieldRequestData<U = any> = (params: U) => Promise<RequestOptionsType[]>;

export type ProFieldStaticRequestData = () => Promise<RequestOptionsType[]>;

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

export type ProSchemaValueEnumType = {
  text: ReactNode;
  status?: string;
  color?: string;
  disabled?: boolean;
};

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | ReactNode>;

export type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | ReactNode>;

export type CascaderOptions = {
  label: string;
  value: string;
  children?: CascaderOptions[];
  isLeaf?: boolean;
  loading?: boolean;
};

export type CategoryCascaderItem = {
  name: string;
  id: string;
  items?: CategoryCascaderItem[];
};
