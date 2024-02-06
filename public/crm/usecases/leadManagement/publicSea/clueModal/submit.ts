import { message } from 'poizon-design';

interface ISubmit {
  isEdit: boolean;
  handleAdd: () => void;
  addPublicSeaClue: (p) => void;
  handleUpdate: (id, p) => void;
  updatePublicSeaClue: (p) => void;
  batchLeadId: number;
  initialValues: Record<string, any>;
  unchangeableValue: Record<string, any>;
  brandRet: Record<string, any>;
  convertsParams: (p) => void;
  values: Record<string, any>;
}

export const onSubmit = async (prop: ISubmit) => {
  const {
    values,
    brandRet,
    initialValues,
    unchangeableValue,
    convertsParams,
    isEdit,
    handleAdd,
    addPublicSeaClue,
    handleUpdate,
    updatePublicSeaClue,
    batchLeadId,
  } = prop;
  let params = values;
  params.mainCategory = params.mainCategoryInfo?.label || '';
  params.mainCategoryId = params.mainCategoryInfo?.value || 0;
  params.brandId = brandRet?.brandId || 0;
  params.brandName = brandRet?.label || params.brandInfo || '';
  if (!params?.categoryStyles?.length) {
    // 与后端沟通后处理
    params.categoryStyles = ['无'];
  }
  params = {
    ...initialValues,
    ...params,
  };
  if (unchangeableValue?.storeChannel) {
    params = convertsParams(params);
  }
  return new Promise(async (resolve, reject) => {
    if (!isEdit) {
      if (handleAdd) {
        const resp = await handleAdd(batchLeadId, params);
        if (resp.code !== 200) {
          reject(resp);
          return;
        }
      } else {
        const resp = await addPublicSeaClue(params);
        if (resp.code !== 200) {
          reject(resp);
          return;
        }
      }
      resolve();
      message.success('新增成功');
    } else {
      if (handleUpdate) {
        const resp = await handleUpdate(batchLeadId, params);
        if (resp.code !== 200) {
          reject(resp);
          return;
        }
      } else {
        const resp = await updatePublicSeaClue(params);
        if (resp.code !== 200) {
          reject(resp);
          return;
        }
      }
      resolve();
      message.success('更新成功');
    }
  });
};
