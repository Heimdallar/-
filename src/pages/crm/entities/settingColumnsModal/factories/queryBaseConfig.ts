import type { Data, AllColumn, SelectedColumn } from '../interface/queryBaseConfig';

const makeAllColumns = (record: AllColumn) => {
  if (!record) {
    return null;
  }

  return {
    columnKey: record.columnKey,
    columnName: record.columnName,
    visible: record.visible,
    movable: record.movable,
    required: record.required,
    selected: record.selected,
    sort: record.sort,
  };
};

const makeSelectedColumns = (record: SelectedColumn) => {
  if (!record) {
    return null;
  }

  return {
    columnKey: record.columnKey,
    columnName: record.columnName,
    visible: record.visible,
    movable: record.movable,
    required: record.required,
    selected: record.selected,
    sort: record.sort,
  };
};

const buildMakeConfigQueryBaseConfig = () => {
  return function makeConfigQueryBaseConfig(record: Data) {
    if (!record) {
      return null;
    }

    return {
      sysCode: record.sysCode,
      tableKey: record.tableKey,
      tableName: record.tableName,
      allColumns: record.allColumns?.map(makeAllColumns).filter(Boolean),
      selectedColumns: record.selectedColumns?.map(makeSelectedColumns).filter(Boolean),
    };
  };
};

export default buildMakeConfigQueryBaseConfig;
