export interface TaskItem {
  id: number;
  fileName: string;
  workTypeName: string;
  taskType: number,
  createTime: string;
  endTime: string;
  status: number;
  fileKey?: string;
  successFileKey?: string;
  errorFileKey?: string;

}

export interface IListParams {
  creator: number
  fileType?: number
  fileName?: string
  createTimeStart?: number
  createTimeEnd?: number
  pageNum?: number
  pageSize?: number
}

export interface IFileDownloadParams {
  id: number
  type: 'success' | 'fail' | 'export'
}