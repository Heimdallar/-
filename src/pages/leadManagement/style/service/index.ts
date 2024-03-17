import { getApiUrl, proRequest as request } from '@/utils/request';
import { Item1, ReturnItem } from './interface';

export const edititem=async(params:{id:number,title:string,style:string,name:string,updated_at:number})=>{
    console.log(edititem,params)
    return(
      await  request('xxxx',params
        )
    )
}
export const deleteitem=async(params:{id:number})=>{
    console.log(deleteitem,params)
    return (
      await  request('',params.id)
    )
}

export const addnewitem= async(params:{title:string,style:string})=>{
    console.log(addnewitem,params)
    return(
      await  request('',[params.title,params.style])
    )
}

export const fetchData = async (params:{}) => {
    // try {
    //     // 发送查询请求的逻辑
    //     const response = await request<{ data: ReturnItem[] }>('', params);
    
    //     return response; // 返回实际的数据
    //   } catch (error) {
        // console.error('数据请求失败：', error);
        // 返回一个默认的数据作为备用
        const tableListDataSource: ReturnItem[] = [];
        for (let i = 0; i < 100; i += 1) {
          tableListDataSource.push({
            total: 100,
            id: i,
            name: 'AppName',
            title: 'xxj',
            url: 'addwas',
            updated_at: Date.now() - Math.floor(Math.random() * 100000),
            created_at: Date.now() - Math.floor(Math.random() * 100000),
            style: i % 2 === 1 ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴' : '简短备注文案',
          });
        }
        return Promise.resolve({
              data: tableListDataSource,
              success: true,
              total:100
            })
//   }
}

  export const fetchTitle=async():Promise<[]>=>{
    console.log(fetchTitle)
    const res=await request('')
    return res
  }
const apiGetUser = (params: {userid: number}) => request<{nickname: string}>('/api/getuser', params)
