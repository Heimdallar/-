export const defaultPagiSetting = {
  pageSize: 10,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50],
  total: 0,
};
export const default20PagiSetting = {
  ...defaultPagiSetting,
  pageSize: 20,
};

export const pagination = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  pageSizeOptions: [20, 50, 100]
}