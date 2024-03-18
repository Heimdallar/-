import { RcFile } from 'poizon-design/lib/upload/interface';
// @ts-ignore
import md5 from 'blueimp-md5';
import { message, Upload } from 'poizon-design';
import { UploadScene } from './index';
import {
  unAccessBusinessToken,
  businessSchoolToken,
  businessToken,
  refundArbitrationBusinessToken,
  crmToken,
} from './api';

export const md5Name = (file: RcFile) => {
  const { name } = file;
  const index = name.lastIndexOf('.');
  const sourceFileName = name.substring(0, index);
  const suffix = name.substring(index);
  const fileName = md5(sourceFileName + Date.now()) + suffix;
  return fileName.toLowerCase();
};

export const uploadBatchCenterOss = async (
  file: RcFile,
  bizCode: string | undefined,
  scene: UploadScene | undefined,
) => {
  const params = { bizCode, fileName: file.name };

  let getTokenRequest: any;
  switch (scene) {
    case 'businessSchool':
      getTokenRequest = businessSchoolToken;
      break;
    case 'businessEntry':
      getTokenRequest = unAccessBusinessToken;
      break;
    case 'refundArbitration':
      getTokenRequest = refundArbitrationBusinessToken;
      break;
    case 'crm':
      getTokenRequest = crmToken;
      break;
    default:
      getTokenRequest = businessToken;
  }
  const ossInfo: any = await getTokenRequest(params);
  const formData = new FormData();
  formData.append('OSSAccessKeyId', ossInfo.OSSAccessKeyId || ossInfo.accessId);
  formData.append('policy', ossInfo.policy);
  const keyName = ossInfo.path + file.name;
  const fileName = md5Name(file);
  const keyInfo = ossInfo.path + fileName;
  switch (scene) {
    case 'businessEntry':
      ossInfo.key = keyName;
      formData.append('key', keyName);
      formData.append('file', file);
      break;
    case 'refundArbitration':
      formData.append('key', ossInfo.key);
      formData.append('file', file);
      break;
    case 'crm':
      ossInfo.key = keyInfo;
      formData.append('key', ossInfo.startsWith || keyInfo);
      formData.append('signature', ossInfo.signature || ossInfo.postSignature);
      formData.append('file', file, fileName);
      break;
    default:
      formData.append('callback', ossInfo.callbackBody);
      formData.append('key', ossInfo.key);
  }

  formData.append('success_action_status', '200');
  if (scene !== 'crm') {
    formData.append('signature', ossInfo.postSignature);
  }

  await fetch(ossInfo.ossHost || ossInfo.host, {
    method: 'POST',
    body: formData,
    mode: scene === 'crm' ? 'cors' : 'no-cors',
  });

  return {
    key: ossInfo.key,
  };
};

const getImageRatio = (file: File): Promise<{ width: number; height: number } | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageEl = new Image();
      imageEl.src = reader.result as string;
      imageEl.onload = () => {
        return resolve({
          width: imageEl.width,
          height: imageEl.height,
        });
      };
      imageEl.onerror = () => {
        return reject(new Error());
      };
    };
    reader.onerror = () => {
      return reject(new Error());
    };
  });
};

export const validateImageRatio = async (file: File, ratioW: string, ratioH: string) => {
  const constSize = '0';
  if (ratioW === constSize || ratioH === constSize) {
    return true;
  }
  const { width = 1, height = 1 } = (await getImageRatio(file)) || {};
  if (width / height !== +ratioW / +ratioH) {
    message.warn(`图片比例要求${ratioW}:${ratioH}，请重新上传`);
    return Upload.LIST_IGNORE;
  }
  return true;
};

export const validateImageSizeRatio = async (
  file: File,
  ratioW: string,
  ratioH: string,
  w?: string,
  h?: string,
) => {
  const constSize = '0';
  if (ratioW === constSize || ratioH === constSize) {
    return true;
  }
  const { width = 1, height = 1 } = (await getImageRatio(file)) || {};

  // 比例判断
  if (w && h) {
    if (width / height !== +w / +h) {
      message.warn(`图片比例要求${w}:${h}，请重新上传`);
      return Upload.LIST_IGNORE;
    }
  }

  if (!(width >= +ratioW && height >= +ratioH)) {
    message.warn(`图片尺寸要求最小${ratioW}:${ratioH}，请重新上传`);
    return Upload.LIST_IGNORE;
  }

  return true;
};
