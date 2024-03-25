import { proRequest as request } from "@/utils/request"
import { TableMultiItem ,TableSingleiItem} from "../interface";
export const fetchTableAll=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        const datas:TableMultiItem[]=[];
        console.log('tableall')
        for (let i = 1; i <= 50; i++) {
            datas.push({
                rankIndex: i,
                categoryName: `test${i}`,
                waitClaimAmount: i * 2,
                waitClaimTimeoutAmount: i * 3,
                waitFirstCommunicateAmount: i * 4,
                waitFirstCommunicateTimeoutAmount: i * 5,
                waitCommunicatResultAmount: i * 6,
                waitCommunicatResultTimeoutAmount: i * 7,
                waitEntryAmount: i * 8,
                waitEntryTimeoutAmount: i * 9,
                waitBiddingAmount: i * 10
            });
        }
        return {
                datas:datas,
                total:50
        }
    }
    catch(e){
        console.log('获取表格所有数据失败',e) 
    }
}
 export const fetchTableSingle=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        const datas:TableSingleiItem[]=[];
        console.log('tablesingle')
        for (let i = 1; i <= 50; i++) {
            datas.push({
                rankIndex: i,
                operatorName:`test${i}`,
                waitFirstCommunicateAmount: i * 4,
                waitFirstCommunicateTimeoutAmount: i * 5,
                waitCommunicatResultAmount: i * 6,
                waitCommunicatResultTimeoutAmount: i * 7,
                waitEntryAmount: i * 8,
                waitEntryTimeoutAmount: i * 9,
                waitBiddingAmount: i * 10
            });
        }
        // console.log(datas)
        return {
            datas:datas,
            total:50
        }
    }
    catch{

    }

 }
 export const fetchAllOverview=async(params={})=>{
 try{
        // const list=await request('',params,'GET')
        return {
            nums:[1,2,3,4,5],
            date:'2022/1/1',
        }
    }
    catch(e){
        console.log('获取所有类失败',e)
    }
 }
 export const fetchSingleOverview=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        // return list
        return {
            nums:[1,2,3,4,5],
            date:'2022/1/1',
        }
    }
    catch{
        
    }
 }

 export const fetchAllAchievedRate=async(params={})=>{
    try{
    //     const list=await request('',params,'GET')
    //    return list
            console.log('完成度multi名次')
            return {
               data:{
                data:[
                    {
                        randIndex:1, 
                        percent:89, 
                        label:'S1mple', 
                        value:346 
                    },
                    {
                        randIndex:2, 
                        percent:87, 
                        label:'Zywoo', 
                        value:330 
                    },


                ],
                total:2
               }
            }
    }
    catch(e){
       console.log('完成度multi名次失败',e)
    }
 }
export const fetchAllAmountRate=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        // return list

        console.log('数量multi名次')
        return {
           data:{
            data:[
               
                {
                    randIndex:1, 
                    percent:87, 
                    label:'Zywoo', 
                    value:399 
                },
                {
                    randIndex:2, 
                    percent:89, 
                    label:'S1mple', 
                    value:346 
                },

            ],
            total:2
           }
        }
    }
    catch(e){
        console.log('数量multi名次',e)
    }
}
 export const fetchSingleAmountRate=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        // return list
        console.log('数量single名次')
        return {
           data:{
            data:[
                {
                    randIndex:1, 
                    percent:78, 
                    label:'Niko', 
                    value:346 
                },
                {
                    randIndex:2, 
                    percent:75, 
                    label:'electronic', 
                    value:330 
                },


            ],
            total:2
           }
        }
    }
    catch(e){
        console.log('数量single名次',e)
    }
 }
 export const fetchAllGetRateMes=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        // return list
        console.log('all')
        return{
           
                data:{
                achievedTotalAmount:100, 
                achievedTotalRate:46, 
                bizDate:'2039/6/6', 
                targetTotalAmount:200
                }
        
        }
    }
    catch(e){
        console.log('饼图数据获取失败',e)
    }
 }
export const fetchSingleGetRate=async(params={})=>{
    try{
        // const list=await request('',params,'GET')
        // return list
        console.log('single')
        return{
           
                data:{
                achievedTotalAmount:50, 
                achievedTotalRate:87, 
                bizDate:'9302/9/9', 
                targetTotalAmount:100
                }
        
        }
    }
    catch{
        
    }
}