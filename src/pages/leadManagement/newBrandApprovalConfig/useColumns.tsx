import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, Space, Tag } from 'poizon-design';
import { CategoryItem, editCategoryItem } from './interface';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import UserSearch from '@/components/userSearch';


const useColumns = (setRow: React.Dispatch<React.SetStateAction<editCategoryItem | undefined>>, setCategoryShow: React.Dispatch<React.SetStateAction<boolean>>) => {
  const columns = useMemo<ProColumns<CategoryItem, "text">[]>(() => {
    return [
      {
        title: '一级类目名称',
        dataIndex: 'level1CategoryName',
        key: 'level1CategoryId',
        width: 140,
        hideInSearch: false,
        renderFormItem: () => {
          return (
            <CategorySelect isIdValue placeholder="请选择一级类目名称" />
          )
        }
      },
      {
        title: '申请审核人',
        dataIndex: 'followerInfoList',
        key: 'auditPName',
        width: 150,
        render(_, record) {
          const followerList = record.followerInfoList.map((item) => item.followerName)
          return (
            followerList.map((item: string, idx: number) => 
              <Space key={item+idx}>
                <Tag color="#01C2C3" >{item || '--'}</Tag>
              </Space>
            )
          )
        },
        
        renderFormItem: () => {
          return (
            <UserSearch  placeholder="请输入申请审核人姓名全拼" />
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
                const { level1CategoryId, level1CategoryName, followerInfoList } = record
                
                const initialValues = {
                  level1Category: {
                    key: level1CategoryId,
                    label: level1CategoryName,
                    value: level1CategoryId,
                  },
                  followerIdList: followerInfoList?.map(item => {
                    return {
                      key: item.followerId,
                      label: item.followerName,
                      value: item.followerId,
                    }
                  })
                }
                setRow(initialValues)
                setCategoryShow(true)
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
