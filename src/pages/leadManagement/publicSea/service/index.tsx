import { requestApi } from '@/utils/request';
import request from '@/utils/request';
import { IListItem, OperatesEnum } from '../interface';

const API_PREFIX = '/youthcamp-mer-customer';

/* 获取线索列表 */
export const getPublicSeaClueList = (queryParams:any) => {
  // return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/page`, { ...queryParams }, 'POST');

try{
  // console.log('get success',queryParams)
  const data:IListItem[]=[]
  
    for(let i=0;i<50;i++){
      data.push(
        {
          leadsId: i,
          brandName: `brand${i}`,
          mainCategory: 'liji',
          brandType: i * 2,
          source: i,
          status: 0,
          enterpriseName: 'meimeie',
          creator: 'situan',
          createTime: '10132942890',
          labelIds: ['h1', 'h2', 'h3'],
          leftProcessTimeDesc: '已超时',
          labelNames: ['l1', 'l2', 'l3'],
          leadsTypeDesc: 'bad',
          hitTagDesc: '已命中',
          modifyTime: '983274873',
          operate: [OperatesEnum.分配,OperatesEnum.认领,OperatesEnum.驳回],
          mainCategoryId: i*3,
          level2Category: '',
          level2CategoryId: i*5,
          categoryStyles: ['ada','wdwda'],
          timeoutDesc:'已超时',
          timeout:i/2==0?'1':'2'
        }
      )
    }
    return {
      data:data,
      success:true
    }
}
catch(e){
  console.log('获取线索列表失败',e)
}


};
//查询品牌
export const fetchIncludePredictApi=(params={})=>{

  try{
    const data=[
      {
        name: 'nike',
        id: 1,
      },
      {
        name: 'bike',
        id: 2,
      },
      {
        name: 'like',
        id: 3,
      }
    ]

    return {
      data:data
    }
  }
  catch(e){
    console.log('查询品牌失败',e)
  }
}



/* 新增线索 */
export const addPublicSeaClue = (queryParams:any) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/add`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
  );
};

/* 编辑线索 */
export const updatePublicSeaClue = (queryParams: any) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/update`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
  );
};

/* 获取线索详情 */
export const getPublicSeaClueDetail = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/detail`, params, 'GET');
};

/* 获取风格 */
export const getPublicSeaClueStyle = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/style`, params, 'GET');
};

/* 导入线索 (475版本修改：上传文件到OSS，任务中心异步处理) */
export const importPublicSeaClue = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/import`, { ...queryParams }, 'POST');
};

/* 导入文件 */
export const importData = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/file/task/importData`, { ...queryParams }, 'POST');
};

/* 走任务中心导出 */
export const importTask = (queryParams: {
  importFile: string;
  extInfo: Record<string, any>;
  taskTemplateCode: string;
  taskName: string;
}) => requestApi('/merchant-bpc/task-center/submitTask', queryParams, 'POST');


export const fetchClueDetailService=(params={})=>{
  return requestApi('',params,'GET')
}


/* 获取线索导入模板 */
export const getPublicSeaClueTemplate = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/template`, {}, 'GET');
};

/* 分配bd */
export const allotPublicSeaClue = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/allot`,
    { ...queryParams },
    'POST',
    '分配成功',
  );
};

/* 批量分配bd */
export const batchAllotPublicSeaClue = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/batchAllot`,
    { ...queryParams },
    'POST',
    // successMsg: '批量分配成功',
  );
};

/* 认领线索 */
export const claimPublicSeaClue = (queryParams: any) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/claim`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
  );
};

/* 批量认领线索 */
export const batchClaimPublicSeaClue = (queryParams: any) => {
  return request(
    `${API_PREFIX}/merchant/customer/leads/clue/batchClaim`,
    {
      method: 'POST',
      data: { ...queryParams },
    }
    // successMsg: '批量分配成功',
  );
};

/* 校验跟进人 */
export const checkCustomerAuthBusinessDeveloper = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/authBusinessDeveloper`, params, 'GET');
};

/* 获取类目列表 (gondor项目复制而来) */
export const getCategoryList = (queryParams: any) => {
  return requestApi('/commodity-admin/admin/category/list', { ...queryParams }, 'POST');
};

/* 获取管理者数据 (gondor项目复制而来) */
export const getManagerInfo = (params: any) => {
  return requestApi('/merchant/admin/merchant/queryManagerInfo', params, 'GET');
};

/* 根据名称获取品牌列表 (gondor项目复制而来) */
export const getBrandByName = (queryParams: any) => {
  return requestApi(
    '/commodity-admin/admin/brand/page-list',
    { ...queryParams },
    'POST',
  );
};

// 审核
export const approve = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/review`,
    { ...queryParams },
    'POST',
  );
};

// 获取风格list
export const getStyleList = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/style`, params, 'GET');
};

// 申请驳回
export const postReject = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/reject`,
    { ...queryParams },
    'POST',
  );
};

// 删除和批量删除线索
export const deleteLeadsId = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/del`,
    { ...queryParams },
    'POST',
  );
};

// 线索数据总览
export const getDataOverview = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/stat`,
    { ...queryParams },
    'POST',
  );
};

// 查看操作日志
export const getLog = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/log`,
    { ...queryParams },
    'POST',
  );
};

// 查看操作日志
export const getRejectReason = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/reason`, params, 'GET');
};

// 查看新版线索详情
export const getPublicSeaDesDetail = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/desDetail`, params, 'GET');
};

// 查看新版未脱敏数据
export const getPublicSeaRealMsg = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/plaintext`,
    { ...queryParams },
    'POST',
  );
};

// 查询标签列表
export const queryLabelList = (params: any) => {
  // return requestApi(`${API_PREFIX}/merchant/label/clue/selectLabel`, params, 'GET');
  try{
    const data=[]
    for(let i=0;i<10;i++){
      data.push(
        {
          title:'biao'+i,
          value:i
        }
      )
    }
    return data
  }catch(e){
    console.log('标签获取失败',e)
  }
};

// 备注新增
export const setRemark = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/remark`,
    { ...queryParams },
    'POST',
  );
};
// 驳回原因枚举
export const getRejectReasonList = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/rejectReasonList`, params, 'GET');
};

// 中台审核
export const centerAudit = (queryParams: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/center/review`,
    { ...queryParams },
    'POST',
  );
};

// 中台审核驳回原因枚举
export const getCenterRejectReasonList = (params: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/list/center/rejectReasonList`,
    params,
    'GET',
  );
};

// 类目查询(根据品牌id 等)
export const getCategoryListByBrand = (params: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/level1CategoryByBrand`,
    params,
    'GET',
  );
};

// 公海建联
export const publicSeaLink = (queryParams: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/link`, {
    ...queryParams
  }, 'POST');
}

// 获取投放渠道
export const getObtainChannels = () => {
  return requestApi(`${API_PREFIX}/merchant/customer/plan/channel/obtainChannels`, {
  }, 'POST');
}
