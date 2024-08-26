
export interface SurveyAnswerReqBody {
    set_no: number,
    survey_no: number,
    question_no: number,
    answer_select: number,
    answer_write: string
}

export enum StudyParticipantStatus {
	NEED_EIC = "NEED_EIC",//전자서명필요
	IN_PROGRESS = "IN_PROGRESS", //참여중
	DONE = "DONE" 
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