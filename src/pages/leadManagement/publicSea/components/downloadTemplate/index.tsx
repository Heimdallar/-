import React from 'react';
import { Button, message } from 'poizon-design';
import { getPublicSeaClueTemplate } from '../../service';
import { isEmpty } from 'lodash';

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
