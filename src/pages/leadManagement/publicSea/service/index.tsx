import { requestApi } from '@/utils/request';
import request from '@/utils/request';
import { IListItem, OperatesEnum, statusEnum, statusOptions } from '../interface';
import { stringify } from 'querystring';

const API_PREFIX = '/youthcamp-mer-customer';
interface Data{
  basicdata:{
   leadsId?: number,
   brandInfo?: string,
   mainCategoryId?: string,
   brandType?: number,
   enterpriseName?:string,
   targetId?:number,
   labelNames?:string[]
}
outdata:{
 storeChannel?:string,
 storeName?:string,
 storeUrl?:string,
 recentThirtyTurnover?:number,
 fansNum?:number
}
contactdata:{
 contactName?:string,
 contactMobileNumber?:number,
 contactWechat?:number,
}
enterdata:{
 entryWilling?:string,
 enterpriseName ?:string,
 leadsIds?:number
}}

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
          status: i%5,
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
          timeout:String(i%3)
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


// 查看新版未脱敏数据
export const getPublicSeaRealMsg = (queryParams: any) => {
  // return requestApi(
  //   `${API_PREFIX}/merchant/customer/leads/clue/plaintext`,
  //   { ...queryParams },
  //   'POST',
  // );
 
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


/* 走任务中心导出 */
export const importTask = (queryParams: {
  importFile: string;
  extInfo: Record<string, any>;
  taskTemplateCode: string;
  taskName: string;
}) => requestApi('/merchant-bpc/task-center/submitTask', queryParams, 'POST');

// 详情
export const fetchClueDetailService=(params={})=>{
  // return requestApi('',params,'GET')
  try{
   
    const basicdata={
        leadsId: 114514,
        brandInfo: 'brandtest',
        mainCategoryId: 'man',
        brandType: 8848,
        enterpriseName:'dewuuu',
        targetId:2938,
        labelNames:['hahha','yeyeye']
    }
    const outdata=[]
    outdata.push({
      storeChannel:'tiktok',
      storeName:'Putin',
      storeUrl:'usrl',
      recentThirtyTurnover:6657,
      fansNum:90000
    })
    const contactdata=[]
   contactdata.push({
      contactName:'zmjkk',
      contactMobileNumber:1234456,
      contactWechat:1234456,
    })
    const enterdata={
      entryWilling:'带入住',
      enterpriseName :'dubai',
      leadsIds:1145222
    }
    
    const data={

      ...basicdata,
      outdata:outdata,
      contactdata:contactdata,
      ...enterdata,
    }

    console.log('详情查询','params',params,'contactdata',contactdata)
    return data
   
     
}
catch(e){

}
}


/* 获取线索导入模板 */
export const getPublicSeaClueTemplate = () => {
  // return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/template`, {}, 'GET');
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



/* 根据名称获取品牌列表 */
export const getBrandByName = (queryParams: any) => {
  return requestApi(
    '/commodity-admin/admin/brand/page-list',
    { ...queryParams },
    'POST',
  );
};



// 获取风格list
export const getStyleList = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/style`, params, 'GET');
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


// 驳回原因枚举
export const getRejectReasonList = (params: any) => {
  return requestApi(`${API_PREFIX}/merchant/customer/leads/clue/rejectReasonList`, params, 'GET');
};


// 类目查询(根据品牌id 等)
export const getCategoryListByBrand = (params: any) => {
  return requestApi(
    `${API_PREFIX}/merchant/customer/leads/clue/level1CategoryByBrand`,
    params,
    'GET',
  );
};

