import { useMemo } from 'react';
import { Button, Image, Space } from 'poizon-design';
import { ProDescriptionsItemProps } from '@poizon-design-design/pro-descriptions';
import { InterfaceReply } from '@/utils/request';
import { PageStoreContext } from '../store';
import { jobRelationOptions } from '../constants';
import { PreviewImage } from '../components/PreviewImage';
import { DetailInterface } from '../service/api';

export const useColumns = () => {
  const { enums } = PageStoreContext.useContainer();

  const tableColumns = useMemo(() => {
    return [
      {
        title: '商品信息',
        dataIndex: 'title',
        key: 'title',
        render: (title: string, { logoUrl, articleNumber }) => {
          return (
            <Space>
              <Image src={logoUrl} width={80} />
              <Space direction="vertical">
                <span>货号：{articleNumber}</span>
                <span>{title}</span>
              </Space>
            </Space>
          );
        },
      },
      {
        title: '规格',
        dataIndex: 'properties',
        key: 'properties',
      },
      {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: 'skuId',
        dataIndex: 'skuId',
        key: 'skuId',
      },
    ];
  }, []);

  const baseDetailColumns = useMemo(() => {
    return [
      {
        title: '姓名',
        key: 'name',
        tooltip: '姓名补充提示',
        dataIndex: 'name',
        editable: false,
      },
      {
        title: '昵称',
        key: 'nick',
        dataIndex: 'nick',
      },
      {
        title: '年龄',
        key: 'age',
        dataIndex: 'age',
        editable: false,
      },
      {
        title: '国家/地区',
        key: 'country',
        dataIndex: 'country',
        editable: false,
      },
      {
        title: '证件类型',
        key: 'type',
        dataIndex: 'type',
        valueType: 'select',
        /**
         * 更多 valueEnum: https://procomponents.ant.design/components/schema/#valueenum
         */
        valueEnum: {
          shenfenzheng: { text: '身份证' },
          huzhao: { text: '护照' },
        },
      },
      {
        title: '证件号',
        key: 'number',
        dataIndex: 'number',
      },
      {
        title: '签发日期',
        key: 'sign',
        dataIndex: 'sign',
        valueType: 'date',
      },
      {
        title: '过期日期',
        key: 'expiration',
        dataIndex: 'expiration',
        valueType: 'date',
        fieldProps: {
          format: 'YYYY.MM.DD',
        },
      },
      {
        title: '邮件地址',
        key: 'email',
        dataIndex: 'email',
      },
      {
        title: '现居住地址',
        key: 'address',
        dataIndex: 'address',
      },
      /**
       * 更多 valueType: https://procomponents.ant.design/components/schema/#valuetype-%E5%88%97%E8%A1%A8
       */
      {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        valueType: 'fromNow',
        editable: false,
      },
    ];
  }, []);

  const offerDetailColumns: ProDescriptionsItemProps<InterfaceReply<typeof DetailInterface>>[] =
    useMemo(() => {
      return [
        {
          title: '员工编号',
          key: 'employeeNo',
          dataIndex: 'employeeNo',
        },
        {
          title: '证件照',
          key: 'idPhoto',
          dataIndex: 'idPhoto',
          render: (dom, entity) => {
            return (
              <PreviewImage url={entity?.idPhoto}>
                <Button className="h-5 p-0 leading-5" type="link" size="small">
                  查看
                </Button>
              </PreviewImage>
            );
          },
        },
        {
          title: '工作关系',
          key: 'workRelations',
          dataIndex: 'workRelations',
          valueType: 'select',
          fieldProps: {
            options: jobRelationOptions,
          },
        },
        {
          title: '组织',
          key: 'organization',
          dataIndex: 'organization',
        },
        {
          title: '职务',
          key: 'job',
          dataIndex: 'job',
        },
        {
          title: '工作类型',
          key: 'timeType',
          dataIndex: 'timeType',
          valueType: 'select',
          valueEnum: enums.timeType || {},
        },
        {
          title: '直线经理',
          key: 'directManager',
          dataIndex: 'directManager',
        },
        {
          title: '任职时长(年)',
          key: 'serviceTime',
          dataIndex: 'serviceTime',
        },
        {
          title: '入职日期',
          key: 'entryDate',
          dataIndex: 'entryDate',
        },
        {
          title: '社会工龄(年)',
          key: 'workingYears',
          dataIndex: 'workingYears',
        },
        {
          title: '业务单位',
          key: 'business',
          dataIndex: 'business',
        },
        {
          title: 'OKR 进度',
          key: 'orkProgress',
          dataIndex: 'orkProgress',
          valueType: 'progress',
        },
        {
          title: '图片',
          key: 'image',
          dataIndex: 'image',
          span: 3,
          render: (dom, entity) => {
            return (
              <Image.PreviewGroup>
                <Space size={16} style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Image width={120} src={entity.idPhoto} />
                  <Image width={120} src={entity.idPhoto} />
                  <Image width={120} src={entity.idPhoto} />
                  <Image width={120} src={entity.idPhoto} />
                  <Image width={120} src={entity.idPhoto} />
                </Space>
              </Image.PreviewGroup>
            );
          },
        },
      ];
    }, [enums]);

  return { tableColumns, baseDetailColumns, offerDetailColumns };
};
