import { getRequirementTemplate } from ".";
import { isEmpty } from "lodash";
import { importTask } from "@/pages/settleIn/applyReview/api";
import { IApiResult } from "./interface";


// 处理导入的文件
export const execImportTask = async (file: { key: string}): Promise<IApiResult> => {
  if (isEmpty(file)) return {};
  const param = {
    importFile: file.key,
    extInfo: {},
  };
  const result = await importTask({
    taskTemplateCode: `merchant_customer_investment_import`,
    taskName: `招商需求导入`,
    param,
  });
  if (result && !(result instanceof Error)) {
    return {
      success: true,
      message: '导入任务创建成功'
    }
  }
  return {
    success: false,
    message: '导入失败，请稍后再试'
  }
}

// 处理获取导入文件模板
export const getImportTemplate = async (): Promise<IApiResult> => {
  const url: any = await getRequirementTemplate();
  if (isEmpty(url) || typeof url !== 'string') {
    return {
      success: false,
      message: '获取导入模板失败'
    }
  }
  return {
    data: url,
  }
}
