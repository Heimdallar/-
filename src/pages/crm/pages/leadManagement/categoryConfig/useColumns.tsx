import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, Space, Tag } from 'poizon-design';
import { isEmpty, uniqBy } from 'lodash';
import { CategoryItem, FollowerInfo, FollowerInfoItem, followFormItem } from './interface';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import UserSearch from '@/components/userSearch';
import { formatDate } from '@/utils/common';


const useColumns = (setRow: React.Dispatch<React.SetStateAction<followFormItem | undefined>>, setCategoryShow: React.Dispatch<React.SetStateAction<boolean>>) => {
  const columns = useMemo<ProColumns<CategoryItem, "text">[]>(() => {
    return [
      {
        title: '一级类目名称',
        dataIndex: 'level1CategoryName',
        key: 'level1CategoryId',
        hideInSearch: false,
        renderFormItem: () => {
          return (
            <CategorySelect isIdValue placeholder="请输入一级类目名称" />
          )
        }
      },
      {
        title: '线索维护人',
        dataIndex: 'maintain',
        key: 'maintain',
        hideInSearch: false,
        render(_, record) {
          const categoryFellow1Item: FollowerInfoItem[] = record.categoryManagerList.filter((item: FollowerInfoItem) => item.followType === 1)
          if(!isEmpty(categoryFellow1Item)) {
            return (
              categoryFellow1Item[0].followerInfoList.map((item: FollowerInfo, idx: number) => 
                <Space key={item.followerId + idx + Math.random()}>
                  <Tag color="#01C2C3" >{item.followerName || '--'}</Tag>
                </Space>
              )
            )
          }
        },
        renderFormItem: () => {
          return (
            <UserSearch placeholder="请选择维护人" />
          )
        }
      },
      {
        title: '类目BD',
        dataIndex: 'bd',
        key: 'bd',
        hideInSearch: false,
        render(_, record) {
          const categoryFellow2Item: FollowerInfoItem[] = record.categoryManagerList.filter((item: FollowerInfoItem) => item.followType === 2)
          if(!isEmpty(categoryFellow2Item)) {
            return (
              categoryFellow2Item[0].followerInfoList.map((item: FollowerInfo, idx: number) => 
                <Space key={item.followerId + idx + Math.random()}>
                  <Tag color="#01C2C3" >{item.followerName || '--'}</Tag>
                </Space>
              )
            )
          }
        },
        renderFormItem: () => {
          return (
            <UserSearch placeholder="请输入跟进BD" />
          )
        }
      },
      {
        title: '类目管理员',
        dataIndex: 'administrators',
        key: 'administrators',
        hideInSearch: false,
        render(_, record) {
          const categoryFellow3Item: FollowerInfoItem[] = record.categoryManagerList.filter((item: FollowerInfoItem) => item.followType === 3)
          if(!isEmpty(categoryFellow3Item)) {
            return (
              categoryFellow3Item[0].followerInfoList.map((item: FollowerInfo, idx: number) => 
                <Space key={item.followerId + idx + Math.random()}>
                  <Tag color="#01C2C3" >{item.followerName || '--'}</Tag>
                </Space>
              )
            )
          }
        },
        renderFormItem: () => {
          return (
            <UserSearch placeholder="请输入管理员" />
          )
        }
      },
      {
        title: '更新时间',
        dataIndex: 'modifyTime',
        key: 'modifyTime',
        hideInSearch: true,
        width: 180,
        render(_, record) {
          const { modifyTime } = record.categoryManagerList[0]?.followerInfoList[0]
          return (
            <>
              { formatDate(modifyTime) }
            </>
          )
        }
      },
      {
        title: '更新人姓名',
        dataIndex: 'editor',
        key: 'editor',
        hideInSearch: true,
        width: 180,
        render(_, record) {
          const { editor } = record.categoryManagerList[0]?.followerInfoList[0]
          return (
            <>
              { editor }
            </>
          )
        }
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
                const { level1CategoryId, level1CategoryName, categoryManagerList } = record
                const categoryFellow1 = categoryManagerList.filter(item  => item.followType === 1)
                const categoryFellow2 = categoryManagerList.filter(item  => item.followType === 2)
                const categoryFellow3 = categoryManagerList.filter(item  => item.followType === 3)
                const categoryFellow5 = categoryManagerList.filter(item  => item.followType === 5)
                
                const initialValues = {
                  level1Category: {
                    key: level1CategoryId,
                    label: level1CategoryName,
                    value: level1CategoryId,
                  },
                  maintain: uniqBy(categoryFellow1[0]?.followerInfoList || [], 'followerId')?.map(item => {
                    return {
                      key: item.followerId,
                      label: item.followerName,
                      value: item.followerId,
                    }
                  }),
                  bd: uniqBy(categoryFellow2[0]?.followerInfoList || [], 'followerId')?.map(item => {
                    return {
                      key: item.followerId,
                      label: item.followerName,
                      value: item.followerId,
                    }
                  }),
                  administrators: uniqBy(categoryFellow3[0].followerInfoList || [], 'followerId')?.map(item => {
                    return {
                      key: item.followerId,
                      label: item.followerName,
                      value: item.followerId,
                    }
                  }),
                  outsourcing: uniqBy(categoryFellow5[0]?.followerInfoList || [], 'followerId')?.map(item => {
                    return {
                      key: item.followerId,
                      label: item.followerName,
                      value: item.followerId,
                    }
                  }),
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
