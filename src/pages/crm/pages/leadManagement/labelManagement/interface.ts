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