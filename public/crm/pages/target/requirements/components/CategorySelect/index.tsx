import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import BusinessBasicSelect from '@/components/ProSelect/business/BusinessBasicSelect';
import { getCategoryList } from '../../api';
import Style from './index.less';

const CategorySelect: React.FC = (props: any) => {
  const { onChange, value, ...restProps } = props;
  const [categoryList, setCategoryList] = useState<{ label: string; value: number }[]>([]);
  const fetchCategoryList = async () => {
    const { clueCategoryFollowInfos }: any = (await getCategoryList()) || {};
    if (isEmpty(clueCategoryFollowInfos)) return [];
    const formatedRes = clueCategoryFollowInfos.map((item: any) => {
      return {
        label: item.level1CategoryName,
        value: item.level1CategoryId,
      };
    });
    setCategoryList(formatedRes);
    return formatedRes;
  };

  const handleChange = (value: any) => {
    onChange(categoryList.find((item) => item.value === value));
  };

  return (
    <>
      <BusinessBasicSelect
        showSearch
        allowClear
        value={value}
        onChange={handleChange}
        onSelect={handleChange}
        placeholder="请选择需求类目"
        className={`${Style.CategorySelect}`}
        optionFilterProp="label"
        loadAllRequest={fetchCategoryList}
        // dynamicLoadRequest={[]}
        {...restProps}
      />
    </>
  );
};

export default CategorySelect;
