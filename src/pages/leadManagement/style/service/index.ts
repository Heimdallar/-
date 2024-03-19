import { proRequest as request  }from '@/utils/request';
import { Item1, ReturnItem,FetchDataParams } from './interface';

export const edititem=async(params:{id?:string,categoryName?:string,categoryStyleName?:string[],editorName?:string;
})=>{
    try{
      const res= await  request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/addOrUpdate',
       params
      )
      console.log('编辑请求发送',params)
      return(
          res
      )
    }
    catch(e){
      console.log('编辑失败',e)
    }
    
}
export const deleteitem=async(params:{id:string})=>{
    
    try{
      const res=await request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/delete',params)
      console.log('删除请求发送',params)
      return res
    }catch(e){
      console.log('删除失败',e)
    }
}

export const addnewitem= async(params:{ categoryName:string,categoryStyleName:string[],editorName?:string})=>{
    try{

    const res=  edititem(params)
      console.log('新建请求',res)
      return res
    }catch(e){console.log('新建失败' ,e)}
   
}

export const fetchData = async (params:FetchDataParams) => {
    try {
        // 发送查询请求的逻辑
        const response = await request('/youthcamp-mer-customer/g4/merchant/customer/brand/category/list',params,'POST'
        );
      console.log(response.contents,'返回结果',params)
      const showdata=response.contents?.map((item:any)=>{
        return <ReturnItem>{
          id: item.id,
          categoryName: item.categoryName,//一级类目
          categoryOperator: item.categoryOperator,//创建人姓名
          categoryStyleName: item.categoryStyleName,//风格
          createTime:item.createTime,//创建时间
          modifyTime: item.modifyTime,//更新时间
        }
      })
        return {
          data:showdata,
          success:true
        }// 返回实际的数据
      } catch (error) {
        console.error('数据请求失败：', error);
        // 返回一个默认的数据作为备用
       
  }
}

  export const fetchTitle=async(params={})=>{
    
try{
  const res=await request('/youthcamp-mer-customer/g4/merchant/customer/brand/website/category/list',params,'GET')
  console.log(res,'类目配置')
  const showtitle=res.map((item:any)=>{
    return {
      id:item.id,
      name:item.name
    }
  })
  return res
}catch(error){
  console.error('类目数据请求失败：', error);

}
  }

