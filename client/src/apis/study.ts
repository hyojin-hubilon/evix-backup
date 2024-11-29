// import { handleApiError, instance } from "../commonApi";

import {
    ResCommonError,
    ResCommonSuccess,
    api,
    axios_file_instance,
    file_api,
} from '@/apis/axios-common';
import * as StudyApiType from '@/types/study';
import { ParticipantsList } from '@/types/study';

const BASE_API_URL = '/researcher/study';

const studyApi = {
    /**
     * Study 생성
     * @param data
     * @returns
     */
    createStudy: async (data: FormData, stdType:StudyApiType.StdType) => {
        try {
			if(stdType === 'eCRF') {
				const responseData = await file_api<object>(`${BASE_API_URL}/e-crf`, 'post', data);

				console.log(responseData);

				return responseData;
			} else {
				const responseData = await file_api<object>(`${BASE_API_URL}/e-pro`, 'post', data);

				console.log(responseData);

				return responseData;
			}
            
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 수정
     * @param data
     * @returns
     */
    updateStudy: async (data: StudyApiType.Study, stdType:StudyApiType.StdType) => {
        try {
			if(stdType === 'eCRF') {
				const responseData = await api<object>(`${BASE_API_URL}/e-crf`, 'put', data);
				console.log('responseData', responseData);
				console.log('data', data);
				return responseData;
			} else {
				const responseData = await api<object>(`${BASE_API_URL}/e-pro`, 'put', data);
				console.log('responseData', responseData);
				console.log('data', data);
				return responseData;
			}
            
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 삭제
     * @param deleteData
     * @returns
     */
    deleteStudy: async (deleteData: { std_no: number }) => {
        try {
            console.log(deleteData);
            const responseData = await api<object>(`${BASE_API_URL}`, 'delete', deleteData);

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 상세 조회
     * @param stdNo
     * @returns
     */
    getStudyDetail: async (stdNo: number) => {
        try {
            const responseData = await api<StudyApiType.StudyDetail>(
                `${BASE_API_URL}/${stdNo}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 관리자 조회(탭)
     * @param stdNo
     * @returns
     */
    getStudyManager: async (stdNo: number) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/${stdNo}/manager`, 'get');

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 초대 관리자 조회(탭)
     * @param stdNo
     * @returns
     */
    getInvitedStudyManager: async (stdNo: number) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/${stdNo}/manager-invite`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 상세 조회(탭)
     * @param stdNo
     * @returns
     */
    getStudyOverview: async (stdNo: number) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/${stdNo}/overview`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 설문 조회(탭)
     * @param stdNo
     * @returns
     */
    getStudySurvey: async (stdNo: number) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/${stdNo}/survey`, 'get');
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 내 Study 목록 조회
     * @param pageNum
     * @param elementSize
     * @returns
     */
    myStudyList: async (pageNum: number, elementSize: number) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/my-list/${pageNum}/${elementSize}`,
                'get'
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 내 Study 목록 조회
     */
    fullMyStudyList: async () => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/full-my-list`, 'get');

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 상태 변경
     * @param data
     * @returns
     */
    updateStudyStatus: async (data: any) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/study-status`, 'put', data);

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 멤버 삭제
     * @param std_no
     * @param user_no
     * @returns
     */
    deleteStudyMember: async (std_no: number, user_no: number) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/study-user`, 'delete', {
                std_no,
                user_no,
            });
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 멤버 초대
     * @param invites
     * @returns
     */
    inviteStudyMember: async (invites: any) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/study-user-invite`,
                'post',
                invites
            );

            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 멤버 권한 수정
     * @param updateData
     * @returns
     */
    updateMemberPrivilege: async (updateData: StudyApiType.UpdateMemberPrivilegeRequest) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/study-user-privilege`,
                'put',
                updateData
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 미승인 초대 목록 조회
     * @returns
     */
    unauthorizedInvitation: async () => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/my-list-unauthorized-invitation`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 배포
     * @param deployData
     */
    deployStudy: async (deployData, stdType:StudyApiType.StdType) => {
        try {
			if(stdType === 'eCRF') {
				// const response = await file_api<object>(`${BASE_API_URL}/deploy`, 'put', deployData);
				const response = await api<object>(`${BASE_API_URL}/deploy/e-crf`, 'put', deployData);
				return response;
			} else {
				// const response = await file_api<object>(`${BASE_API_URL}/deploy`, 'put', deployData);
				const response = await api<object>(`${BASE_API_URL}/deploy/e-pro`, 'put', deployData);
				return response;
			}
            
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 연구원 재초대
     * @param data
     * @returns
     */
    reInviteStudy: async (data: StudyApiType.StudyUserInvite) => {
        try {
            const responseData = await api<[]>(
                `${BASE_API_URL}/study-user-invite-again`,
                'put',
                data
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * 임상시험 - 설문 연결 해제
     * @param data
     * @returns
     */
    disconnectSurvey: async (data) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/study-survey/disconnect`,
                'delete',
                data
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 임상시험 - 설문 설정 등록
     * @param data
     * @returns
     */
    postSurvey: async (data) => {
        try {
            const responseData = await api<object>(`${BASE_API_URL}/study-survey-set`, 'post', data);
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 누적 참여자 수 & 참여율
     * @param stdNo
     * @returns
     */
    getTotalParticipants: async (stdNo: number) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/${stdNo}/overview/number-of-participant-study`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 연령별 참여율
     * @param stdNo
     * @returns
     */
    getParticipationRateByAge: async (stdNo: number) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/${stdNo}/overview/number-of-participant-study-by-age`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study에 연결된 임상시험 원본 EIC 다운로드
     */
    downloadEicFile: async (stdNo: number, fileName: string) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/original-eic-download/${stdNo}/${fileName}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study에 연결된 임상시험 원본 EIC 삭제
     */
    deleteEicFile: async (stdNo: number) => {
        try {
            const responseData = await api<number>(`${BASE_API_URL}/delete-eic`, 'delete', {
                std_no: stdNo,
            });
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study에 연결된 EIC 파일 수정
     */
    editEicFile: async (stdNo: number, formData: FormData) => {
        try {
            const responseData = await file_api<{ std_no: number }>(
                `${BASE_API_URL}/upload-eic?std_no=${stdNo}`,
                'post',
                formData
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 임상시험 참여자 목록
     * @param stdNo
     */
    participantList: async (stdNo: number) => {
        try {
            const responseData = await api<ParticipantsList[]>(
                `${BASE_API_URL}/${stdNo}/list-participant`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * 스터디 최근 참여자 로그
     * @param stdNo
     * @returns
     */
    recentParticipantLogs: async (stdNo: number) => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/${stdNo}/overview/recent-participant-logs`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },

    /**
     * Study 전체 참여자 추이
     * @param stdNo
     * @param periodType (연간-YEAR, 월간-MONTH, 주간-WEEK)
     * @returns
     */
    participantCountByPeriod: async (stdNo: number, periodType: 'YEAR' | 'MONTH' | 'WEEK') => {
        try {
            const responseData = await api<object>(
                `${BASE_API_URL}/${stdNo}/overview/number-of-gender-participant-by-study/${periodType}`,
                'get'
            );
            return responseData;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    },
    /**
     * Study 참여자 초대 코드 생성
     * @param stdNo
     * @returns
     */
    createParticipantInviteCode: async (std_no) => {
        try {
            const response = await api<object>(
                `${BASE_API_URL}/create-participant-invite-code`,
                'post',
                std_no
            );
            return response;
        } catch (error) {
            const e = error as ResCommonError;
            throw e;
        }
    }
};

export default studyApi;
