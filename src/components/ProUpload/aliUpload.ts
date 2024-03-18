import { commonOssUplaod } from './api';
import { md5Name } from './util';

class AliUploaderOss {
  async upload(opt: any) {
    const fileName = md5Name(opt.file);
    const formData = new FormData();
    const fileType = fileName.split('.').pop() || 'jpg';
    const ossInfo: any = await commonOssUplaod(fileType);
    const formKey = ossInfo.startsWith + fileName;
    formData.append('OSSAccessKeyId', ossInfo.accessKeyId);
    formData.append('policy', ossInfo.policy);
    formData.append('key', formKey);
    formData.append('success_action_status', '200');
    formData.append('signature', ossInfo.signature);
    formData.append('x-oss-security-token', ossInfo.stsToken);
    formData.append('file', opt.file, fileName);

    return fetch(ossInfo.ossHost, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
      // onProgress: opt.onProgress,
    }).then(() => {
      console.log({ossInfo})
      if (!ossInfo.transcordWith) {
        return {
          url: `${ossInfo.cdnHost}/${ossInfo.startsWith}${fileName}`,
        };
      }
      return {
        originUrl: URL.createObjectURL(opt.file),
        url: `${ossInfo.cdnHost}/${ossInfo.transcordWith}${fileName}`,
      };
    });
  }

  static imgClip(url: string, width: number, height: number) {
    return `${url}?x-oss-process=image/crop,w_${width},h_${height}`;
  }

  static videoCoverImg(url: string, second: number, width: number, height: number) {
    let secondT = second;
    if (Number(second) > 0) {
      secondT *= 1000;
    }
    let path = `${url}?x-oss-process=video/snapshot,t_${secondT},f_jpg`;
    if (width || height) {
      path += `,w_${width},h_${height}`;
    }
    return path;
  }
}

export const uploadToCdn = new AliUploaderOss();
