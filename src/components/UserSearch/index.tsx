import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'poizon-design';
import { debounce } from 'lodash';
import { getUserList } from './api';
import { UserProps } from './interface';
import { fetchTitle } from '@/pages/leadManagement/style/service';
const { Option } = AutoComplete;

const UserSearch = ({ disabled, onChange, value, placeholder = '请输入',...rest }: UserProps) => {
  
  const [result, setResult] = useState<string[]>([]);
  const handleSearch = debounce(async (searchText: string) => {
    let res: string[] = [];
    if (!searchText) {
      res = [];
    } else {
      const userRes: any = await fetchTitle();
      if (!userRes?.name) {
        res = [];
      } else {
        res = [userRes.name];
      }
    }
    console.log(res)
    setResult(res);
  }, 500);

  return (
    <AutoComplete 
      disabled={disabled}
      onSearch={handleSearch}
      value={value}
      allowClear
      onChange={onChange}
      onSelect={onChange}
      placeholder={placeholder}
    >
      {result.map((username) => (
        <Option key={username} value={username}>
          {username}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default UserSearch;
