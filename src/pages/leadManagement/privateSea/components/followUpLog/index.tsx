import { Space, Typography } from 'poizon-design';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useRequest } from 'ahooks';
import { getLog } from '../../api';
import { setOperateDescList } from '../../util';
import Styles from './index.module.less';

const { Text } = Typography;
type Props = {
  leadsId: number;
  fromPage?: number;
};
const FollowUpLog = forwardRef(({ leadsId, fromPage }: Props, ref) => {
  const { data = [], refresh } = useRequest(async () => {
    const requestParams = {
      page: 1,
      pageSize: 200,
      leadsId,
      fromPage,
    };
    const resp = await getLog(requestParams);
    const list = setOperateDescList(resp.datas || []);
    return list || [];
  });
  useImperativeHandle(ref, () => {
    return {
      refresh,
    };
  });

  return (
    <div className={Styles.followUp}>
      <div className={Styles.followUpTitle}>跟进记录</div>
      <Space direction="vertical" size={16}>
        {data.map((item, index: number) => {
          return (
            <Space align="start" size={1} key={index}>
              <div className={Styles.charactar}></div>
              <div>
                <Space size={3} wrap={true}>
                  <Text
                    style={{ width: item.operateRole ? 120 : 2, color: '#dcdce6' }}
                    ellipsis={{ tooltip: item.operateRole }}
                  >
                    {item.operateRole}
                  </Text>
                  <span>{item.operator}</span>
                  <span>{item.operateTime}</span>
                  <span>{item.operateType}</span>
                </Space>
                <div>
                  <span>操作内容：</span>
                  <span dangerouslySetInnerHTML={{ __html: item.operateDesc || '-' }}></span>
                </div>
              </div>
            </Space>
          );
        })}
      </Space>
    </div>
  );
});

export default FollowUpLog;
