import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button } from 'poizon-design';
import { defaultPagiSetting } from '@/config';
import { fetchCategoryConfigList } from './api/index';
import { CategoryItem, followFormItem } from './interface';
import { useColumns } from './useColumns';
import CategoryModal from './components/categoryModal';
import PlatformManagerModal from './components/platformManagerModal';

const BrandConfig: React.FC<any> = () => {
  const [categoryShow, setCategoryShow] = useState(false);
  const [row, setRow] = useState<followFormItem>();
  const actionRef = useRef<ActionType>();
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);

  const refreshList = () => {
    actionRef.current?.reload();
  };

  const columns = useColumns(setRow, setCategoryShow);

  return (
    <div data-trackid="cb58c098cdc69ad2-hgHbpw">
      <ProTable<CategoryItem>
        columns={columns}
        tableAlertRender={false}
        actionRef={actionRef}
        request={async (params = {}) => {
          const { current, pageSize, level1CategoryId, outsourcing, maintain, bd, administrators } =
            params;
          const requestParams: any = {
            ...(level1CategoryId ? { level1CategoryId } : {}),
            managerQryInfoList: [],
          };
          if (outsourcing) {
            requestParams.managerQryInfoList.push({
              followerType: 5,
              followerName: outsourcing,
            });
          }
          if (maintain) {
            requestParams.managerQryInfoList.push({
              followerType: 1,
              followerName: maintain,
            });
          }
          if (bd) {
            requestParams.managerQryInfoList.push({ followerType: 2, followerName: bd });
          }
          if (administrators) {
            requestParams.managerQryInfoList.push({
              followerType: 3,
              followerName: administrators,
            });
          }
          const resp: any = await fetchCategoryConfigList({
            ...requestParams,
            page: {
              pageNum: current,
              pageSize,
            },
          });
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.contents || [],
            total: resp.total,
          };
        }}
        rowKey={(record) => record.level1CategoryId + record.level1CategoryName + Date.now()}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
        }}
        headerTitle="配置列表"
        toolbar={{
          settings: [],
        }}
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...defaultPagiSetting, ...rest });
        }}
        toolBarRender={() => [
          <Button
            key="addCategoryShow"
            onClick={() => {
              setCategoryShow(true);
            }}
            type="primary"
          >
            新增配置
          </Button>,
          <PlatformManagerModal key="PlatformManager" />,
        ]}
        scroll={{ x: 1500 }}
      />
      {categoryShow && (
        <CategoryModal
          categoryShow={categoryShow}
          row={row}
          refreshList={refreshList}
          setRow={setRow}
          setCategoryShow={setCategoryShow}
        />
      )}
    </div>
  );
};
export default BrandConfig;
