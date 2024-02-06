import { message } from "poizon-design";
import { IApiResult } from "../../api/interface";
import { handleNotify } from "@/components/handleNotify";

export const notifyResult = (result: IApiResult) => {
  if (!result.message) {
    return;
  }
  if (result.success) {
    handleNotify(result.message);
  } else {
    message.error(result.message);
  }
}