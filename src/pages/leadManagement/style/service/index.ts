import { getApiUrl, proRequest as request } from '@/utils/request';
import { Item1, ReturnItem } from './interface';

export const edititem=async(params:{id:number,categoryCreator:string,categoryStyleName:string,categoryOperator:string,modifyTime:number})=>{
   
   try{
    const res=await request('',params,'GET')
    console.log('编辑数据',res)
    return res
   }catch(e){
    console.log('修改数据失败',e)
   }
}
export const deleteitem=async(params:{id:number})=>{
    try{
        const res=await request('',params,'GET')
        console.log('删除数据',res)
        return res
       }catch(e){
        console.log('删除数据失败',e)
       }
}

export const addnewitem= async(params:{categoryCreator:string,categoryStyleName:string})=>{
    try{
        const res=await request('',params,'GET')
        console.log('新增数据',res)
        return res
       }catch(e){
        console.log('新增数据失败',e)
       }
}

export const fetchData = async (params:{pageSize:10,page:1}) => {
    try {
        // 发送查询请求的逻辑
        const response = await request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/list',params,'POST');

        // const response = await fetch('/youthcamp-mer-customer/g4/merchant/customer/brand/category/list', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       ...params,
        //       // 将查询约束放在 requestBody 中

        //     }),
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   });
          console.log('返回的结果',response,'参数为：',params)
        //   return await response.json();

        return response; // 返回实际的数据
      } catch (error) {
        console.error('数据请求失败：', error);
        // 返回一个默认的数据作为备用
        // const tableListDataSource: ReturnItem[] = [];
        // for (let i = 0; i < 100; i += 1) {
        //   tableListDataSource.push({
        //     total: 100,
        //     id: i,
        //     name: 'AppName',
        //     title: 'xxj',
        //     url: 'addwas',
        //     updated_at: Date.now() - Math.floor(Math.random() * 100000),
        //     created_at: Date.now() - Math.floor(Math.random() * 100000),
        //     style: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
        //   });
        console.log('列表请求数据失败',error)
        }
        // return Promise.resolve({
        //       data: tableListDataSource,
        //       success: true,
        //       total:100
        //     })
//   }
}

  export const fetchTitle=async(params={})=>{
    
    try{
        const res=await request('/youthcamp-mer-customer/g4/merchant/customer/brand/website/category/list',params,'GET')
        // const response=await request('/youthcamp-mer-customer/g4/merchant/customer/iea/obtainMeetings',params,'GET')

        // console.log('返回类目选项',response)
        console.log('xxxxxx',res)
        return res

    }catch(e){
        console.log('类目数据请求失败',e)
    }
  }
// const apiGetUser = (params: {userid: number}) => request<{nickname: string}>('/api/getuser', params)
