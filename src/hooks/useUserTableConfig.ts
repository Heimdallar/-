import type { ProColumnType } from '@poizon-design/pro-table';
import fetchConfigQueryUserConfigService from '@/services/settingColumnsModal/queryUserConfig';
import { SelectedColumnsType } from '@/entities/settingColumnsModal/interface/queryUserConfig';
import { useEffect, useState } from 'react';
interface InProps {
  tableKey: string;
  loadOrNot?: boolean;
  columns: ProColumnType<any>[];
}
type setUserTableConfigType = (value: SelectedColumnsType) => void;
type returnType = [ProColumnType[], setUserTableConfigType];
//获取用户配置的表格column
//column每一项hideInSearch和columnKey必须写
//show 表示不受此逻辑控制的表格列
//searchShow 表示不受此逻辑控制的查询项
const useUserTableConfig = ({ tableKey, loadOrNot = true, columns }: InProps): returnType => {
  const [userTableConfig, setUserTableConfig] = useState<SelectedColumnsType>({});
  const [selectedColumns, setSelectedColumns] = useState<ProColumnType[]>([]);

  const fetchCustomTableQueryUserConfig = async () => {
    const res = await fetchConfigQueryUserConfigService({ tableKey });
    if (!res.success) return;
    setUserTableConfig(res.data.selectedColumns);
  };
  useEffect(() => {
    if (!loadOrNot) return;
    fetchCustomTableQueryUserConfig();
  }, [tableKey, loadOrNot]);
  useEffect(() => {
    const columnKeys = Object.keys(userTableConfig);
    //搜索列
    let searchColumns = columns.filter(
      (item: SelectedColumnsType) => !item?.hideInSearch || item.hasOwnProperty('searchShow'),
    );

    searchColumns = searchColumns.map((item: SelectedColumnsType) => {
      if (item.hasOwnProperty('searchShow')) {
        return {
          ...item,
          hideInSearch: !item.searchShow,
        };
      }

      return item;
    });

    // 操作列
    const settingColumn = columns.filter(
      (item: SelectedColumnsType) => item?.columnKey === 'settings',
    );

    //这里是将 所有需要显示的表格列列举出来；
    const tableColumns: ProColumnType[] = columns
      .filter((item: SelectedColumnsType) => !!item?.hideInSearch || item.hasOwnProperty('show'))
      .map((item: SelectedColumnsType, index: number) => {
        if (item.hasOwnProperty('show')) {
          return {
            ...item,
            hideInTable: !item.show,
            currentIndex: index,
          };
        }

        const currentKey = columnKeys.find((current) => current === item?.columnKey);
        if (currentKey) {
          return {
            ...item,
            title:
              item.titleRender?.(userTableConfig[currentKey]?.columnName) ||
              userTableConfig[currentKey]?.columnName,
            hidInTable: userTableConfig[currentKey]?.visible,
            currentIndex: columnKeys.findIndex((current) => current === item?.columnKey),
          };
        }
      })
      .filter(Boolean);

    const viewTableColumns = tableColumns.sort(
      (a?: SelectedColumnsType, b?: SelectedColumnsType) => {
        return a?.currentIndex - b?.currentIndex; // 默认升序排序
      },
    );

    setSelectedColumns(
      tableColumns.length
        ? [...searchColumns, ...viewTableColumns, ...settingColumn]
        : [...searchColumns, ...settingColumn],
    );
  }, [userTableConfig, columns]);
  return [selectedColumns, setUserTableConfig];
};
export default useUserTableConfig;
