import {
    ResCommonError,
    api
} from '@/apis/axios-common';
import { ECrfParticipant, ECrfParticipantDelete, ECrfParticipantPutReqBody, ECrfParticipantReqBody } from '@/types/ecrfParticipant';


const BASE_API_URL = '/researcher/study-case-report-form-participant';

const ecrfParticipantApi = {
	//임상시험(Study) - CRF(증례기록서) 참여자 등록
    postECrfParticipant: async (ecrfParticiant: ECrfParticipantReqBody) => {
        try {
            const responseData = await api<object>(BASE_API_URL, 'post', ecrfParticiant);
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},

	// 임상시험(Study) - CRF(증례기록서) 참여자 수정
    putECrfParticipant: async (ecrfParticiant: ECrfParticipantPutReqBody) => {
        try {
            const responseData = await api<object>(BASE_API_URL, 'put', ecrfParticiant);
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	//임상시험(Study) - CRF(증례기록서) 참여자 삭제 
	deleteECrfParticipant: async (ecrfParticiant: ECrfParticipantDelete) => {
        try {
            const responseData = await api<object>(BASE_API_URL, 'delete', ecrfParticiant);
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
     * 임상시험(Study) - CRF(증례기록서) 참여자 상세 조회
     * @param stdNo
	 * @param stdCrfParticipantNo
     */
	getECrfParticipant: async (stdNo: number, stdCrfParticipantNo: number) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/${stdNo}/${stdCrfParticipantNo}`, 'get');
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
     * 임상시험(Study) - CRF(증례기록서) 참여자 목록 조회
     * @param stdNo
     */
	getECrfParticipantList: async (stdNo: number) => {
        try {
            const responseData = await api<ECrfParticipant[]>(`${BASE_API_URL}/full-list/${stdNo}`, 'get');
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
}

export default ecrfParticipantApi;