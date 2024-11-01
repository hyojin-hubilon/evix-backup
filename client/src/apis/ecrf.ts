import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import { CRFPostReqBody, CRFPostResponse, CRFPutReqBody } from '@/types/ecrf';

const BASE_API_URL = '/researcher/case-report-form';

const ecrfApi = {
   
    postNewCRF: async (ecrf: CRFPostReqBody) => {
        try {
            const responseData = await api<CRFPostResponse>(BASE_API_URL, 'post', ecrf);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	saveCRF: async (ecrf: CRFPostReqBody) => {
        try {
            const responseData = await api<CRFPutReqBody>(BASE_API_URL, 'put', ecrf);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},

	getCRF: async (crfNo: number) => {
		try {
			const responseData = await api<object>(
				`${BASE_API_URL}/${crfNo}`,
				'get'
			);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},  
}

export default ecrfApi;