import ProForm, { ModalForm, ProFormDependency, ProFormInstance, ProFormSelect } from '@poizon-design/pro-form';
import { message } from 'poizon-design';
import { centerAudit, getCategoryList, getCategoryListByBrand } from '../../api';
import { useRef, useState } from 'react';
import CategorySelect from '@/components/ProSelect/business/CategorySelect';
import { IInitAudit, IListItem } from '../../interface';

interface AuditInfo {
  auditShow: boolean;
  brandId: number;
  batchLeadId: number;
  initAuditInfo: IInitAudit | undefined;
  setAuditShow: React.Dispatch<React.SetStateAction<boolean>>;
  setBrandId: React.Dispatch<React.SetStateAction<number>>;
  invokeUpdateDetail: (leadsId: number) => void;
  refreshList: () => void;
}

export default ({
  auditShow,
  setAuditShow,
  brandId,
  batchLeadId,
  initAuditInfo,
  setBrandId,
  invokeUpdateDetail,
  refreshList,
}: AuditInfo) => {
  const initValues = initAuditInfo || {};
  const formRef = useRef<ProFormInstance>();
  return (
    <ModalForm
      visible={auditShow}
      width={520}
      title="审核"
      formRef={formRef}
      initialValues={initValues}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      onVisibleChange={(val) => {
        if (!val) {
          setAuditShow(false);
        }
      }}
      modalProps={{
        maskClosable: false,
        centered: true,
        destroyOnClose: true,
      }}
      layout="horizontal"
      onFinish={async (values) => {
        const { level1CategoryItem, level2CategoryItem } = values;
        const { value: level1CategoryId, label: level1Category } = level1CategoryItem;
        const { value: level2CategoryId, label: level2Category } = level2CategoryItem;
        const requestParams = {
          leadsId: batchLeadId,
          reviewResult: 3,
          level1CategoryId,
          level1Category,
          level2CategoryId,
          level2Category,
        };
        const res = await centerAudit(requestParams);
        if (!res) return;
        message.success('审核提交成功');
        setBrandId(0);
        setAuditShow(false);
        invokeUpdateDetail(batchLeadId);
        refreshList();
      }}
    >
      <ProFormSelect
        name="level1CategoryItem"
        label="主营类目"
        rules={[{ required: true, message: '请选择主营类目' }]}
        fieldProps={{
          labelInValue: true,
          placeholder: '全部',
          onChange: () => {
            formRef.current?.setFieldsValue({
              level2CategoryItem: undefined,
            });
          },
        }}
        request={async () => {
          const params = {
            pid: 0,
            queryType: 0,
            treeFlag: true,
            spuCountFlag: false,
            brandId,
          };
          const resp: any = await getCategoryListByBrand(params);
          return resp.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
              disabled: item.brandBoundTag,
            };
          });
        }}
      />
      <ProFormDependency name={['level1CategoryItem']}>
        {({ level1CategoryItem = {} }) => {
          const { value } = level1CategoryItem;
          return (
            <ProFormSelect
              name="level2CategoryItem"
              label="主营二级类目"
              rules={[{ required: true, message: '请选择主营二级类目' }]}
              fieldProps={{
                labelInValue: true,
                placeholder: '全部',
              }}
              params={{ value }}
              request={async ({ value: pid }) => {
                const params = {
                  pid: pid || 0,
                  queryType: 1,
                  treeFlag: true,
                  spuCountFlag: false,
                };
                const resp: any = await getCategoryList(params);
                return resp.map((item: any) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                });
              }}
            />
          );
        }}
      </ProFormDependency>
    </ModalForm>
  );
};
