import { ModalForm, ProFormText, ProFormSelect } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import fetchChannelSaveService from '@/services/channelManagement/channelSave';
import {useRequest} from 'ahooks'
interface styleParam {
  opportunityShow: boolean;
  setRow: () => void;
  SetOpportunityShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: any;
  isEdit: boolean;
  isAdd: boolean;
}

export default ({ opportunityShow, SetOpportunityShow, row, setRow, refreshList, isEdit, isAdd }: styleParam) => {  
  console.log(row, 'row');
  
  return (
    <ModalForm
      visible={opportunityShow}
      title={isEdit ? '编辑渠道' : '新增渠道'}
      width={520}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          SetOpportunityShow(false);
          setRow(undefined)
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const {channel, ...rest} =values
        const params = {
          id: isEdit? row.id: undefined,
          channel1Code: row.channel1Code,
          channel1Name: row.channel1Name,
          channel2Code: row.channel2Code,
          channel2Name: row.channel2Name,
          creatorId:row.creatorId,
          ...rest,
        };
        const res = await fetchChannelSaveService(params);
        console.log(res, 'resssssss');
        
        if (!res.success) return;
        message.success('提交成功');
        SetOpportunityShow(false);
        setRow(undefined)
        refreshList()
      }}
    >
      <ProFormSelect
         name="channel"
         label="上级渠道"
         style={{ width: '100%' }}
         disabled ={isAdd}
         initialValue={ isEdit ? row?.level === 2 ? row?.channel1Name: row?.channel2Name : row?.channel2Name}
        // initialValue={row?.channelName}
      />
      <ProFormText
        name={`channel${isEdit?row?.level :row?.level+1}Code`}
        label="渠道缩写"
        rules={[
          { required: true, message: '请输入渠道缩写' },
          { max: 10, message: '渠道缩写不超过10' },
          { pattern: /^[A-Za-z]+$/, message: '只能输入英文字符' },
        ]}
        placeholder="请输入"
        initialValue={isEdit ? row?.channelCode : '' }
        disabled={isEdit}
        fieldProps={{
          maxLength: 10,
        }}
      />
      <ProFormText
        name={`channel${isEdit?row?.level :row?.level+1 }Name`}
        label="渠道名称"
        rules={[
          { required: true, message: '请输入渠道名称' },
          { max: 50, message: '渠道名称长度不超过50' },
        ]}
        placeholder="请输入"
        initialValue={isEdit?row?.channelName:''}
        fieldProps={{
          maxLength: 50,
        }}
      />
    </ModalForm>
  );
};
