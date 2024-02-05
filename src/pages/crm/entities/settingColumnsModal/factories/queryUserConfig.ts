import type { Data, SelectedColumn } from '../interface/queryUserConfig';

const makeSelectedColumns = (record: SelectedColumn) => {
  if (!record) {
    return null;
  }

  return {
    columnKey: record.columnKey,
    columnName: record.columnName,
    visible: record.visible,
    movable: record.movable,
    sort: record.sort,
  };
};

const buildMakeConfigQueryUserConfig = () => {
  return function makeConfigQueryUserConfig(record: Data) {
    if (!record) {
      return null;
    }

    const selectedColumns = (record?.selectedColumns || []).map(makeSelectedColumns).filter(Boolean);
    const selectedColumnConfig: { [key: string]: any } = {};
    selectedColumns.forEach((item: SelectedColumn) => {
      if(!item.columnKey) return
      selectedColumnConfig[item.columnKey] = {
        visible: item.visible,
        columnName: item.columnName,
        columnKey: item.columnKey,
      };
    });
    return {
      sysCode: record.sysCode,
      tableKey: record.tableKey,
      tableName: record.tableName,
      selectedColumns: selectedColumnConfig,
      userConfig: record.userConfig,
    };
  };
};

export default buildMakeConfigQueryUserConfig;
