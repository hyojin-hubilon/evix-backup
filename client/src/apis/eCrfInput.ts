import {
	ResCommonError,
	api
} from '@/apis/axios-common';


const BASE_API_URL = '/researcher/case-report-form-input';

const eCrfInputApi = {
	//POST CRF(증례기록서) Data 입력등록(파일첨부 포함)
	postECrfInput: async (requestDto: any, crf_file_attachments: Array<any>) => {
		try {
			const responseData = await api<object>(BASE_API_URL, 'post', requestDto);
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	//PUT CRF(증례기록서) Data 입력등록(파일첨부 포함)
	putECrfInput: async (requestDto: any, crf_file_attachments: Array<any>) => {
		try {
			const responseData = await api<object>(BASE_API_URL, 'put', requestDto);
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	//CRF(증례기록서) Data 입력 삭제
	deleteECrfInput: async (crf_input_no: number) => {
		try {
			const responseData = await api<object>(BASE_API_URL, 'delete', crf_input_no);
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
	 * CRF(증례기록서) Data입력 상세 조회
	 * @param crfInputNo
	 */
	getECrfInputDetail: async (crfInputNo: number) => {
		try {
			const responseData = await api<object>(`${BASE_API_URL}/${crfInputNo}`, 'get');
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	//CRF Data 입력 첨부파일 삭제
	deleteECrfInputFile: async (file_no: number) => {
		try {
			const responseData = await api<object>(`${BASE_API_URL}/attachment-file`, 'delete', {case_report_form_input_attachment_file_no : file_no});
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
	 * CRF 입력 Data 첨부파일 다운로드
	 * @param stdNo
	 * @param crfInputNo
	 * @param file_no
	 */
	getDownloadECrfInputFile: async (stdNo: number, crfInputNo: number, file_no:number) => {
		try {
			const responseData = await api<object>(`${BASE_API_URL}/attachment-file-download/${stdNo}/${crfInputNo}/${file_no}`, 'get');
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
	/**
	 * 참여자 > CRF(증례기록서) > Data 입력 목록 조회
	 * @param pairNo 스터디페어 number
	 * @param stdNo 스터디 number
	 * @param crfNo crf number
	 * @param stdCrfParticipantNo participant number
	 */
	getECrfInputList: async (pairNo:number, stdNo: number, crfNo: number, stdCrfParticipantNo:number) => {
		try {
			const responseData = await api<Array<any>>(`${BASE_API_URL}/list-participant-crf/${pairNo}/${stdNo}/${crfNo}/${stdCrfParticipantNo}`, 'get');
			return responseData;
		} catch (error) {
			const e = error as ResCommonError;
			throw e;
		}
	},
}

export default eCrfInputApi;