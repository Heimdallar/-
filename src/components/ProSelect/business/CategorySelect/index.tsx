import React from 'react';
import { isEmpty } from 'lodash';
import { ProSelectProps } from '../../index';
import { getCategoryList } from '../../api';
import BusinessBasicSelect from '../BusinessBasicSelect';
import Style from './index.less';

type CategorySelect = {
  dynamicLoad?: boolean;
  isIdValue?: boolean;
  pid?: number;
  isSecond?: boolean;
} & ProSelectProps;

// const INIT_DYNAMIC_PARAMS = { pageSize: 50, pageNum: 1 };

const CategorySelect: React.FC<CategorySelect> = (props) => {
  const { className, value, onChange, isIdValue, pid, isSecond, ...restProps } = props;
  const fetchCategoryList = async () => {
    const params = {
      pid: pid || 0,
      queryType: isSecond ? 1 : 0,
      treeFlag: true,
      spuCountFlag: false,
    };
    const categoryListRes: any = await getCategoryList(params);
    if (isEmpty(categoryListRes) || (isSecond && !pid)) return [];
    const formatedRes = categoryListRes.map((item: any) => {
      return {
        label: item.name,
        value: isIdValue ? item.id : item.name,
      };
    });
    return formatedRes;
  };

  return (
    <>
      <BusinessBasicSelect
        showSearch
        allowClear
        value={value}
        onChange={onChange}
        onSelect={onChange}
        again={pid}
        className={`${Style.CategorySelect} ${className}`}
        optionFilterProp="label"
        loadAllRequest={fetchCategoryList}
        // dynamicLoadRequest={[]}
        {...restProps}
      />
    </>
  );
};

export default CategorySelect;
