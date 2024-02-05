import adapter from '@/utils/adapter';
import { fetchDeleteBrandApi } from '@/apis/settleIn/';
import type { DeleteBrandReq } from '@/entities/settleIn/interface/deleteBrand';

type FetchDeleteBrandType = (data: DeleteBrandReq) => Promise<{
    success: boolean;
    data: boolean;
    error?: boolean | Error;
}>;
const fetchDeleteBrandService: FetchDeleteBrandType = adapter({
    request: fetchDeleteBrandApi,
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
export default fetchDeleteBrandService;
