
import { ProFormUploadButton } from '@poizon-design/pro-form';
import { ButtonType } from 'poizon-design/lib/button';

interface InProps {
  btnText: string,
  type?:ButtonType
}

export default function ImportFile({ btnText,type}: InProps) {
  return (
      <div style={{marginTop:25}}>
        <ProFormUploadButton title={btnText} buttonProps={{type:type}}  />
      </div>
      
    
  );
}
