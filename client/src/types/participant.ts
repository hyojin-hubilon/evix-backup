
export interface SurveyAnswerReqBody {
    set_no: number,
    survey_no: number,
    question_no: number,
    answer_select: number,
    answer_write: string
}