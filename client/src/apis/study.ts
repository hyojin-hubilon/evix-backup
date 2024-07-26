// import { handleApiError, instance } from "../commonApi";

import {
    ResCommonError,
    ResCommonSuccess,
    api,
    axios_file_instance,
    file_api,
} from '@/apis/axios-common';
import * as StudyApiType from '@/types/study';

const BASE_API_URL = '/researcher/study';

const studyApi = {
    /**
     * Study 생성
     * @param data
     * @returns
     */
    createStudy: async (data: any) => {
        try {
            const responseData = await file_api<{}>(`${BASE_API_URL}`, 'post', data);

            console.log(responseData);

            return responseData;
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
    updateStudy: async (data: any) => {
        try {
            const responseData = await file_api<{}>(`${BASE_API_URL}`, 'put', data);
            console.log('responseData', responseData);
            console.log('data', data);
            return responseData;
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
            const responseData = await api<{}>(`${BASE_API_URL}`, 'delete', deleteData);

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
            const responseData = await api<{}>(`${BASE_API_URL}/${stdNo}`, 'get');
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
            const responseData = await api<{}>(`${BASE_API_URL}/${stdNo}/manager`, 'get');

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
            const responseData = await api<{}>(`${BASE_API_URL}/${stdNo}/manager-invite`, 'get');
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
            const responseData = await api<{}>(`${BASE_API_URL}/${stdNo}/overview`, 'get');
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
            const responseData = await api<{}>(`${BASE_API_URL}/${stdNo}/survey`, 'get');
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
            const responseData = await api<{}>(
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
            const responseData = await api<{}>(`${BASE_API_URL}/full-my-list`, 'get');

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
            const responseData = await api<{}>(`${BASE_API_URL}/study-status`, 'put', data);

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
            const responseData = await api<{}>(`${BASE_API_URL}/study-user`, 'delete', {
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
            const responseData = await api<{}>(
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
            const responseData = await api<{}>(
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
            const responseData = await api<{}>(
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
    deployStudy: async (deployData) => {
        try {
            const response = await file_api<{}>(`${BASE_API_URL}/deploy`, 'put', deployData);
            return response;
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
};

export default studyApi;
