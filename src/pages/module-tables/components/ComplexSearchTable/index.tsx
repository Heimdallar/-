import { FC, useCallback, useRef, useState } from 'react';
import { Button, Modal, Descriptions, message } from 'poizon-design';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { PlusLine } from '@poizon-design/icons';
import { useQuery } from '@/hooks';
import type { InterfaceRequest } from '@/utils/request';
import { pushRoute, WebRouteNameEnum } from '@/utils/navigator';
import { CustomBoundary } from '@/layouts/ErrorBoundary';
import { EditModalType } from '@/pages/module-tables/constants';
import { TableListInterface } from '@/pages/module-tables/service/api';
import { IEntityOrderList } from '@/pages/module-tables/entity';
import { useComplexColumns, useOrderList } from '@/pages/module-tables/hooks';
import { EditModal } from '@/pages/module-tables/components/EditModal';

type DataRequest = InterfaceRequest<typeof TableListInterface>;
type DataEntity = IEntityOrderList['contents'][0];

export const ComplexSearchTable: FC = () => {
  // 状态与参数
  const actionRef = useRef<ActionType>();
  const { merchantId } = useQuery<{ merchantId: string }>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<EditModalType>();
  const [modalInitalValue, setModalInitalValue] = useState<unknown>({});

  // 逻辑
  const {
    data: orderList,
    updating,
    fetchOrderList,
    purgeOrderItem,
    updateOrderItem,
    updateMerchant,
  } = useOrderList(merchantId);

  // 句柄
  const handleDeleteItem = useCallback(
    (orderId: string) => {
      Modal.confirm({
        title: '提示',
        content: '确认要在本地模式下删除该条数据?',
        onOk() {
          purgeOrderItem(orderId);
        },
        onCancel() {
          actionRef.current?.reload();
        },
      });
    },
    [purgeOrderItem],
  );

  const handeUpdateItem = useCallback(updateOrderItem, [orderList, updateOrderItem]);

  const handleExpandedRowRender = (record: IEntityOrderList['contents'][0]) => {
    const { userName, telephone, live, remark, address, isHNWI } = record.details;
    return (
      <Descriptions bordered>
        <Descriptions.Item label="UserName">{userName}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{telephone}</Descriptions.Item>
        <Descriptions.Item label="Live">{live}</Descriptions.Item>
        <Descriptions.Item label="Remark">{remark}</Descriptions.Item>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
        <Descriptions.Item label="isHNWI">{isHNWI}</Descriptions.Item>
      </Descriptions>
    );
  };

  const handleViewItemDetail = useCallback(() => {
    pushRoute({ name: WebRouteNameEnum.PAGE_DETAIL, params: {} });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSubmitItem = useCallback(
    (data: unknown, type: EditModalType) => {
      updateMerchant(data, type)
        .then(() => {
          message.success(`${type}条目成功`);
          setModalVisible(false);
        })
        .catch(() => {
          message.warn(`${type}条目失败`);
        });
    },
    [updateMerchant],
  );

  const handleOpenCreateModal = useCallback(() => {
    setModalInitalValue({});
    setModalType(EditModalType.CREATE);
    setModalVisible(true);
  }, []);

  const handleOpenEditModal = useCallback((record: unknown) => {
    setModalInitalValue(record);
    setModalType(EditModalType.EDIT);
    setModalVisible(true);
  }, []);

  const columns = useComplexColumns({
    handleDeleteItem,
    handleViewItemDetail,
    handleOpenEditModal,
  });

  return (
    <>
      {/* 查询列表主体 */}
      <ProTable<DataEntity, DataRequest>
        actionRef={actionRef}
        rowKey="id"
        headerTitle="高级查询列表"
        columns={columns}
        form={{
          ignoreRules: false,
        }}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          x: 'max-content',
        }}
        revalidateOnFocus={false}
        options={{
          reload: false,
          density: false,
        }}
        expandable={{ expandedRowRender: handleExpandedRowRender }}
        toolbar={{
          search: {
            onSearch: (value: string) => {
              console.log(value);
            },
          },
          actions: [
            <Button key="create" type="primary" onClick={handleOpenCreateModal}>
              <PlusLine />
              创建按钮
            </Button>,
          ],
          multipleLine: true,
          menu: {
            type: 'tab',
            activeKey: 'tab1',
            items: [
              {
                key: 'tab1',
                label: <span>筛选1</span>,
              },
              {
                key: 'tab2',
                label: <span>筛选2</span>,
              },
              {
                key: 'tab3',
                label: <span>筛选3</span>,
              },
            ],
            onChange: (key) => {
              console.log(key);
            },
          },
        }}
        request={fetchOrderList}
        editable={{
          type: 'multiple',
          onSave: async () => {
            handeUpdateItem();
          },
        }}
        columnsState={{
          persistenceKey: 'pro-complex-search-table',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log(value);
          },
        }}
        ErrorBoundary={CustomBoundary}
      />
      {/* 编辑与新增弹窗表单 */}
      <EditModal
        updating={updating}
        initialValue={modalInitalValue}
        type={modalType as EditModalType}
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitItem}
      />
    </>
  );
};
