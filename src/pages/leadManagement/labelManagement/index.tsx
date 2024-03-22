import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@poizon-design/pro-table";
import { Select, Input, Button } from "poizon-design";
import { useState, useEffect } from "react";
import { fetchTitle } from "../style/service";

const MySelect: React.FC<{

  /** Value 和 onChange 会被自动注入 */
  value?: string;
  onChange?: (value: string) => void;
}> = (props) => {

  const [innerOptions, setOptions] = useState([]);

  useEffect(() => {
      const fetchOrderList=async()=>{
      const data=await fetchTitle()
      const options=data.map((item)=>{
        return {
         label: item.name,
         value:item.name
        }
      })
      setOptions(options)
      }

      fetchOrderList()
    }
  , []);

  return <Select options={innerOptions} value={props.value} placeholder={props.placeholder} onChange={props.onChange} />;
};

export default () => {
  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: '标题',
      dataIndex: 'name',
    },
    {
      title: '动态表单',
      key: 'direction',
      hideInTable: true,
      dataIndex: 'direction',
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {

        return (
          <MySelect
            {...rest}
            
          />
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      initialValue: 1,
      valueType: 'select',
      request: async () => [
        {
          label: '月份',
          value: 1,
        },
        {
          label: '周',
          value: 2,
        },
        {
          label: '自定义',
          value: 3,
        },
        {
          label: '不展示',
          value: 4,
        },
      ],
    },
  ];

  return (
    <ProTable<any>
      columns={columns}
      request={async (params) => {
        console.log(`request params:`, params);
        return {
          data: [
            {
              key: 1,
              name: `TradeCode ${1}`,
              createdAt: 1602572994055,
              state: 3,
            },
          ],
          success: true,
        };
      }}
      rowKey="key"
      tableLayout="fixed"
      dateFormatter="string"
      headerTitle="动态自定义搜索栏"
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <Button
            key="out"
            onClick={() => {
              const values = searchConfig?.form?.getFieldsValue();
              console.log(values);
            }}
          >
            导出
          </Button>,
        ],
      }}
      toolBarRender={() => [
        <Button key="3" type="primary">
          <PlusOutlined rev={undefined} />
          新建
        </Button>,
      ]}
    />
  );
};