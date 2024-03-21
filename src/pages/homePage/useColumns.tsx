import { useMemo } from 'react';
import { Image } from 'poizon-design';
import classNames from 'classnames';
import { PageModeEnum, TypeEnum } from '@/pages/homePage/interface';
import styles from './index.less';
import { columns } from '../leadManagement/publicSea/column';


const RenderIcon = ({ rankIndex }: { rankIndex: number }) => {
  const urlList = [
    'https://cdn.poizon.com/node-common/9c080d3a-8666-dcf3-6f42-62445855afe1-46-40.png',
    'https://cdn.poizon.com/node-common/fe4aaf2a-ec72-e945-8564-c2ebd742d564-46-40.png',
    'https://cdn.poizon.com/node-common/5f4b7c10-b3d7-6802-b5b5-a4685f1fc975-69-60.png',
  ];
  const url = urlList[rankIndex - 1];

  return (
    <div className={classNames(styles.rank)}>
      {url ? <Image width={23} height={20} src={url} preview={false} /> : rankIndex}
    </div>
  );
};



  export  const signleCategoryColumns = [
      {
        title: '姓名',
        dataIndex: 'operatorName',
        width: 100,
        fixed: 'left',
      },
    ];

   export const multiCategoryColumns = [
      {
        title: '类目',
        dataIndex: 'categoryName',
        width: 100,
        fixed: 'left',
      },
      {
        title: '待认领',
        dataIndex: 'waitClaimAmount',
        sorter: true,
        width: 100,
        defaultSortOrder:''
        //   pageMode === PageModeEnum.单类目模式 || queryType === TypeEnum.按人员 ? '' : 'descend',
      },
      {
        title: '待认领(已超时)',
        width: 150,
        dataIndex: 'waitClaimTimeoutAmount',
        sorter: true,
      },
    ];

   export const fixedColums = [
      {
        title: '排名',
        dataIndex: 'index',
        render: (index: number) => {
          return <RenderIcon rankIndex={index} />;

        },
        hideInSearch: true,
        width: 100,
        fixed: 'left',
      },
      // ...[
        // pageMode === PageModeEnum.单类目模式 || queryType === TypeEnum.按人员
        //   ? signleCategoryColumns
        //   : multiCategoryColumns,
        // signleCategoryColumns
      // ].flat(Infinity),
      {
        ...[signleCategoryColumns]
      },
      {
        title: '待首次沟通',
        dataIndex: 'waitFirstCommunicateAmount',
        sorter: true,
        width: 150,
        // defaultSortOrder:'descend'
        //   pageMode === PageModeEnum.单类目模式 || queryType === TypeEnum.按人员 ? 'descend' : '',
      },
      {
        title: '待首次沟通(已超时)',
        dataIndex: 'waitFirstCommunicateTimeoutAmount',
        sorter: true,
        width: 170,
      },
      {
        title: '待反馈洽谈结果',
        dataIndex: 'waitCommunicatResultAmount',
        sorter: true,
        width: 150,
      },
      {
        title: '待反馈洽谈结果(已超时)',
        dataIndex: 'waitCommunicatResultTimeoutAmount',
        sorter: true,
        width: 190,
      },
      {
        title: '待提交入驻',
        dataIndex: 'waitEntryAmount',
        sorter: true,
        width: 150,
      },
      {
        title: '待提交入驻(已超时)',
        dataIndex: 'waitEntryTimeoutAmount',
        sorter: true,
        width: 170,
      },
      {
        title: '待出价',
        dataIndex: 'waitBiddingAmount',
        sorter: true,
        width: 80,
      },
    ];
  



