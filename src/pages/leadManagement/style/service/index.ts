import { proRequest as request  }from '@/utils/request';
import { Item1, ReturnItem } from './interface';

export const edititem=async(params:{id:number,categoryCreator:string,categoryStyleName:string,categoryOperator:string,modifyTime: Date;//更新时间
})=>{
    console.log(edititem,params)
    return(
      await  request('xxxx',params
        )
    )
}
export const deleteitem=async(params:{id:number})=>{
    console.log(deleteitem,params)
    return (
      await  request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/delete',params.id)
    )
}

export const addnewitem= async(params:{ categoryCreator:string,categoryStyleName:string,editorName?:string})=>{
    console.log(addnewitem,params)
    return(
      await  request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/addOrUpdate',params)
    )
}

export const fetchData = async (params:{page:1,pageSize:10,categoryName?:'',categoryStyleName?:''}) => {
    try {
        // 发送查询请求的逻辑
        const response = await request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/list',params,'POST'
        );
      console.log(response,'返回结果',params)
        return response; // 返回实际的数据
      } catch (error) {
        console.error('数据请求失败：', error);
        // 返回一个默认的数据作为备用
       
  }
}

  export const fetchTitle=async(params={})=>{
    
try{
  const res=await request('/youthcamp-mer-customer/g4/merchant/customer/brand/website/category/list',params,'GET')
  console.log(res,'类目配置')
  return res
}catch(error){
  console.error('类目数据请求失败：', error);

}
  }
