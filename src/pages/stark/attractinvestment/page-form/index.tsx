import { Form, Input, Checkbox,Select } from 'poizon-design';
import { fetchData, postData } from '../service';
import styles from './index.less'
import { useEffect, useState } from 'react';
import { NoticeType } from 'poizon-design/lib/message';
import { values } from 'lodash';

interface Activity {
  id:number;
  state: number;
  activityName: string;
  activityDesc: string;
  startTime: string;
  endTime: string;
  catogories: string;
  holdAddress: string
}

const Pageform = (props:any) => {
  const { onFormSubmit, formref }=props
  const { Option } = Select;

  const [ activities, setActivities ] = useState<Activity[]>([]);

  const [formData, setFormData] = useState({
    activityId:'',
    userId:'',
    activityInvitingCode:'',
    emailAddress:'',
    companyName: '',
    brandName: '',
    categoryNames: '',
    contactPerson: '',
    phoneCall:'',
    certificateType:'',
    brandType:'',
    sellWays:'',
    shopName:'',
    shopLink:'',
    productNum:'',
    productValue:'',
    companyValue:'',
    fansRed:'',
    fansTiktok:'',
  });

  useEffect(() => {
    fetchData({})
        .then(setActivities)
        .catch(console.error)
  },[])

  return (
    <Form name="basic" labelCol={{span: 8}} wrapperCol={{span: 16}} initialValues={{remember: false}} 
      form={formref}
      onFinish={(v)=>{
        console.log(v, 'vvv')
      }}
      autoComplete="off">
      
      {/* <Form.Item name="activityId" label="活动ID" rules={[{required: true,message: '请输入活动ID'}]}> */}
        {/* <Input className={styles.ContactInfo} value={formData.activityId} placeholder='请输入活动ID'/> */}
        {/* <Select value={formData.activityId} placeholder="请输入活动ID" >
          {activities.map((activity) => (<Option value={activity.id}>{activity.id}</Option>))}
        </Select> */}
      {/* </Form.Item> */}

      {/* <Form.Item name="userId" label="用户ID" rules={[{required: true,message: '请输入用户ID'}]}> */}
        {/* <Input className={styles.ContactInfo} value={formData.userId} placeholder='请输入用户ID'/> */}
        {/* <Select value={formData.categoryNames} placeholder="请选择用户ID" >
          <Option value='1'>Odegie_Carol22</Option>
        </Select> */}
      {/* </Form.Item> */}

      {/* <Form.Item name="activityInvitingCode" label="邀请码" rules={[{required: true,message: '请输入邀请码'}]}> */}
        {/* <Input className={styles.ContactInfo} value={formData.activityInvitingCode} placeholder='请输入邀请码'/> */}
        {/* <Select value={formData.categoryNames} placeholder="请选择邀请码" >
          <Option value='1'>1013117214530529</Option>
        </Select> */}
      {/* </Form.Item> */}

      <Form.Item name="companyName" label="公司名称" rules={[{required: true,message: '请输入贵公司名称'}]}>
        <Input placeholder='请输入贵公司名称' value={formData.companyName} showCount maxLength={50} />
      </Form.Item>

      <Form.Item name="brandName" label="主营品牌" rules={[{required: true,message: '主营品牌'}]}>
        <Input placeholder='请选择主营品牌'value={formData.brandName} />
      </Form.Item>
      
      <Form.Item name="categoryNames" label="主营类目" rules={[{ required: true }]}>
        <Select value={formData.categoryNames} placeholder="请选择" >
          <Option value='1'>潮流</Option>
          {/* <Option value="2">类目2</Option>
          <Option value="3">类目3</Option> */}
        </Select>
      </Form.Item>
      
      <Form.Item name="contactPerson" label="联系人" rules={[{required: true,message: '请输入联系人姓名'}]}>
        <Input className={styles.ContactInfo} value={formData.contactPerson} placeholder='请选择联系人姓名' showCount maxLength={20} />
      </Form.Item>

      <Form.Item name="emailAddress" label="电子邮箱" rules={[{required: true,message: '请输入电子邮箱'}]}>
        <Input className={styles.ContactInfo} value={formData.emailAddress} placeholder='请输入电子邮箱' />
      </Form.Item>

      <Form.Item name="phoneCall" label="联系人电话" rules={[{required: true,message: '请输入联系人手机号码'}]}>
        <Input className={styles.ContactInfo} value={formData.phoneCall} placeholder='请输入联系人手机号码' />
      </Form.Item>

      <Form.Item name="certificateType" label="品牌资质类型" rules={[{ required: true}]}>
        <Select value={formData.certificateType} placeholder="请选择"  allowClear>
          <Option value='0'>品牌方</Option>
          <Option value='1'>扫货商</Option>
          <Option value="2">经销商</Option>
          <Option value="3">市场贸易商</Option>
        </Select>
      </Form.Item>

      <Form.Item name="brandType" label="品牌类型" rules={[{ required: true }]}>
        <Select value={formData.brandType} placeholder="请选择" >
          <Option value="0">线上线下均无渠道</Option>
          <Option value="1">纯线上</Option>
          <Option value="2">纯线下</Option>
          <Option value="3">全渠道</Option>
        </Select>
      </Form.Item>

      <Form.Item name="sellWays" label="外网店铺渠道" rules={[{ required: true }]}>
        <Select value={formData.sellWays} placeholder="请选择" >
          <Option value='TianMao'>天猫</Option>
          <Option value='TaoBao'>淘宝</Option>
          <Option value='JingDon'>京东</Option>
          <Option value='XiaoHongShu'>小红书</Option>
          <Option value='WangYiYanXuan'>网易严选</Option>
          <Option value='KaoLaHaiGou'>考拉还购</Option>
          <Option value='XianXiaMenDian'>线下门店</Option>
        </Select>
      </Form.Item>
      
      <Form.Item name="shopName" label="店铺名称" rules={[{required: true,message: '请输入'}]}>
        <Input value={formData.shopName} placeholder='请输入' showCount maxLength={50} />
      </Form.Item>

      <Form.Item name="shopLink" label="店铺地址" rules={[{required: true,message: '请输入'}]}>
        <Input value={formData.shopLink} placeholder='请输入店铺地址或网址链接' showCount maxLength={100} />
      </Form.Item>

      <Form.Item name="productNum" label="商品数量" rules={[{required: true, message: '请输入'}]}>
        <Select value={formData.productNum} placeholder="请选择" >
          <Option value="0">50w以下</Option>
          <Option value="1">50w至1000w</Option>
          <Option value="2">1000w以上</Option>
        </Select>
      </Form.Item>

      <Form.Item name="productValue" label="商品总价值" rules={[{required: true, message: '请输入'}]}>
        <Select value={formData.productValue} placeholder="请选择" >
          <Option value="0">50w以下</Option>
          <Option value="1">50w至1000w</Option>
          <Option value="2">1000w以上</Option>
        </Select>
      </Form.Item>

      <Form.Item name="companyValue" label="公司估值" rules={[{required: true, message: '请输入'}]}>
        <Select value={formData.companyValue} placeholder="请选择" >
          <Option value="0">50w以下</Option>
          <Option value="1">50w至1000w</Option>
          <Option value="2">1000w以上</Option>
        </Select>
      </Form.Item>

      <Form.Item name="fansRed" label="小红书帖子数(条)" rules={[{required: true,message: '请输入'}]}>
        <Input value={formData.fansRed} placeholder='请输入数量' />
      </Form.Item>

      <Form.Item name="fansTiktok" label="抖音官方账号粉丝数(人)" rules={[{required: true,message: '请输入'}]}>
        <Input value={formData.fansTiktok} placeholder='请输入数量' />
      </Form.Item>

      <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{offset: 8,span: 16}}>
        <Checkbox> 记住我</Checkbox>
      </Form.Item>
    </Form>

  );
};

export default Pageform
