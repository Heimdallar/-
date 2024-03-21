import { getApiUrl } from "@/utils/request";
import { proRequest as request } from "@/utils/request";


// export const fetchData = async (params:{}) => {
//     try {
//         // 发送查询请求的逻辑
//         const response = await request('/youthcamp-mer-customer/g4/merchant/customer/iea/obtainMeetings', params, 'GET');
//         console.log(response)
//         return response; 
//     } catch (error) {
//         console.log('列表请求数据失败', error)
//     }
// }


export const fetchData = (params:any) => {
    return request('/youthcamp-mer-customer/g4/merchant/customer/iea/obtainMeetings', params, 'GET');
}

export const postData = (params:any) => {
    return request('/youthcamp-mer-customer/g4/merchant/customer/iea/submit', params, 'POST')
}

export const fetchFormSubmitData = (params:any) => {
    return request('/youthcamp-mer-customer/g4/merchant/customer/iea/submit', params, 'GET')
}