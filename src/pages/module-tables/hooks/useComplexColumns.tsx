import { ComponentProps, useMemo } from 'react';
import dayjs from 'dayjs';
import { message, Popconfirm, Switch, Tag, Input } from 'poizon-design';
import { ProColumns } from '@poizon-design/pro-table';
import { salePriceStatusOptions } from '@/pages/module-tables/constants';
import { IEntityOrderList } from '@/pages/module-tables/entity';
import { PageStoreContext } from '@/pages/module-tables/store';
import { Product } from '@/pages/module-tables/components/Cells/Product';
import { Controls, CustomSearchField } from '@/pages/module-tables/components';

type DataEntity = IEntityOrderList['contents'][0];

enum StateTypeEnum {
  EDIT = 0,
  CREATE = 1,
  START = 3,
  END = 4,
}

/** 状态和tags的映射 */
const statusTagMap: Record<DataEntity['status'], ComponentProps<typeof Tag>['color']> = {
  draft: 'default',
  wait: 'processing',
  success: 'success',
  fail: 'error',
};

export const useComplexColumns = (opts: {
  handleDeleteItem: (orderId: string) => void;
  handleViewItemDetail: (orderId: string) => void;
  handleOpenEditModal: (record: unknown) => void;
}) => {
  const { enums } = PageStoreContext.useContainer();
  const { handleDeleteItem, handleViewItemDetail, handleOpenEditModal } = opts;

  const columns = useMemo(() => {
    const ret: ProColumns<DataEntity>[] = [];

    // search
    const searchColumns: typeof ret = [
      {
        title: '标题',
        dataIndex: 'title',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },
      {
        title: '金额',
        dataIndex: 'amount',
        valueType: 'money',
        tip: '这里是对金额的补充描述',
        search: {
          transform: (value: string) => {
            return {
              money: Number(value) * 100,
            };
          },
        },
      },
      {
        title: '自定义组件',
        key: 'direction',
        hideInTable: true,
        dataIndex: 'direction',
        renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
          if (type === 'form') {
            return null;
          }
          const stateType = form.getFieldValue('state');
          if (stateType === StateTypeEnum.START) {
            return <Input />;
          }
          if (stateType === StateTypeEnum.END) {
            return null;
          }
          return (
            <CustomSearchField
              {...rest}
              state={{
                type: stateType,
              }}
            />
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: enums.status || {},
      },
      {
        title: '店铺类型',
        dataIndex: 'storeType',
        valueType: 'select',
        fieldProps: {
          options: salePriceStatusOptions,
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateRange',
        search: {
          transform: (value: string[]) => {
            return {
              createTimeStart: dayjs(value[0]).startOf('day').unix() * 1000,
              createTimeEnd: dayjs(value[1]).endOf('day').unix() * 1000,
            };
          },
        },
      },
    ];

    const dataColumns2: typeof ret = [
      {
        title: '商品信息',
        dataIndex: 'title',
        fixed: 'left',
        width: 300,
        render: (_, record) => <Product record={record} />,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        valueType: 'dateTime',
        sorter: (a, b) => a.createTime - b.createTime,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        filters: true,
        onFilter: true,
        valueEnum: enums.status || {},
        tooltip: '这是对状态的补充描述',
        render: (text, record) => {
          return <Tag color={statusTagMap[record.status] || 'default'}>{text}</Tag>;
        },
      },
      {
        title: '金额（元）',
        dataIndex: 'amount',
        valueType: 'money',
      },
      {
        title: '开关',
        dataIndex: 'enable',
        render: (_, record) => {
          return (
            <Popconfirm
              title={`确认${record.enable ? '关闭' : '打开'}吗？`}
              onConfirm={() => {
                message.info('调用开关接口');
              }}
            >
              <Switch checked={record.enable} />
            </Popconfirm>
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        valueType: 'option',
        key: 'option',
        fixed: 'right',
        render: (text, record) => {
          return (
            <Controls
              record={record}
              onDeleteItem={handleDeleteItem}
              onViewItem={handleViewItemDetail}
              onEditItem={handleOpenEditModal}
            />
          );
        },
      },
    ];

    ret.push(
      ...searchColumns.map((v) => {
        return { ...v, hideInTable: true };
      }),
      ...dataColumns2.map((v) => {
        return { ...v, hideInSearch: true };
      }),
    );

    return ret;
  }, [enums.status, handleDeleteItem, handleViewItemDetail, handleOpenEditModal]);

  return columns;
};
