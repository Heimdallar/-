import adapter from '@/utils/adapter';
import { makeConfigQueryBaseConfig } from '@/entities/settingColumnsModal/factories';
import { fetchConfigQueryBaseConfigApi } from '@/apis/settingColumnsModal/';
import type {
  ConfigQueryBaseConfigReq,
  Data,
} from '@/entities/settingColumnsModal/interface/queryBaseConfig';

type FetchConfigQueryBaseConfigType = (data: ConfigQueryBaseConfigReq) => Promise<{
  success: boolean;
  data: Data;
  error?: Data | Error;
}>;
const fetchConfigQueryBaseConfigService: FetchConfigQueryBaseConfigType = adapter({
  request: fetchConfigQueryBaseConfigApi,
  onSuccess: (res) => {
    return {
      success: true,
      data: makeConfigQueryBaseConfig(res.data) || {},
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
export default fetchConfigQueryBaseConfigService;
