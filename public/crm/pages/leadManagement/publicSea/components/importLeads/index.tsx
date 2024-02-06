import React from 'react';
import { message } from 'poizon-design';
import { handleNotify } from '@/components/handleNotify';
import { importTask } from '../../api/index';
import { isEmpty } from 'lodash';
import duTrack from '@du/track';
import ProUpload, { UploadScene } from '@/components/ProUpload/index';

export default function ImportLeads() {
  return (
    <ProUpload
      bizCode="merchant_entry"
      accept=".xlsx"
      customBtn
      btnText="导入线索"
      buttonProps={{
        type: 'primary',
      }}
      onClick={() => {
        duTrack.sendClick({
          nodeId: 'publicSea_import_clue',
          nodeType: 'NODE',
          nodeName: '公海-导入线索',
        });
      }}
      size={30}
      scene={UploadScene.crm}
      onUploadSuccess={async (file) => {
        if (isEmpty(file)) return;
        try {
          const param = {
            importFile: file.key,
            extInfo: {},
          };
          const result = await importTask({
            taskTemplateCode: `merchant_leads_public_import`,
            taskName: `招商系统-导入线索单`,
            param,
          });
          if (result) {
            handleNotify('导入任务创建成功');
          } else {
            message.error('导出失败，请稍后再试');
          }
        } catch (err) {
          console.error('导入文件失败', err);
        }
      }}
    />
  );
}
