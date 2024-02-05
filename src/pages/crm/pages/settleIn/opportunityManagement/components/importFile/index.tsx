import React from 'react';
import { message } from 'poizon-design';
import { handleNotify } from '@/components/handleNotify';
import { importTask } from '../../api/index';
import { isEmpty } from 'lodash';
import duTrack from '@du/track';
import ProUpload, { UploadScene } from '@/components/ProUpload/index';

interface InProps {
  btnText: string,
  taskTemplateCode: string,
  taskName: string,
}

export default function ImportFile({ btnText, taskTemplateCode, taskName }: InProps) {
  return (
    <ProUpload
      bizCode="merchant_entry"
      accept=".xlsx"
      customBtn
      btnText={btnText}
      buttonProps={{
        type: 'primary',
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
            taskTemplateCode,
            taskName,
            param,
          });
          if(result.code !== 200) return
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
