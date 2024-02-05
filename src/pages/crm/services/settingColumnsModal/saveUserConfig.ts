import adapter from '@/utils/adapter';
import { fetchConfigSaveUserConfigApi } from '@/apis/settingColumnsModal/';
import type { ConfigSaveUserConfigReq } from '@/entities/settingColumnsModal/interface/saveUserConfig';

type FetchConfigSaveUserConfigType = (data: ConfigSaveUserConfigReq) => Promise<{
  success: boolean;
  data: boolean;
  error?: boolean | Error;
}>;
const fetchConfigSaveUserConfigService: FetchConfigSaveUserConfigType = adapter({
  request: fetchConfigSaveUserConfigApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: res.data,
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: null,
      error,
    };
  },
});
export default fetchConfigSaveUserConfigService;
