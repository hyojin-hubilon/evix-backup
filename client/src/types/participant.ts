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

export interface StudyDetailForParticipant {
    std_no: number;
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    location: string;
    disease: string;
    drug_code: string | null;
    drug_brand_name: string | null;
    drug_manufacturer_name: string | null;
    eic_name: string | null;
    eic_origin_name: string | null;
    eic_extension: string | null;
    std_status: string;
    std_payment_status: string;
    deploy_method: string;
    deploy_date: string | null;
    created_user_no: number;
    created_at: string;
    updated_user_no: number;
    updated_at: string;
    deployed_user_no: number;
    deployed_at: string;
    signature_eic_name: string | null;
    signature_eic_extension: string | null;
}
