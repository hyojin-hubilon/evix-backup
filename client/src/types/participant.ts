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



// /api/v1/participant/study/:stdNo/survey-set
// 내 참여 임상시험 설문 설정 목록
export interface ParticipantSurveySet {
	set_no: number,
	std_no: number,
	survey_start_date: string|Date,
	survey_end_date: string | Date,
	survey_cycle: "DAILY" | "WEEKLY" | "MONTHLY",
	number_in_cycle: number,
	sort: number,
	number_answer_set: number,
	surveyList: 
		{
			set_no: number,
			survey_no: number,
			title: string,
			sort: number,
			survey_cnt: number,
			answer_cycle: string | Date,
			answer_turn: number,
			number_answer: number
		}[]	
}

// /api/v1/participant/study/:stdNo
// 내 참여 임상시험 상세조회 결과
export interface ParticipantStudyDetail {
	std_no: number,
    std_type: string,
    title: string,
    std_start_date: string|Date,
    std_end_date: string|Date,
    description: string,
    location: "EN_US" | "KO_KR",
    disease: string,
    drug_code: string,
    drug_brand_name: string,
    drug_manufacturer_name: string,
    eic_name: string,
    eic_origin_name: string,
    eic_extension: string, //"json",
    std_status: string, //"STD-PROGRESSION",
    std_payment_status: string,//"WAIT",
    deploy_method: string, //"IMMEDIATE",
    deploy_date: string | Date | null,
    created_user_no: number,
    created_at: string | Date,
    updated_user_no: number,
    updated_at: string | Date,
    deployed_user_no: number,
    deployed_at: string | Date,
    signature_eic_name: string,
    signature_eic_extension: string//"pdf"
}