import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import { CRFPostReqBody, CRFPostResponse, CRFPutReqBody, MyCRFList, StudyCrfListRespone } from '@/types/ecrf';

const BASE_API_URL = '/researcher/case-report-form';
const BASE_API_URL_2 = '/researcher/study-case-report-form-pair';

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
	getCRFList : async() => {
		try {
			const responeData = await api<MyCRFList[]>(
				`${BASE_API_URL}/full-my-list`,
				'get'
			)
			return responeData;
		} catch(error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	deleteCrf : async (crfNo: number) => {
		try {
			const responseData = await api<object>(
				`${BASE_API_URL}`,
				'delete',
				{crf_no: crfNo}
			);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},

	/**
	 * 임상시험(Study) - CRF(증례기록서) 페어 목록 조회회
	 * @param stdNo
	 * @returns
	 */
	getStudyCrfpair: async (stdNo) => {
		try {
			const responseData = await api<StudyCrfListRespone[]>(`${BASE_API_URL_2}/list-pair/${stdNo}`, 'get');
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	
	/**
     * 임상시험(Study) - CRF(증례기록서) 페어 
     * @param data
     * @returns
     */
    postCrfpair: async (data) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL_2}`, 'post', data);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
	/**
     * 임상시험(Study) - CRF(증례기록서) 페어 해제
     * @param data
     * @returns
     */
	deleteCrfpair: async (data) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL_2}/unpairing`, 'delete', data);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
}

export default ecrfApi;