import { JobRelationEnum } from '../constants';

type TimeType = 'fullTime' | 'partTime' | 'home';

export type IResultDetailData = {
  name: string;
  nick: string;
  age: string;
  country: string;
  type: string;
  number: string;
  sign: string;
  expiration: string;
  email: string;
  address: string;
  employeeNo: string;
  workRelations: JobRelationEnum;
  organization: string;
  job: string;
  timeType: TimeType;
  directManager: string;
  serviceTime: string;
  entryDate: string;
  business: string;
  workingYears: string;
  orkProgress: string;
  idPhoto: string;
  updateTime: string;
  demandList: Record<string, string | number>[];
};

export type IResultModalDetailData = {
  categoryName: string;
  productTitle: string;
  color: string;
  name: string;
  applyNo: string;
  paidNo: string;
  createTime: string;
  upTime: string;
  time: string;
  hour: string;
  price: string;
  section: string;
  min: string;
  bail: string;
  ratio: string;
  image: string;
};
