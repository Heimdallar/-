import { FC, useEffect, useState } from "react";
import ProSelect from "../..";
import { fetchData, fetchTitle } from "@/pages/leadManagement/style/service";
import { RequestOptionsType } from "@/utils/types";
import { Select } from "poizon-design";



const CategorySelect: React.FC<{
  /** Value 和 onChange 会被自动注入 */
  value?: string;
  placeholder:string,
  onChange?: (value: string) => void;
}> = (props) => {
  const {placeholder}=props
  const text=!placeholder?'请选择一级类目':placeholder
  const [innerOptions, setOptions] = useState([]);

  useEffect(() => {
      const fetchOrderList=async()=>{
      const data=await fetchTitle()
      if(!Array.isArray(data)) {
      
        setOptions([])
      }
     else{
      const options=data.map((item:any)=>{
        return {
         label: item.name,
         value:item.name
        }
      })
      setOptions(options)
     }
      }

      fetchOrderList()
    }
  , []);

  return <Select options={innerOptions} value={props.value} placeholder='请选择一级类目' onChange={props.onChange} />;
};


export default CategorySelect