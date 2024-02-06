import React from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button } from 'poizon-design';
import { cloneDeep, throttle } from 'lodash';
import { formatDate } from '@/utils/common';
import UserSearch from '@/components/userSearch';
import { AddressBookItem } from './interface';
import { viewSecret } from './api';

const useColumns = (
  addressList: AddressBookItem[],
  setAddressList: React.Dispatch<React.SetStateAction<AddressBookItem[]>>,
  setRow: React.Dispatch<React.SetStateAction<AddressBookItem | undefined>>,
  setAddressShow: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const showDesensitizationInformation = async (
    id: number,
    fields: string,
    index: number,
    key: string,
  ) => {
    const res: any = await viewSecret({ id, fields: [fields] });
    if (!res) return;
    const cloneRes = cloneDeep(addressList);
    const reskey = fields.toLowerCase();
    const hideKey = `${key}Hide`;
    cloneRes[index][key] = res[reskey];
    cloneRes[index][hideKey] = true;
    setAddressList(cloneRes);
  };
  const columns: ProColumns<AddressBookItem, 'text'>[] = [
    {
      title: '运营姓名全拼',
      dataIndex: 'opAccount',
      fieldProps: { placeholder: '请输入运营姓名全拼' },
      renderFormItem: () => {
        return <UserSearch />;
      },
    },
    { title: '运营飞书姓名', dataIndex: 'feiShuName', hideInSearch: true },
    { title: '对外姓名', dataIndex: 'opName', hideInSearch: true },
    {
      title: '手机号码',
      dataIndex: 'contactPhone',
      hideInSearch: true,
      render(text, record, index) {
        return (
          <>
            {text}
            {record.contactPhoneHide ? null : (
              <Button
                type="link"
                onClick={throttle(() => {
                  const { id } = record;
                  showDesensitizationInformation(id, 'MOBILE', index, 'contactPhone');
                }, 200)}
              >
                查看
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: '微信号',
      dataIndex: 'contactWechat',
      hideInSearch: true,
      render(text, record, index) {
        return (
          <>
            {text}
            {record.contactWechatHide ? null : (
              <Button
                type="link"
                onClick={throttle(() => {
                  const { id } = record;
                  showDesensitizationInformation(id, 'WECHAT', index, 'contactWechat');
                }, 200)}
              >
                查看
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: '联系邮箱',
      dataIndex: 'contactEmail',
      hideInSearch: true,
      render(text, record, index) {
        return (
          <>
            {text}
            {record.contactEmailHide ? null : (
              <Button
                type="link"
                onClick={throttle(() => {
                  const { id } = record;
                  showDesensitizationInformation(id, 'EMAIL', index, 'contactEmail');
                }, 200)}
              >
                查看
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: '更新时间',
      dataIndex: 'modifyTime',
      hideInSearch: true,
      render(_, record) {
        return formatDate(record.modifyTime);
      },
    },
    {
      title: '更新人姓名',
      dataIndex: 'operator',
      hideInSearch: true,
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
            <Button
              type="link"
              onClick={async () => {
                const { id }: any = record;
                const secretRes: any = await viewSecret({
                  id,
                  fields: ['MOBILE', 'EMAIL', 'WECHAT'],
                });
                const initialValues = {
                  ...record,
                  contactPhone: secretRes.mobile,
                  contactEmail: secretRes.email,
                  contactWechat: secretRes.wechat,
                };
                setRow(initialValues);
                setAddressShow(true);
              }}
            >
              编辑
            </Button>
          </>
        );
      },
    },
  ];
  return columns;
};

export { useColumns };
