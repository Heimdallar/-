import { ProDescriptionsItemProps } from '@poizon-design/pro-descriptions';
import queryString from 'query-string';
import { Typography } from 'poizon-design';
import { useMemo } from 'react';
import { getGondorDomain } from '../../util';
const { Text } = Typography

const useEnterpriseEnterColumns = () => {
  const columns = useMemo<ProDescriptionsItemProps[]>(() => {
    return [
      {
        title: '入驻进度',
        dataIndex: 'enterStatusName',
        render(_, record) {
          return (
            <>
              <Text style={{ width: 80 }} ellipsis={{ tooltip: record.enterStatusName }}>
                {record.enterStatusName || '-'}
              </Text>
              {(record.merchantId || record.userId) && (
                <a
                  onClick={() => {
                    const { merchantType, merchantId, userId, enterEnterpriseAccount } =
                      record || {};
                    const urlPath =
                      merchantType === 1
                        ? '/personalBusinessManagement/list' // 个人商家
                        : '/settleInApproval/index'; // 商家入驻审核（新）
                    const params = queryString.stringify({
                      merchantId,
                      userId,
                      enterEnterpriseAccount,
                    });
                    window.open(
                      `${location.protocol}//${getGondorDomain()}/main/merchant${urlPath}${
                        params ? `?${params}` : params
                      }`,
                      '_blank',
                    );
                  }}
                >
                  查看详情
                </a>
              )}
            </>
          );
        },
      },
      {
        title: '商家merchantID',
        dataIndex: 'merchantId',
        ellipsis: true,
        contentStyle: {
          maxWidth: 160,
        }
      },
      {
        title: '商家userID',
        dataIndex: 'userId',
        ellipsis: true,
        contentStyle: {
          maxWidth: 160,
        }
      },
      {
        title: '入驻企业名称',
        dataIndex: 'enterEnterpriseName',
        ellipsis: true,
        contentStyle: {
          maxWidth: 110,
        }
      },
      {
        title: '入驻商家账号',
        dataIndex: 'enterEnterpriseAccount',
        ellipsis: true,
        contentStyle: {
          maxWidth: 110,
        }
      },
      {
        title: '入驻企业法人姓名',
        dataIndex: 'enterEnterpriseLegalName',
        ellipsis: true,
        contentStyle: {
          maxWidth: 110,
        }
      },
    ];
  }, []);
  return columns;
};
export default useEnterpriseEnterColumns;
