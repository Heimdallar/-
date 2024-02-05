export interface pageConfigProps {
  title: string
  bannerImgs: string[]
  needFill: string[]
  explain: string
}

export interface discountPoundageInfoProps {
  id: number
  activityId: number
  discount: number
  cateLevel: number
  qualification: number[]
}

export interface datasProps {
  id: number
  encodedId: string
  name: string
  creatorId: number
  creatorName: string
  status: number
  statusStr: string
  startTime: number
  endTime: number
  estimateUserCount: number
  desc: string
  preferentialPolicy: number
  pageConfig: pageConfigProps
  invitationCodeStartTime: number
  invitationCodeEndTime: number
  rejectReason: string
  feishuInstanceId: string
  createTime: number
  modifyTime: number
  discountPoundageInfo: discountPoundageInfoProps
}

export interface ListProps {
  page?:number
  pageSize?: number
  total?: number
  pages?: number
  datas: datasProps[]
}