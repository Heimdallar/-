import { Form,Modal,Input } from "poizon-design"
import { useState } from "react";
export default function Addnew(){
    const [visiable,setvisiable]=useState(false)
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
   
    return(
       


<Form
name="basic"
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
initialValues={{ remember: true }}
onFinish={onFinish}
onFinishFailed={onFinishFailed}
autoComplete="off"
>
<Form.Item
  label="类目名称"
  name="title"
>
  <Input />
</Form.Item>

<Form.Item
  label="风格"
  name="style"
>
  <Input />
</Form.Item>


</Form>
    )

}