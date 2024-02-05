import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button } from 'poizon-design';
import { default20PagiSetting } from '@/config';
import { fetchAddressList } from './api/index';
import { AddressBookItem } from './interface';
import { useColumns } from './useColumns';
import AddressModal from './components/addressModal';

const AddressBook: React.FC<any> = () => {
  const [addresList, setAddressList] = useState<AddressBookItem[]>([]);
  const [addressShow, setAddressShow] = useState(false);
  const [row, setRow] = useState<AddressBookItem>();
  const actionRef = useRef<ActionType>();
  const columns = useColumns(addresList, setAddressList, setRow, setAddressShow);
  const [pageInfo, setPageInfo] = useState(default20PagiSetting);

  const refreshList = () => {
    actionRef.current?.reload()
  }
  return (
    <div data-trackid="2e2f583bfb32909b-IYbZJs">
      <ProTable<AddressBookItem>
        columns={columns}
        tableAlertRender={false}
        dataSource={addresList}
        actionRef={actionRef}
        onDataSourceChange={setAddressList}
        request={async (params = {}) => {
          const { current, ...rest } = params;
          const resp: any = await fetchAddressList({
            ...rest,
            page: current,
          });
          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.contents || [],
            total: resp.total,
          };
        }}
        rowKey="id"
        pagination={{ ...pageInfo }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="通讯录列表"
        toolbar={{
          settings: [],
        }}
        onChange={(params) => {
          const { current, ...rest } = params;
          setPageInfo({ ...default20PagiSetting, ...rest });
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              setAddressShow(true)
            }}
            key='export'
            type='primary'>
            新增配置
          </Button>,
        ]}
        scroll={{ x: 1500 }}
      />
      <AddressModal
        addressShow={addressShow}
        row={row}
        refreshList={refreshList}
        setRow={setRow}
        setAddressShow={setAddressShow}
      />
    </div>
  );
};
export default AddressBook;
