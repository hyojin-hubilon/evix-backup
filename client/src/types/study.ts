export interface Survey {
    survey_no: number;
    sort: number;
}

export interface Invite {
    user_email: string;
    std_privilege: string;
}

export interface StudySurveySet {
    survey_cycle: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    number_in_cycle: number;
    surveyList: Survey[];
}

export interface Study {
    std_no?: number; // 수정 시에만 필요
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    location?: string; // 생성 시에만 필요
    disease: string;
    target_number: number;
    drug_code: string | null;
    std_status?: string; // 생성 시에만 필요
    std_payment_status?: string; // 생성 시에만 필요
    deploy_method?: string; // 생성 시에만 필요
    deploy_date?: string; // 생성 시에만 필요
    studySurveySetList: StudySurveySet[];
    inviteList: Invite[];
}

export interface StudyUserInvite {
    std_no: number;
    user_email: string;
    std_privilege: string;
}

export interface StudyUserInvites extends Array<StudyUserInvite> {}

export interface UpdateMemberPrivilegeRequest {
    std_no: number;
    user_no: number;
    std_privilege: string;
}

// ===================================
// 내 Study 목록
// ===================================

export interface ManagerList {
    std_no: number;
    user_no: number;
    std_privilege: string;
    profile_image_url: string;
    profile_image_name: string;
    first_name: string;
    last_name: string;
}

export interface MyStudyList {
    std_no: number;
    title: string;
    std_status: string;
    std_start_date: string;
    std_end_date: string;
    std_privilege: string;
    managerList: ManagerList[];
}

export interface StudyListItemProps {
    study: MyStudyList;
}

export interface StudyApiResponse {
    result: boolean;
    code: number;
    content?: {
        studyMyList?: MyStudyList[];
    };
}

export interface StudyInvitedItemProps {
    invitedStudy: any;
    onAcceptInvite: () => void;
}

export type MemberTempType = {
    user_no: number;
    profile_image_url: string;
    first_name: string;
    last_name: string;
    std_privilege: string;
    belong: string;
    email: string;
    inviteStatus: string;
};
