import React from 'react';
import { Button, message } from 'poizon-design';
import { getPublicSeaClueTemplate } from '../../api/index';
import { isEmpty } from 'lodash';
import duTrack from '@du/track';

export default function DownloadTemplate() {
  return (
    <Button
      type="primary"
      onClick={async () => {
        try {
          const url: string = await getPublicSeaClueTemplate();
          if (isEmpty(url)) {
            return message.error('获取导入模板失败');
          }
          duTrack.sendClick({
            nodeId: 'publicSea_download_template',
            nodeType: 'NODE',
            nodeName: '公海-下载模板',
          });
          window.open(url);
        } catch (err) {
          message.error('获取导入模板失败');
        }
      }}
    >
      下载模板
    </Button>
  );
}
