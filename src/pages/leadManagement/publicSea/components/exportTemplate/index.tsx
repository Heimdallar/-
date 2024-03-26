import React from 'react';
import { Button, message, } from 'poizon-design';
import {
  importTask,
} from '../../service';
interface InProps {
  exportParams: any
}
export default function ExportTemplate({ exportParams }: InProps) {

  return (
    <Button
      type="primary"
      onClick={async () => {
        const result = await importTask({
          taskTemplateCode: `merchant_leads_public_export`,
          taskName: `公海线索导出`,
          param: JSON.parse(JSON.stringify(exportParams)),
        });
        if (result) {
          alert('导出任务创建成功');
        } else {
          message.error('导出失败，请稍后再试');
        }
      }}
    >
      导出线索
    </Button>
  );
}
