/* 任务类型 */
export const taskTypeOptions = {
  4003: { text: '线索导入' },
  4002: { text: '申请单导入' },
  4001: { text: '申请单导出' },
  4004: { text: '审批单导入' },
  4005: { text: '审批单导出' },
  4006: { text: '私海线索导出' },
  4007: { text: '招商品牌库导入' },
  4008: { text: '公海线索导出' },
  4009: { text: '招商需求导入' },
  4010: { text: '招商需求导出' },
  4011: { text: '招商品牌库标签导入'},
  4012: { text: '店铺标签导入'},
};

/* 任务状态 */
export const taskStatusOptions = [
  { label: '待处理', value: 0 },
  { label: '进行中', value: 1 },
  { label: '已完成', value: 2 },
  { label: '失败', value: 3 },
];
const WAITING_FOR_HANDLE = 0;
const IS_PROCESSING = 1;
export const IS_COMPLETED = 2;
const FAILED = 3;

export const StatusDescMap = new Map([
  [
    WAITING_FOR_HANDLE,
    {
      type: 'warning',
      label: '待处理',
    },
  ],
  [
    IS_PROCESSING,
    {
      type: 'processing',
      label: '进行中',
    },
  ],
  [
    IS_COMPLETED,
    {
      type: 'success',
      label: '已完成',
    },
  ],
  [
    FAILED,
    {
      type: 'error',
      label: '失败',
    },
  ],
]);
