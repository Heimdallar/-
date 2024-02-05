import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, Space, Tag } from 'poizon-design';
import { StyleItem } from './interface';
import StyleSearch from './components/styleSearch';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';


const useColumns = (setRow: React.Dispatch<React.SetStateAction<StyleItem | undefined>>, setStyleShow: React.Dispatch<React.SetStateAction<boolean>>) => {
  const columns = useMemo<ProColumns<StyleItem, "text">[]>(() => {
    return [
      {
        title: '一级类目名称',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 140,
        hideInSearch: false,
        renderFormItem: () => {
          return (
            <CategorySelect placeholder="请选择一级类目名称" />
          )
        }
      },
      {
        title: '风格',
        dataIndex: 'style',
        key: 'style',
        width: 150,
        render(text) {
          if (!text) return '--'
          const styleList = text.toString().split(',')
          return (
            styleList.map((item: string, idx: number) => 
              <Space key={item+idx}>
                <Tag>{item || '--'}</Tag>
              </Space>
            )
          )
        },
        renderFormItem: () => {
          return (
            <StyleSearch />
          )
        }
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        hideInSearch: true,
        width: 180,
      },
      {
        title: '更新人姓名',
        dataIndex: 'operator',
        key: 'operator',
        hideInSearch: true,
        width: 180,
      },
      {
        title: '操作',
        dataIndex: '',
        hideInSearch: true,
        fixed: 'right',
        width: 100,
        render(_, record) {
          return (
            <>
              <Button type='link' onClick={ async() => {
                const { style, ...rest } = record
                const initialValues = {
                  ...rest,
                  tags: style,
                  style,
                }
                setRow(initialValues)
                setStyleShow(true)
              }}>编辑</Button>
            </>
          )
        },
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
