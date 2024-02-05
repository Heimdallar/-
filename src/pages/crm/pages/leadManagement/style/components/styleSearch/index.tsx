import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'poizon-design';
import { debounce, isEmpty } from 'lodash';
import { getStyleSelectList } from './api';
import { TypeProps } from './interface';
const { Option } = AutoComplete;

const StyleSearch = ({ value, onChange }: TypeProps) => {
  
  const [result, setResult] = useState<string[]>([]);
  const handleSearch = debounce(async (searchText: string) => {
    let res: string[] = [];
    if (!searchText) {
      res = [];
    } else {
      const userRes: any = await getStyleSelectList({ style: searchText });
      if (isEmpty(userRes)) {
        res = [];
      } else {
        res = userRes;
      }
    }
    setResult(res);
  }, 500);

  useEffect(() => {
    if (value) {
      onChange(value)
    }
  }, [])

  return (
    <AutoComplete
      onSearch={handleSearch}
      value={value}
      allowClear
      onChange={onChange}
      onSelect={onChange}
      placeholder="请选择风格"
    >
      {result.map((username) => (
        <Option key={username} value={username}>
          {username}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default StyleSearch;
