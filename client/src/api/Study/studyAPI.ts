import { handleApiError, instance } from "../commonApi";

const BASE_API_URL = "/researcher/study";

interface Survey {
    survey_no: number;
    sort: number;
}

interface Invite {
    user_email: string;
    std_privilege: string;
}

interface StudySurveySet {
    survey_cycle: "DAILY" | "WEEKLY" | "MONTHLY";
    number_in_cycle: number;
    surveyList: Survey[];
}

export interface Study {
    std_no?: number; // 수정 시에만 필요, 선택적 속성으로 지정하자.?
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    location?: string; // 생성 시에만 필요
    disease: string;
    target_number: number;
    drug_code: string;
    eic_file: string | null;
    std_status?: string; // 생성 시에만 필요
    std_payment_status?: string; // 생성 시에만 필요
    deploy_method?: string; // 생성 시에만 필요
    deploy_date?: string; // 생성 시에만 필요
    studySurveySetList: StudySurveySet[];
    inviteList: Invite[];
}

interface StudyUserInvite {
    std_no: number;
    user_email: string;
    std_privilege: string;
}

interface UpdateMemberPrivilegeRequest {
    std_no: number;
    user_no: number;
    std_privilege: string;
}

const studyApi = {
    /**
     * Study 생성
     * @param data
     * @returns
     */
    createStudy: async (data: Study) => {
        try {
            console.log(data);
            const response = await instance.post(`${BASE_API_URL}`, data);

            return response.data;
        } catch (error) {
            handleApiError(error, "Create Study error");
        }
    },

    /**
     * Study 수정
     * @param data
     * @returns
     */
    updateStudy: async (data: any) => {
        try {
            const response = await instance.put(`${BASE_API_URL}`, data);

            return response.data;
        } catch (error) {
            handleApiError(error, "Update Study error");
        }
    },

    /**
     * Study 삭제
     * @param deleteData
     * @returns
     */
    deleteStudy: async (deleteData: number) => {
        try {
            const response = await instance.delete(`${BASE_API_URL}`, {
                data: deleteData,
            });
            return response.data;
        } catch (error) {
            handleApiError(error, "Delete study error");
        }
    },

    /**
     * Study 상세 조회
     * @param stdNo
     * @returns
     */
    getStudyDetail: async (stdNo: number) => {
        try {
            const response = await instance.get(`${BASE_API_URL}/${stdNo}`);
            return response.data;
        } catch (error) {
            handleApiError(error, "Get study detail error");
        }
    },

    /**
     * Study 관리자 조회(탭)
     * @param stdNo
     * @returns
     */
    getStudyManager: async (stdNo: number) => {
        try {
            const response = await instance.get(
                `${BASE_API_URL}/${stdNo}/manager`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Get study manager error");
        }
    },

    /**
     * Study 초대 관리자 조회(탭)
     * @param stdNo
     * @returns
     */
    getInvitedStudyManager: async (stdNo: number) => {
        try {
            const response = await instance.get(
                `${BASE_API_URL}/${stdNo}/manager-invite`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Get Invited study manager error");
        }
    },

    /**
     * Study 상세 조회(탭)
     * @param stdNo
     * @returns
     */
    getStudyOverview: async (stdNo: number) => {
        try {
            const response = await instance.get(
                `${BASE_API_URL}/${stdNo}/overview`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Get study overview error");
        }
    },

    /**
     * Study 설문 조회(탭)
     * @param stdNo
     * @returns
     */
    getStudySurvey: async (stdNo: number) => {
        try {
            const response = await instance.get(
                `${BASE_API_URL}/${stdNo}/survey`
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Get study survey error");
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
            const response = await instance.get(
                `${BASE_API_URL}/my-list/${pageNum}/${elementSize}`
            );

            return response.data;
        } catch (error) {
            handleApiError(error, "My Study List error");
        }
    },

    /**
     * Study 상태 변경
     * @param data
     * @returns
     */
    updateStudyStatus: async (data: any) => {
        try {
            const response = await instance.put(
                `${BASE_API_URL}/study-status`,
                data
            );

            return response.data;
        } catch (error) {
            handleApiError(error, "Update Study Status error");
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
            const response = await instance.delete(
                `${BASE_API_URL}/study-user`,
                {
                    data: {
                        std_no,
                        user_no,
                    },
                }
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Delete Study Member error");
        }
    },

    /**
     * Study 멤버 초대
     * @param invites
     * @returns
     */
    inviteStudyMember: async (invites: StudyUserInvite[]) => {
        try {
            const response = await instance.post(
                `${BASE_API_URL}/study-user-invite`,
                invites
            );

            return response.data;
        } catch (error) {
            handleApiError(error, "Invite Study Member error");
        }
    },

    /**
     * Study 멤버 권한 수정
     * @param updateData
     * @returns
     */
    updateMemberPrivilege: async (updateData: UpdateMemberPrivilegeRequest) => {
        try {
            const response = await instance.put(
                `${BASE_API_URL}/study-user-privilege`,
                updateData
            );
            return response.data;
        } catch (error) {
            handleApiError(error, "Update Member Privilege error");
            throw error;
        }
    },
};

export default studyApi;
