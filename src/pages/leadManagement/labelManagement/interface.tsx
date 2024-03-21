export interface LabelItem {
    createTime:string;
    creator: string
    editor:string
    id: number
    labelChannel: number
    labelName: string
    remark: string
    status: number
    [key: string]: any
  }
  export interface EditLabelItem {
    createTime:string;
    creator: string
    editor:string
    id: number
    labelChannel: string
    labelName: string
    remark: string
    status: boolean;
    [key: string]: any
  }
  
  export const labelChannelOptions = {
    0: { text: '线下' },
    1: { text: '线上' },
    2: { text: '其他' },
  };
  export const statusOptions = {
    0: { text: '启用' },
    1: { text: '停用' },
  };
  