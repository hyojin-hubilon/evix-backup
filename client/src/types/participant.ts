export interface SurveyAnswerReqBody {
    set_no: number;
    survey_no: number;
    question_no: number;
    answer_select: number;
    answer_write: string;
}

export enum StudyParticipantStatus {
    NEED_EIC = 'NEED_EIC', //전자서명필요
    IN_PROGRESS = 'IN_PROGRESS', //참여중
    DONE = 'DONE',
}

export interface StudyForParticipant {//임시
	status:StudyParticipantStatus;
	title: string;
	start_date: string | Date |null;
	end_date: string | Date | null,
	organization: string,
	survey_cycle: 'WEEK' | 'MONTH',
	number_in_cycle: number,
	number_of_participation: number//0일때 = 참여 대기중
}

export interface SurveyForParticipant {//임시
	total_count: number,
	title:string,
	survey_cycle: 'WEEK' | 'MONTH',
	number_in_cycle: number,
	number_of_participation: number,
	tags?: string[]
}
export interface StudyForParticipant {
    //임시
    status: StudyParticipantStatus;
    title: string;
    start_date: string | Date | null;
    end_date: string | Date | null;
    organization: string;
    survey_cycle: 'WEEK' | 'MONTH';
    number_in_cycle: number;
    number_of_participation: number; //0일때 = 참여 대기중
}

// /api/v1/participant/study/my-list
// 내 참여 임상시험 목록 응답값
export interface ParticipantStudyList {
    deployed_at: string;
    deployed_user_no: number;
    eic_extension: string;
    eic_name: string;
    eic_origin_name: string;
    number_answer: number;
    participation_organization: string;
    signature_eic_extension: string | null;
    signature_eic_name: string | null;
    std_end_date: string;
    std_no: number;
    std_payment_status: string;
    std_privilege: string;
    std_start_date: string;
    std_status: string;
    std_type: string;
    target_number: number | null;
    title: string;
}
