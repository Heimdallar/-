import { getGrap } from '@/utils/grapPolris';
import { requestApi } from '@/utils/request';
import { TOKEN_ID } from '@/utils/uploadAppId';

export const unAccessBusinessToken = (queryParams: any) => {
  return requestApi('/biz/merchant/enter/oss/upload/token', queryParams, 'GET');
};

export const businessSchoolToken = (queryParams: any) => {
  return requestApi('/oss-platform-admin/token/formToken', queryParams, 'POST');
};

export const businessToken = (queryParams: any) => {
  return requestApi('/biz/public/generateFileKey', queryParams, 'POST');
};

export const refundArbitrationBusinessToken = (queryParams: any) => {
  return requestApi('/biz/public/generateKeFuFileKey', queryParams, 'POST');
};

export const commonOssUplaod = (e = 'jpg') => {
  return requestApi(
    '/oss-platform-admin/token/formToken',
    {
      // @ts-ignore
      appId: TOKEN_ID[e],
    },
    'POST',
  );
};

export const crmToken = (queryParams: any) => {
  return requestApi(`/youthcamp-mer-customer/merchant/customer/oss/getOssToken`, queryParams, 'GET', '', {
    // @ts-ignore
    backstageCode: 'crm',
    ...getGrap(),
  });
};
