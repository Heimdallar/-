import React, { useRef, useState } from 'react';
import ProTable, { ActionType } from '@poizon-design/pro-table';
import { Button, message, Space } from 'poizon-design';
import { DownloadLine, Import, PlusLine } from '@poizon-design/icons';
import { isEmpty } from 'lodash';
import ProForm, { ModalForm, ProFormTextArea, ProFormUploadButton, ProFormUploadDragger } from '@poizon-design/pro-form';
import { PaginationType } from 'poizon-design/lib/transfer/interface';
import ProUpload, { UploadScene } from '@/components/ProUpload/index';
import { defaultPagiSetting } from '@/config';
import { ConfigItem, OpportunityItem } from './interface';
import OpportunityModal from '../opportunityManagement/componenets/opportunityModal';
import ImportLabelModal from './componenets/importLabelModal'
import columns from './column';
import { fetchPageBrandList, getBrandConfig, importTask, saveBrandConfig } from './service';
import ImportFile from './componenets/importFile';
import { getContact1Url } from './utils';
const OpportunityManagement: React.FC<any> = () => {
  const [opportunityShow, SetOpportunityShow] = useState(false);
  const [configShow, setConfigShow] = useState(false);
  const [configValues, setConfigValues] = useState<ConfigItem>();
  const [row, setRow] = useState<OpportunityItem>();
  const actionRef = useRef<ActionType>();
  const [pageInfo, setPageInfo] = useState(defaultPagiSetting);
  const [showImport,setShowImport]=useState(false)

  const refreshList = () => {
    actionRef.current?.reload();
  };


  return (
    <div data-trackid="071a3cbf0b653dd9-AG4zlO">
      <ProTable<OpportunityItem>
        columns={columns}
        actionRef={actionRef}
        tableAlertRender={false}
        request={async (params = {}) => {
          const { current, ...rest } = params;
          const resp: any = await fetchPageBrandList({
            ...rest,
            page: current,
          });

          setPageInfo({ ...pageInfo, total: resp.total });
          return {
            data: resp.contents || [],
            total: resp.total,
          };
        }}
        rowKey="id"
        pagination={{ ...pageInfo }}
        onChange={(params) => {
          const { current } = params;
          setPageInfo({ ...defaultPagiSetting });
        }}
        search={{
          labelWidth: 'auto',
        }}
        headerTitle="招商品牌库"
        toolbar={{
          settings: [],
        }}
        toolBarRender={() => [
          <Space>
            <Button
              type="link"
              onClick={() => {
               
              }}
            >
              <DownloadLine />
              下载模板
            </Button>
              
            <ImportFile btnText='导入品牌' type='primary' ></ImportFile>
            <ImportLabelModal btnText='导入店铺标签'/>
            <ImportLabelModal btnText='导入品牌标签'></ImportLabelModal>
            <Button
              onClick={() => {
                SetOpportunityShow(true);
              }}
              icon={<PlusLine />}
              type="primary"
            >
              新增品牌
            </Button>
            <Button
              onClick={
                async () => {
                const resp: any = await getBrandConfig({});
                if (isEmpty(resp)) {
                  setConfigShow(true);
                  return;
                }
                const { contactUrl1, contactUrl2, ...rest } = resp;
                const contact1 = contactUrl1 ? [{ url: contactUrl1 }] : [];
                const contact2 = contactUrl2 ? [{ url: contactUrl2 }] : [];
                setConfigValues({ contact1, contact2, ...rest });
                setConfigShow(true);
              }
            }
              type="primary"
            >
              展示配置
            </Button>
          </Space>,
        ]}
        scroll={{ x: 'max-content' }}
      />
      <ModalForm
        visible={configShow}
        width={520}
        title="展示配置"
        initialValues={configValues}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onVisibleChange={(val) => {
          if (!val) {
            setConfigShow(false);
            setConfigValues(undefined);
          }
        }}
        modalProps={{
          maskClosable: false,
          centered: true,
          destroyOnClose: true,
        }}
        layout="horizontal"
        onFinish={
            async (values) => {
          const params = {
            ...configValues,
            ...values,
          };
          const { contact1, contact2, ...rest } = params;
          const contactUrl1 = getContact1Url(contact1);
          const contactUrl2 = getContact1Url(contact2);
          const requestParams = {
            contactUrl1,
            contactUrl2,
            ...rest,
          };

          const res = await saveBrandConfig(requestParams);
          if (!res) return;
          message.success('提交成功');
          setConfigShow(false);
          setConfigValues(undefined);
        }}
      >
        <ProFormTextArea
          name="brandDesc"
          label="热招品牌库说明"
          fieldProps={{
            showCount: true,
            maxLength: 500,
          }}
          placeholder="请输入热招品牌库说明"
        />
        <ProFormTextArea
          name="contactOperationDoc"
          label="联系运营文案"
          fieldProps={{
            showCount: true,
            maxLength: 500,
          }}
          placeholder="请输入联系运营文案"
        />
        <ProForm.Item label="联系方式1" name="contact1" valuePropName="fileList">
          <ProFormUploadDragger name="drag-pic"  colSize={10} description={<span>请上传联系方式,文件格式限制为png/jpg,不可超过10M</span>}/>

        </ProForm.Item>
        <ProForm.Item label="联系方式2" name="contact2" valuePropName="fileList">
          <ProFormUploadDragger name="drag-pic2"  colSize={10} description={<span>请上传联系方式,文件格式限制为png/jpg,不可超过10M</span>}/>
        </ProForm.Item>
      </ModalForm>
      {opportunityShow && (
        <OpportunityModal
          opportunityShow={opportunityShow}
          row={row}
          refreshList={refreshList}
          setRow={setRow}
          SetOpportunityShow={SetOpportunityShow}
        />
      )}
    </div>
  );
};
export default OpportunityManagement;
