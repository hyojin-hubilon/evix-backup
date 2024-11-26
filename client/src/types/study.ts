export interface Survey {
    survey_no: number;
    sort: number;
}

// export interface Invite {
//     user_email: string;
//     std_privilege: string;
// }

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
    email: string;
    company_name: string;
    invited_at: string | Date;
}

export interface MyStudyList {
    active_yn: 'Y' | 'N';
    delete_yn: 'Y' | 'N';
    description: string;
    disease: string;
    location: string;
    std_no: number;
    std_payment_status: string | null;
    title: string;
    std_status: string;
    std_start_date: string;
    std_end_date: string;
    std_privilege: string;
    managerList: ManagerList[];
    std_type: string;
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
    user_email: string;
    inviteStatus: string;
};

export type InviteMemberTempType = {
    user_email: string;
    std_privilege: string;
};

export interface invitedStudy {
    std_no: number;
    title: string;
    owner_first_name: string;
    owner_last_name: string;
    user_no: number;
    user_email: string;
    invite_url: string;
    invite_token: string;
    created_at: string;
}
interface Manager {
    std_no: number;
    user_no: number;
    std_privilege: string;
    email: string;
    first_name: string;
    last_name: string;
    company_name: string | null;
    profile_image_url: string;
    profile_image_name: string;
    invited_at: string | null;
}

interface Invite {
    std_no: number;
    user_email: string;
    std_privilege: string;
    created_at: string;
    accepted_at: string | null;
}

export interface StudySurveyList {
	set_no: number;
	survey_no: number;
	survey_cnt: number;
	title: string;
	sort: number;
}

export interface StudySurveySetList {
    set_no: number;
    std_no: number;
    survey_start_date: string | Date;
    survey_end_date: string | Date;
    survey_cycle: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    number_in_cycle: number;
    sort: number;
    surveyList: StudySurveyList[]
}

export interface StudyDetail {
    std_no: number;
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    location: string;
    disease: string;
    target_number: string;
    drug_code: string;
    drug_brand_name: string;
    drug_manufacturer_name: string;
    eic_name: string | null;
    eic_origin_name: string | null;
    eic_extension: string | null;
    std_status: string;
    std_payment_status: string;
    deploy_method: string;
    deploy_date: string;
    active_yn: string;
    delete_yn: string;
    created_user_no: number;
    created_at: string;
    updated_user_no: number;
    updated_at: string;
    deployed_user_no: number | null;
    deployed_at: string | null;
    std_privilege: string;
    studySurveySetList: StudySurveySetList[];
	eCrfSetList : [];
    managerList: {
        std_no: number;
        user_no: number;
        std_privilege: string;
        email: string;
        first_name: string;
        last_name: string;
        company_name: string | null;
        profile_image_url: string;
        profile_image_name: string;
        invited_at: string | null;
    }[];
    inviteList: {
        std_no: number;
        user_email: string;
        std_privilege: string;
        created_at: string;
        accepted_at: string | null;
    }[];
}

// 주기에 따른 매핑
export const surveyCycle = {
    WEEKLY: '주',
    MONTHLY: '달',
    DAILY: '일',
};

export const surveyCycleEn = {
    WEEKLY: 'week',
    MONTHLY: 'month',
    DAILY: 'day',
};

// 액션 타입에 대한 한글 메시지 매핑
export const actionMessages = {
    delete: '삭제',
    pause: '일시정지',
    done: '완료',
    progression: '재시작',
};

export const actionMessagesEn = {
    delete: 'Delete',
    pause: 'Pause',
    done: 'Complete',
    progression: 'Restart',
};

export const actionMessagesEnPast = {
	delete: 'deleted',
    pause: 'paused',
    done: 'completed',
    progression: 'restarted',
}

// Study 연령별 참여율
export interface ParticipationRateByAge {
    std_no: number;
    num_male: number;
    num_female: number;
    num_age_10s_m: number;
    num_age_10s_f: number;
    num_age_20s_m: number;
    num_age_20s_f: number;
    num_age_30s_m: number;
    num_age_30s_f: number;
    num_age_40s_m: number;
    num_age_40s_f: number;
    num_age_50s_m: number;
    num_age_50s_f: number;
    num_age_60s_m: number;
    num_age_60s_f: number;
    num_age_70s_m: number;
    num_age_70s_f: number;
}

// Study 누적 참여자 수 & 참여율
export interface totalParticipants {
    std_no: number;
    title: string;
    target_number: number;
    number_participant: number;
    participation_late: number;
}

export interface ParticipantsList {
    std_no: number;
    participant_no: number;
    std_privilege: string;
    full_name: string;
    gender: string;
    birthday: string;
    age: number;
    number_answer: number;
    allotment_agency_name: string;
    total_number_survey: number;
    participation_status: 'PROGRESS' | 'COMPLETE';
}

export type StdType = 'ePRO' | 'eCOA' | 'eCRF';