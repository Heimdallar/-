import { useEffect, useState } from 'react';
import { getOperationPermission } from '../api';
// 获取按钮操作权限
export const useOperationPermisssion = () => {
  const [permission, setPermission] = useState({
    canSubmit: false,
    canExport: false,
    canCreate: false,
  });
  useEffect(() => {
    getOperationPermission().then((result) => {
      setPermission({
        canSubmit: result?.canSubmit || false,
        canExport: result?.canExport || false,
        canCreate: result?.canCreate || false,
      });
    });
  }, []);
  return [permission];
};
