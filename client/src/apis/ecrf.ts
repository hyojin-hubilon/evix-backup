import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import { CRFPostReqBody, CRFPostResponse, CRFPutReqBody, ECrfDetail, MyCRFList, StudyCrfListRespone, StudyCrfPairDeleteBody, StudyCrfPairPostBody } from '@/types/ecrf';

const BASE_API_URL = '/researcher/case-report-form';
const BASE_API_URL_2 = '/researcher/study-case-report-form-pair';

const ecrfApi = {
   // CRF(증례기록서) 등록
    postNewCRF: async (ecrf: CRFPostReqBody) => {
        try {
            const responseData = await api<CRFPostResponse>(BASE_API_URL, 'post', ecrf);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	// CRF(증례기록서) 수정
	saveCRF: async (ecrf: CRFPutReqBody) => {
        try {
            const responseData = await api<CRFPostResponse>(BASE_API_URL, 'put', ecrf);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
	 * CRF(증례기록서) 상세 조회
	 * @param crfNo
	 * @returns
	 */
	getCRF: async (crfNo: number) => {
		try {
			const responseData = await api<ECrfDetail>(
				`${BASE_API_URL}/${crfNo}`,
				'get'
			);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
	 * 내 CRF(증례기록서) 목록 조회
	 */
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
	/**
	 * 연결가능한 CRF(증례기록서) 목록 조회
	 */
	getRegistrableCRFList : async() => {
		try {
			const responeData = await api<MyCRFList[]>(
				`${BASE_API_URL}/my-list-registrable`,
				'get'
			)
			return responeData;
		} catch(error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
	 * CRF(증례기록서) 삭제
	 * @param crfNo
	 * @returns
	 */
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
	 * CRF(증례기록서) 복사 조회
	 * @param crf_no
	 * @returns
	 */
	copyCrf : async (crfNo: number|string) => {
		try {
			const responseData = await api<ECrfDetail>(
				`${BASE_API_URL}/copy/${crfNo}`,
				'get'
			);

			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},

	/**
	 * 임상시험(Study) - CRF(증례기록서) 페어 목록 조회
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
    postCrfpair: async (data : StudyCrfPairPostBody[]) => {
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
	deleteCrfpair: async (data: StudyCrfPairDeleteBody) => {
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