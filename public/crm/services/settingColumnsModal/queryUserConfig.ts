import adapter from '@/utils/adapter';
import { makeConfigQueryUserConfig } from '@/entities/settingColumnsModal/factories';
import { fetchConfigQueryUserConfigApi } from '@/apis/settingColumnsModal/';
import type {
  ConfigQueryUserConfigReq,
  Data,
} from '@/entities/settingColumnsModal/interface/queryUserConfig';

type FetchConfigQueryUserConfigType = (data: ConfigQueryUserConfigReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchConfigQueryUserConfigService: FetchConfigQueryUserConfigType = adapter({
  request: fetchConfigQueryUserConfigApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeConfigQueryUserConfig(res.data) || {},
    };
  },
  onError: (error) => {
    return {
      success: false,
      data: {},
      error,
    };
  },
});
export default fetchConfigQueryUserConfigService;
