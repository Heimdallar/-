import React, { FC, useState, useEffect } from 'react';
import {
  Button,
  message,
  Upload,
  UploadProps,
  Image,
  UploadFile,
  ButtonProps,
} from 'poizon-design';
import { LoadingOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'poizon-design/lib/upload/interface';
import { uploadBatchCenterOss, validateImageRatio, validateImageSizeRatio } from './util';
import './index.less';
import { uploadToCdn } from './aliUpload';

export enum UploadScene {
  businessEntry = 'businessEntry',
  businessSchool = 'businessSchool',
  refundArbitration = 'refundArbitration',
  crm = 'crm',
}

export enum PreviewType {
  newPage = 'newPage',
}

export type StarkUploadBusinessProps = {
  /** 上传成功回调，返回文件key与文件对象 */
  onUploadSuccess?: (
    file: { key: string; file: RcFile },
    fileList: { key: string; file: RcFile }[],
  ) => void;
  /** 批处理中心key,服务端提供 */
  bizCode?: string;
  customBtn?: boolean;
  btnText?: string;
  buttonProps?: ButtonProps;
  /** 上传场景 */
  scene?: UploadScene;
  /**
   * @description       文件上传大小(MB)
   * @default           10
   */
  size?: number;
  /**
   * 图片比例，形如 "width:height"，eg: "2:3"、"1:1"（仅在 '.jpg', '.jpeg', '.gif', '.png' 类型生效）
   */
  imageRatio?: string;
  /**
   * 图片尺寸，形如 "400:400"，（仅在 '.jpg', '.jpeg', '.gif', '.png' 类型生效）
   */
  imageSizeRatio?: string;
  /** 上传服务来源，entry/arbitration/空  不同来源，请求接口不同 */
  source?: string;
  /** 上传场景 */
  fileSource?: { key: string; url: string };
  /** 内嵌元素 */
  children?: React.ReactNode;
  /** 上传预览方式 默认内部预览 newPage-新开页面 */
  previewType?: PreviewType;
  /** 隐藏上传按钮 */
  hideUploadButton?: boolean;
  /** 上传控件文字 */
  uploadPanelText?: string;
  onChange?: (fileList: any) => void;
  tips?: React.ReactNode;
  toCdn?: boolean;
};

export type ProUploadProps = Omit<UploadProps<any>, 'onChange'> & StarkUploadBusinessProps;
const ImageExt = ['.jpg', '.jpeg', '.gif', '.png'];
type keyObj = { key: string };

/**
* @description 上传组件-crm专用 
* @example 
* <ProUpload
    bizCode="merchant_entry"
    accept=".png,.jpg,.jpeg"
    listType="picture-card"
    size={10}
    scene={UploadScene.crm}
    maxCount={1}
    tips={
      <span className={styles.uploadDesc}>
        请上传联系方式，文件格式限制为png/jpg，不可超过10M
      </span>
    }
  /> 
*/
const StarkUpload: FC<ProUploadProps> = (props) => {
  const {
    onUploadSuccess,
    bizCode,
    scene,
    children,
    previewType,
    size = 10,
    btnText,
    buttonProps,
    customBtn,
    className,
    hideUploadButton,
    uploadPanelText,
    imageRatio,
    imageSizeRatio,
    toCdn = false,
    tips,
    ...resProps
  } = props;
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [file, setFile] = useState<{ name: string; key: string; file?: RcFile }>();
  const [preViewVisible, setPreViewVisible] = useState<boolean>(false);
  const [preViewUrl, setPreViewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadTxt, setUploadTxt] = useState('');

  const handleCustomRequest: UploadProps['customRequest'] = async ({ file, onSuccess }) => {
    setUploading(true);
    try {
      if (toCdn) {
        const { url } = await uploadToCdn.upload({
          action: 'string',
          data: '',
          file,
          filename: 'file',
          headers: {},
          withCredentials: false,
          onProgress: () => {},
        });

        onSuccess?.({ url });
        return;
      }
      const { key } = await uploadBatchCenterOss(file as RcFile, bizCode, scene);
      onSuccess?.({ key });
    } catch (error) {
      console.error(error)
      message.error('文件上传出错，请重新上传！');
    } finally {
      setUploading(false);
    }
  };
  const handleUploadSuccess = (file: any, fileList: any) => {
    if (!file?.file) {
      message.warn('请先选择要上传的文件');
      return;
    }
    message.success('上传成功！');
    if (onUploadSuccess) {
      onUploadSuccess(file, fileList);
    }
  };

  const onBeforeUpload = async (file: any, fileList: any) => {
    const fileExt = file.name.substring(file.name.lastIndexOf('.'));
    if (hideUploadBtn) {
      const uploadMaxMessage = `上传数量不可超过 ${resProps.maxCount}个!`;
      message.warning(uploadMaxMessage);
      throw new Error(uploadMaxMessage);
    }
    const isSize = file.size / 1024 / 1024 < size;
    if (size && !isSize) {
      const msg = `上传大小不能超过 ${size}Mb,请检查后上传!`;
      message.warning(msg);
      throw new Error(msg);
    }

    // 新增上传图片最小尺寸及比例判断
    const judgeImageSizeRatio =
      imageSizeRatio &&
      /^\d+:\d+$/.test(imageSizeRatio) &&
      ImageExt.includes(fileExt?.toLowerCase());
    if (judgeImageSizeRatio) {
      const [sizeWidth, sizeHeight] = imageSizeRatio.split(':');
      const [width, height] = (imageRatio || '').split(':');
      return validateImageSizeRatio(file, sizeWidth, sizeHeight, width, height);
    }

    const judgeImageRatio =
      imageRatio && /^\d+:\d+$/.test(imageRatio) && ImageExt.includes(fileExt?.toLowerCase());
    if (judgeImageRatio) {
      const [width, height] = imageRatio.split(':');
      return validateImageRatio(file, width, height);
    }

    if (resProps.beforeUpload) {
      const customCheckRes = resProps.beforeUpload(file, fileList);
      return customCheckRes;
    }
    return true;
  };

  const handlePreview = (val: any) => {
    if (previewType === 'newPage') {
      window.open(val.url || URL.createObjectURL(val.originFileObj));
      return;
    }
    setPreViewUrl(val.url || URL.createObjectURL(val.originFileObj));
    setPreViewVisible(true);
  };
  const uploadButton = (
    <div>
      <PlusOutlined rev={undefined} />
      <div style={{ marginTop: 8 }}>{uploadPanelText || 'Upload'}</div>
    </div>
  );

  const resFileList = resProps.fileList || fileList;
  const customButton = (
    <div>
      <Button {...buttonProps}>{btnText}</Button>
    </div>
  );
  const changeInfo = (info: any) => {
    const res = (info.fileList || []) as (UploadFile<any> & keyObj)[];
    res.forEach((item) => {
      item.key = item.key || (item.response && item.response.key);
    });
    if (info.file.status) {
      setFileList(info.fileList || []);
    }
    if (info.file.status === 'done') {
      const file = {
        ...info.file,
        file: info.file.originFileObj,
        name: info.file.name,
        key: info.file.response && info.file.response.key,
      };
      handleUploadSuccess(file, info.fileList);
      if (resProps.onChange) {
        resProps.onChange(info.fileList || []);
      }
    } else if (info.file.status === 'removed') {
      setFile(undefined);
      if (resProps.onChange) {
        resProps.onChange(info.fileList || []);
      }
    } else if (info.file.status === 'uploading') {
      if (resProps.onChange) {
        resProps.onChange(info.fileList || []);
      }
    }
  };
  const hideUploadBtn = resProps.maxCount && resFileList.length >= resProps.maxCount;
  useEffect(() => {
    if (!uploading) {
      setUploadTxt(() => (file ? '重新上传' : '选择文件'));
    } else {
      setUploadTxt('上传中...');
    }
  }, [uploading, file]);
  return (
    <>
      <Upload
        disabled={uploading}
        customRequest={handleCustomRequest}
        onPreview={handlePreview}
        showUploadList={
          resProps.listType === 'picture-card'
            ? { showPreviewIcon: true, showRemoveIcon: true }
            : false
        }
        className={`cpm-pro-upload ${hideUploadBtn ? 'cpm-pro-upload-hide-upload' : ''} ${
          className || ''
        }`}
        {...resProps}
        fileList={resFileList}
        beforeUpload={onBeforeUpload}
        onChange={(info) => changeInfo(info)}
      >

        
        {customBtn ? customButton : null}
        {((!resProps.listType && !customBtn) || resProps.listType === 'text') && !hideUploadButton
          ? children || (
              <Button icon={uploading ? <LoadingOutlined rev={undefined} /> : <UploadOutlined rev={undefined} />}>
                {uploadTxt}
              </Button>
            )
          : null}
        {resProps.listType === 'picture-card' ? uploadButton : null}
        <div style={{ display: 'none' }}>
          <Image.PreviewGroup
            preview={{ visible: preViewVisible, onVisibleChange: (vis) => setPreViewVisible(vis) }}
          >
            <Image src={preViewUrl} />
          </Image.PreviewGroup>
        </div>
      </Upload>
      {tips || null}
    </>
  );
};

export default StarkUpload;
