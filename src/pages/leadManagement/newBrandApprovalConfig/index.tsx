import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { fetchCategoryStyleList, getMidGrdConfig, updateMidGrdConfig } from './api/index';
import { CategoryItem, editCategoryItem, FollowerInfo } from './interface';
import { useColumns } from './useColumns';
import { Button, message } from 'poizon-design';
import CategoryModal from './components/categoryModal';
import ProForm, { ModalForm, ProFormInstance } from '@poizon-design/pro-form';
import { isEmpty } from 'lodash';
import { configMaxTags } from './components/config';
import UserSelect from '@/components/ProSelect/business/UserSelect';
import { default20PagiSetting } from '@/config';

const BrandConfig: React.FC<any> = () => {
  const [categoryShow, setCategoryShow] = useState(false)
  const [configShow, setConfigShow] = useState(false)
  const [row, setRow] = useState<editCategoryItem>()
  const actionRef = useRef<ActionType>();
  const configRef = useRef<ProFormInstance>();
  const [ configValues, setConfigValues ] = useState<editCategoryItem>();
  const [pageInfo, setPageInfo] = useState(default20PagiSetting);

  const refreshList = () => {
    actionRef.current?.reload()
  }

  const columns = useColumns(setRow, setCategoryShow);

  return (
    <div data-trackid="cb1de5ffd1c976f0-hj8XLz">
      <ProTable<CategoryItem>
        columns={columns}
        tableAlertRender={false}
        actionRef={actionRef}
        request={async (params = {}) => {
          const { current, ...rest} = params
          const resp: any = await fetchCategoryStyleList({
            ...rest,
            page: current
          });
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.contents || [],
            total: resp.total,
          };
        }}
        rowKey="level1CategoryId"
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...default20PagiSetting, ...rest });
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="配置列表"
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Button
            key="getMidGrdConfig"
            onClick={async () => {
              const resp: any = await getMidGrdConfig();
              if (isEmpty(resp)) {
                setConfigShow(true);
                return;
              }
              const configRes = resp.map((item: FollowerInfo) => {
                return {
                  key: item.followerId,
                  label: item.followerName,
                  value: item.followerId,
                };
              });
              const configValues: editCategoryItem = {
                followerIdList: configRes,
              }
              setConfigValues(configValues);
              setConfigShow(true);
            }}
            type="primary"
          >
            中台初审配置
          </Button>,
          <Button
            key="setCategoryShow"
            onClick={() => {
              setCategoryShow(true);
            }}
            type="primary"
          >
            新增配置
          </Button>,
        ]}
        scroll={{ x: 1500 }}
      />
      <CategoryModal
        categoryShow={categoryShow}
        row={row}
        refreshList={refreshList}
        setRow={setRow}
        setCategoryShow={setCategoryShow}
      />
      <ModalForm
        visible={configShow}
        width={520}
        title="修改中台初审人员配置"
        formRef={configRef}
        initialValues={configValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onVisibleChange={(val) => {
          if (!val) {
            setConfigShow(false);
            setConfigValues(undefined)
          }
        }}
        modalProps={{
          maskClosable: false,
          centered: true,
          destroyOnClose: true,
        }}
        layout="horizontal"
        onFinish={async (values) => {
          const { followerIdList } = values
          const requestParams = {
            followerInfoList: [
              ...followerIdList.map(
                (item: any): FollowerInfo => ({
                  followerId: item.value,
                  followerName: item.label,
                }),
              ),
            ],
          }

          const res = await updateMidGrdConfig(requestParams);
          if (!res) return;
          message.success('操作成功');
          setConfigShow(false);
          setConfigValues(undefined)
        }}
      >
        <ProForm.Item
          label="中台审核人"
          name="followerIdList"
          rules={[{ required: true, message: '请输入中台审核人' }]}
          valuePropName="value"
        >
          <UserSelect labelInValue max={configMaxTags} dynamicLoad mode="multiple" />
        </ProForm.Item>
      </ModalForm>
    </div>
  );
};
export default BrandConfig;
