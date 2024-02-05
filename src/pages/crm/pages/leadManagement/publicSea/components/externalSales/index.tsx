import ProForm, {
  ProFormDependency,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormDigit,
  FormListActionType,
} from '@poizon-design/pro-form';
import { Divider, Popconfirm } from 'poizon-design';
import { DeleteOutlined } from '@ant-design/icons';
import { defaultItemCol, initInternetSaleInfos, storeChannelOptions } from '../../config';
import ProCard from '@poizon-design/pro-card';
import { useRef } from 'react';
interface InProps {
  unchangeableValue?: { [key: string]: string | number };
}

export default function ExternalSales({ unchangeableValue }: InProps) {
  const actionRef = useRef<FormListActionType>();
  return (
    <ProFormList
      name="internetSaleInfos"
      label=""
      creatorButtonProps={{
        creatorButtonText: '新增店铺渠道',
        type: 'primary',
        style: {
          width: 200,
          marginLeft: 130
        },
      }}
      actionRef={actionRef}
      copyIconProps={false}
      deleteIconProps={false}
      itemRender={({ listDom }, { index }) => (
        <ProCard
          bordered
          style={{ marginBlockEnd: 8 }}
          bodyStyle={{ paddingBlockEnd: 0 }}
          extra={
            <Popconfirm
              title="确认删除当前店铺渠道信息?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => {
                actionRef.current?.remove(index);
              }}
            >
              <DeleteOutlined />
            </Popconfirm>
          }
        >
          {listDom}
        </ProCard>
      )}
    >
      {(f, index, action, count) => {
        return (
          <>
            {unchangeableValue?.storeChannel ? (
              <ProForm.Item label="经营平台" style={{ marginLeft: '80px' }}>
                <div>{unchangeableValue.storeChannel}</div>
              </ProForm.Item>
            ) : (
              <ProFormSelect
                className="form-storeChannel"
                {...defaultItemCol}
                name="storeChannel"
                width={'lg'}
                label="经营平台"
                placeholder="请选择经营平台"
                fieldProps={{
                  style: { display: 'block' },
                }}
                rules={[{ required: true, message: '请选择经营平台' }]}
                options={storeChannelOptions}
              />
            )}
            <ProFormText
              name="storeName"
              label="店铺名称"
              rules={[{ max: 100, message: '最多100个字符' }]}
              placeholder="请输入该品牌外网的店铺名称"
              {...defaultItemCol}
              width={'lg'}
            />
            <ProFormDependency name={['storeChannel']}>
              {({ storeChannel }) => {
                return (
                  <ProFormText
                    name="storeUrl"
                    dependencies={['storeChannel']}
                    label={storeChannel === '线下门店' ? '门店地址' : '店铺链接'}
                    rules={[{ required: true, message: `请输入${storeChannel === '线下门店' ? '该品牌门店地址' : '该品牌外网的店铺链接'}` }, { max: 300, message: '最多300个字符' }]}
                    placeholder={storeChannel === '线下门店' ? '请输入线下门店' : '请输入该品牌外网的店铺链接'}
                    {...defaultItemCol}
                    width={'lg'}
                  />
                );
              }}
            </ProFormDependency>
            <ProFormDigit
              name="recentThirtyTurnover"
              label="月销售额"
              {...defaultItemCol}
              width={'lg'}
              fieldProps={{
                min: 0,
                max: 999999,
                maxLength: 6,
                precision: 0,
                addonAfter: '万',
                placeholder: '请输入该品牌外网的店铺月销售额',
              }}
            />
            <ProFormDigit
              name="fansNum"
              label="粉丝数"
              {...defaultItemCol}
              width={'lg'}
              fieldProps={{
                min: 0,
                max: 9999999999,
                precision: 0,
                maxLength: 10,
                addonAfter: '人',
                placeholder: '请输入该品牌外网的店铺粉丝数',
              }}
            />
            <Divider />
          </>
        );
      }}
    </ProFormList>
  );
}
