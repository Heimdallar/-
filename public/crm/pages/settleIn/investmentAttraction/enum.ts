export enum StautsType {
  WAIT_SUBMIT = 0, // 运营保存活动，可执行操作--查看/编辑/查看日志
  WAIT_ADUIT = 1, // 运营提交活动，可执行操作--查看/编辑/查看日志
  REJECTED = 2, // 审批人驳回活动，可执行操作--查看/编辑/查看日志
  WAIT_START = 3, // 审核通过，但未达到活动开始时间，可执行操作--查看/编辑/作废/查看日志/获取链接
  RUNNING = 4, // 系统时间达到活动开始时间，可执行操作--查看/编辑/作废/查看日志/获取链接
  HAS_END = 5, // 系统时间达到活动结束时间，可执行操作--查看/查看日志
  INVAILD = 6, // 运营作废活动，可执行操作--查看/查看日志
}

export const StautsTypeOptions = [
  {
    label: '全部',
    value: '',
  },
  {
    label: '待提交',
    value: StautsType.WAIT_SUBMIT,
  },
  {
    label: '待审核',
    value: StautsType.WAIT_ADUIT,
  },
  {
    label: '审核驳回',
    value: StautsType.REJECTED,
  },
  {
    label: '未开始',
    value: StautsType.WAIT_START,
  },
  {
    label: '进行中',
    value: StautsType.RUNNING,
  },
  {
    label: '已结束',
    value: StautsType.HAS_END,
  },
  {
    label: '已作废',
    value: StautsType.INVAILD,
  },
];

export enum NEEDFILL_TYPE {
  公司名称 = 0,
  主营品牌 = 1,
  主营类目 = 2,
  联系人 = 3,
  联系电话 = 4,
  品牌资质类型 = 5,
}

export const needFill_options = [
  {
    value: 0,
    label: '公司名称',
    disabled: true,
  },
  {
    value: 3,
    label: '联系人',
    disabled: true,
  },
  {
    value: 4,
    label: '联系电话',
    disabled: true,
  },
  {
    value: 1,
    label: '主营品牌',
    disabled: true,
  },
  {
    value: 2,
    label: '主营类目',
    disabled: true,
  },
  {
    value: 5,
    label: '品牌资质类型',
    disabled: true,
  },
  {
    value: 6,
    label: '品牌类型',
  },
  {
    value: 7,
    label: '外网店铺渠道',
  },
  {
    value: 8,
    label: '店铺名称',
  },
  {
    value: 9,
    label: '店铺地址',
  },
  {
    value: 10,
    label: '年销售总金额（亿）',
  },
  {
    value: 11,
    label: '小红书帖子数',
  },
  {
    value: 12,
    label: '抖音官方账号粉丝数',
  },
];

export const cateLevel_options = [
  {
    value: 1,
    label: '一级类目',
  },
  {
    value: 3,
    label: '三级类目',
  },
];

export const qualification_options = [
  {
    value: 0,
    label: '品牌方',
  },
  {
    value: 1,
    label: '一二级授权经销商',
  },
  {
    value: 2,
    label: '非授权经销商',
  },
  {
    value: 3,
    label: '市场贸易商&扫货商',
  },
];

export enum Discount_Type {
  无折扣 = -1,
  有折扣 = 0,
}
