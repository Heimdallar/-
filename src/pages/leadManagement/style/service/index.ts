import { getApiUrl, proRequest as request } from '@/utils/request';

export const edititem=(params:{id:number,title:string,style:string})=>{
    console.log(edititem,params)
    return(
        request('xxxx',params
        )
    )
}
export const deleteitem=(params:{id:number})=>{
    console.log(deleteitem,params)
    return (
        request('',params)
    )
}

export const addnewitem=(params:{title:string,style:string})=>{
    console.log(addnewitem,params)
    return(
        request('',params)
    )
}
const apiGetUser = (params: {userid: number}) => request<{nickname: string}>('/api/getuser', params)
