import React, { useMemo, useState, useRef, useEffect } from 'react';
import { message, Select, SelectProps, Spin } from 'poizon-design';
import debounce from 'lodash/debounce';
import { ProFieldRequestData, RequestOptionsType } from '@/utils/types';
import './index.less';

export type ProSelectProps = SelectProps & {
  debounceTime?: number;
  max?: number;
  request?: ProFieldRequestData;
};

const ProSelect: React.FC<ProSelectProps> = (props) => {
  const {
    request,
    value,
    debounceTime = 200,
    className,
    mode,
    max,
    onChange,
    ...restProps
  } = props;
  const [isFetching, setIsFetching] = useState(false);
  const [initValue, setInitValue] = useState(value);
  const [options, setOptions] = useState<RequestOptionsType[]>([]);
  const fetchRef = useRef(0);

  useEffect(() => {
    setInitValue(value);
  }, [value]);

  const debounceFetcher = useMemo(() => {
    if (!request || typeof request !== 'function') {
      return undefined;
    }
    const loadOptions = async (param: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setIsFetching(true);

      const newOptions = await request(param);
      // 避免多次请求重叠造成返回异常
      if (fetchId !== fetchRef.current) {
        return;
      }
      setOptions(newOptions);
      setIsFetching(false);
    };
    return debounce(loadOptions, debounceTime);
  }, [request, debounceTime]);

  const formatProps = useMemo(() => {
    if (!debounceFetcher) {
      const notFetcherProps = {
        mode,
        max,
        onChange,
        value: initValue,
        ...restProps,
      };
      return notFetcherProps;
    }
    return {
      filterOption: false,
      showSearch: true,
      onSearch: debounceFetcher,
      notFoundContent: isFetching ? <Spin size="small" /> : null,
      mode,
      ...restProps,
      options,
      value: initValue,
      onChange: (selectValue: any) => {
        if (mode === 'multiple' && max && selectValue?.length > max) {
          message.warning(`最多选择${max}个`);
          selectValue?.pop();
        }
        setInitValue(selectValue);
        if (!onChange) return;
        onChange(selectValue, options);
      },
    };
  }, [debounceFetcher, initValue, isFetching, max, mode, onChange, options, restProps]);
  return <Select className={className} {...formatProps} />;
};

export default ProSelect;
