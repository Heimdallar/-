import Empty from '@finance/empty';

export const ProEmpty = () => {
  return (
    <div className="flex-1">
      <Empty image={Empty.PRESENTED_IMAGE_EMPTY_BOX} description="暂无数据" />
    </div>
  );
};
