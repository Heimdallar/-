import React from 'react';
import { Button, Popover, Image, Space, message } from 'poizon-design';
import { useRequest } from 'ahooks';
import Copy from 'copy-to-clipboard';
import fetchRecommendLink from '@/services/base/fetchRecommendLinkAndCreateChannel';

export default function ProblemFeedback() {
  const { runAsync } = useRequest(() => fetchRecommendLink(), {
    manual: true,
  });

  return (
    <Space>
      <Button
        type="primary"
        onClick={async () => {
          const data = await runAsync();
          Copy(data?.data?.recommendLink || '');
          message.success('复制成功！');
        }}
      >
        获取PC专属推荐链接
      </Button>
      <Button
        type="primary"
        onClick={async () => {
          const data = await runAsync();
          Copy(data?.data?.h5RecommendLink || '');
          message.success('复制成功！');
        }}
      >
        获取H5专属推荐链接
      </Button>
      <Button
        type="primary"
        onClick={() => window.open('https://poizon.feishu.cn/docx/LRm4dzHkco2ws0xOyoFcGHMfnde')}
      >
        用户手册
      </Button>
      <Popover
        placement="bottom"
        content={
          <Image
            width={300}
            preview={false}
            loading="eager"
            src="https://cdn.poizon.com/node-common/74110dd0-da59-97de-c360-8600d296bc6f-1372-1488.png"
          />
        }
        trigger="click"
      >
        <Button type="primary">问题反馈</Button>
      </Popover>
    </Space>
  );
}
