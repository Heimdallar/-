import { DataRes, Data } from '@/entities/attractinvestment/interface/fetch-hot-brand'

const makeContents = (record: Data) => {
  if (!record) {
    return null;
  }

  return {
    value: record.name,
    label: record.name,
    id: record.id,
  };
};

const buildMakeBrandSearch = () => {
  return function makeBrandSearch(record: DataRes) {
    if (!record) {
      return null;
    }

    return {
      pageNum: record.pageNum,
      pageSize: record.pageSize,
      total: record.total,
      pages: record.pages,
      contents: record.contents?.map(makeContents) || [],
    };
  };
};

export default buildMakeBrandSearch;
