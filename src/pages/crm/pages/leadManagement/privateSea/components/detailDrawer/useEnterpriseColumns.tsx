import { ProDescriptionsItemProps } from '@poizon-design/pro-descriptions';
import { Tag } from 'poizon-design';
import { useMemo } from 'react';
import { statusColor } from '../../contant';

const useEnterpriseColumns = () => {
  const columns = useMemo<ProDescriptionsItemProps[]>(() => {
    return [
      {
        title: '联系人姓名',
        dataIndex: 'contactName',
        ellipsis: true,
      },
      {
        title: '联系人职位',
        dataIndex: 'contactTitle',
        ellipsis: true,
      },
      {
        title: '联系人手机号码',
        dataIndex: 'contactMobileNumber',
        ellipsis: true,
        render: (_, record) => {
          const statusObj = statusColor[record.contactMobileStatus];
          return (
            <>
              {statusObj && (
                <Tag color={statusObj.color}>
                  {statusObj.desc}
                  {record.mobileInvalidReason ? `-${record.mobileInvalidReason}` : ''}
                </Tag>
              )}
              {record.contactMobileNumber}
            </>
          );
        },
      },
      {
        title: '联系座机号码',
        dataIndex: 'contactTelephone',
        ellipsis: true,
        render: (_, record) => {
          const statusObj = statusColor[record.contactTelephoneStatus];
          return (
            <>
              {statusObj && (
                <Tag color={statusObj.color}>
                  {statusObj.desc} {record.telInvalidReason ? `-${record.telInvalidReason}` : ''}
                </Tag>
              )}
              {record.contactTelephone}
            </>
          );
        },
      },
      {
        title: '联系微信号',
        dataIndex: 'contactWechat',
        ellipsis: true,
      },
      {
        title: '联系微博',
        dataIndex: 'contactWeibo',
        ellipsis: true,
      },
      {
        title: '联系邮箱',
        dataIndex: 'contactEmail',
        ellipsis: true,
      },
    ];
  }, []);
  return columns;
};
export default useEnterpriseColumns;
