import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { updateStyle } from '../../api';
import { StyleItem } from '../../interface';
import { forEach, isEmpty, size } from 'lodash';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';

interface styleParam {
  styleShow: boolean;
  setRow: React.Dispatch<React.SetStateAction<StyleItem | undefined>>;
  setStyleShow: React.Dispatch<React.SetStateAction<boolean>>;
  refreshList: () => void;
  row?: StyleItem;
}

export default ({ styleShow, setStyleShow, row, setRow, refreshList }: styleParam) => {
  const isEdit = !isEmpty(row)
  return (
    <ModalForm
      visible={styleShow}
      title={isEdit ? '编辑配置' : '新增配置'}
      width={520}
      initialValues={row}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setStyleShow(false);
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
        const params = { 
          ...row,
          ...values,
        }
        const { categoryName, tags } = params
        const tagList = tags?.split(',') || []
        const requestParams = {
          categoryName,
          style: Array.from(new Set(tagList)).filter(
            x => x.trim() !== '' && x,
          ),
          add: !isEdit
        }
        
        const res = await updateStyle(requestParams);
        if (!res) return;
        message.success('提交成功');
        setStyleShow(false);
        setRow(undefined)
        refreshList()
      }}
    >
      <ProForm.Item
        label="一级类目名称"
        name="categoryName"
        rules={[{ required: true, message: '请选择一级类目名称' }]}
      >
        <CategorySelect disabled={isEdit} placeholder="请选择一级类目名称" />
      </ProForm.Item>
      <ProFormTextArea
        name="tags"
        label="风格"
        rules={[
          () => ({
            validator(_, v) {
              if (!v) return Promise.resolve()
                const wordList = v.split(/,|，/) || []

                let isCE = true
                let isLengthOver = false
                forEach(wordList, value => {
                  const reg = /^[\u4e00-\u9fa5a-zA-Z,，/]+$/g
                  const match: any = reg.test(value.trim())
                  if (!match && value) {
                    isCE = false
                  }
                  if (size(value) > 20) {
                    isLengthOver = true
                  }
                })
                if (!isCE) {
                  return Promise.reject('风格格式仅支持中英文以及 / ')
                }
                if (isLengthOver) {
                  return Promise.reject('每个风格值长度不得超过20字符')
                }
                if (wordList.length > 30) {
                  return Promise.reject('每一个类目最多允许填入30个风格')
                }
                return Promise.resolve()
            },
          }),
        ]}
        placeholder="请输入风格，每个风格用逗号分隔开"
      />
    </ModalForm>
  );
};
