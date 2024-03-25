import { useMemo } from 'react';
import classNames from 'classnames';
import styles from './index.less';

interface Props {
  page: string;
  query: string;
}

const RenderIcon = (rankIndex:any) => {

  return (
    <div className={classNames(styles.rank)}>
        {rankIndex}
    </div>
  );
};

const useColumns = (props: Props) => {
  const { page, query } = props;

    const signleColumns = [
      {
        title: '姓名',
        dataIndex: 'operatorName',
        width: 100,
        fixed: 'left',
      },
    ];

    const multiColumns = [
      {
        title: '类目',
        dataIndex: 'categoryName',
        width: 100,
        fixed: 'left',
      },
      {
        title: '待认领',
        dataIndex: 'waitClaimAmount',
        // sorter: true,
        width: 100,
        // defaultSortOrder:
        //   page === 'single' || query === 'people'? '' : 'descend',
      },
      {
        title: '待认领(已超时)',
        width: 150,
        dataIndex: 'waitClaimTimeoutAmount',
        // sorter: true,
      },
    ];

    const Tcolums = [
      {
        title: '排名',
        dataIndex: 'rankIndex',
        render: (rankIndex: number) => {
          return <RenderIcon rankIndex={rankIndex} />;
        },
        hideInSearch: true,
        width: 100,
        fixed: 'left',
      },
      ...[
        page === 'single' || query === 'people'
          ? signleColumns
          : multiColumns,
      ].flat(Infinity),
    

      {
        title: '待首次沟通',
        dataIndex: 'waitFirstCommunicateAmount',
        // sorter: true,
        width: 150,
        // defaultSortOrder:
        //   page === 'single' || query === 'people' ? 'descend' : '',
      },
      {
        title: '待首次沟通(已超时)',
        dataIndex: 'waitFirstCommunicateTimeoutAmount',
        // sorter: true,
        width: 170,
      },
      {
        title: '待反馈洽谈结果',
        dataIndex: 'waitCommunicatResultAmount',
        // sorter: true,
        width: 150,
      },
      {
        title: '待反馈洽谈结果(已超时)',
        dataIndex: 'waitCommunicatResultTimeoutAmount',
        // sorter: true,
        width: 190,
      },
      {
        title: '待提交入驻',
        dataIndex: 'waitEntryAmount',
        // sorter: true,
        width: 150,
      },
      {
        title: '待提交入驻(已超时)',
        dataIndex: 'waitEntryTimeoutAmount',
        // sorter: true,
        width: 170,
      },
      {
        title: '待出价',
        dataIndex: 'waitBiddingAmount',
        // sorter: true,
        width: 80,
      },
    ];
    return Tcolums;
  
};


const multicolumns=[
  
    {
      title: '排名',
      dataIndex: 'rankIndex',
      hideInSearch: true,
      width: 100,
      fixed: 'left',
    },
    {
      title: '类目',
      dataIndex: 'categoryName',
      width: 100,
      fixed: 'left',
      valueType:'text'
    },
    {
      title: '待认领',
      dataIndex: 'waitClaimAmount',
      sorter: true,
      width: 100,
      // defaultSortOrder:
      //   page === 'single' || query === 'people'? '' : 'descend',
    },
    {
      title: '待认领(已超时)',
      width: 150,
      dataIndex: 'waitClaimTimeoutAmount',
      sorter: true,
    },
    {
      title: '待首次沟通',
      dataIndex: 'waitFirstCommunicateAmount',
      sorter: true,
      width: 150,
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
]
const singlecolumns=[
  {
    title: '排名',
    dataIndex: 'rankIndex',
    hideInSearch: true,
    width: 100,
    fixed: 'left',
  },
  {
    title: '姓名',
    dataIndex: 'operatorName',
    width: 100,
    fixed: 'left',
  },
  {
    title: '待首次沟通',
    dataIndex: 'waitFirstCommunicateAmount',
    sorter: true,
    width: 150,
    // defaultSortOrder:
    //   page === 'single' || query === 'people' ? 'descend' : '',
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
]

export {useColumns,multicolumns,singlecolumns};
