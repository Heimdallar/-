import { useEffect, useState } from 'react';
import { Select } from 'poizon-design';

/** 根据业务场景自定义一个查询表单项 */

enum Type {
  TWO = 2,
}
export const CustomSearchField: React.FC<{
  state: {
    type: number;
  };
  /** Value 和 onChange 会被自动注入 */
  value?: string;
  onChange?: (value: string) => void;
}> = (props) => {
  const { state } = props;

  const [innerOptions, setOptions] = useState<
    {
      label: React.ReactNode;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const { type } = state || {};
    if (type === Type.TWO) {
      setOptions([
        {
          label: '星期一',
          value: 1,
        },
        {
          label: '星期二',
          value: 2,
        },
      ]);
    } else {
      setOptions([
        {
          label: '一月',
          value: 1,
        },
        {
          label: '二月',
          value: 2,
        },
      ]);
    }
  }, [state]);

  return <Select options={innerOptions} value={props.value} onChange={props.onChange} />;
};
