// 스터디별 누적 참여자 수(배포 상태인 스터디)
export interface NumOfParticipantByStudy {
    std_no: number;
    std_type: string;
    title: string;
    target_number: number;
    number_participant: number;
    participation_late: number;
}

// 최근 참여자 로그 (배포 상태인 스터디)
export interface RecentParticipantLogsRequest {
    std_type: string;
    title: string;
    std_start_date: string;
    std_end_date: string;
    description: string;
    location: 'KO_KR' | 'EN_US';
    disease: string;
    target_number: number;
    drug_code: number | string; //????
    drug_brand_name: string;
    drug_manufacturer_name: string;
    std_status: string;
    std_payment_status: string;
    deploy_method: 'IMMEDIATE' | 'RESERVATION'; // 일단 IMMEDIATE로 넣어서 보내주세요.
    deploy_date: string;
    studySurveySetList: [
        {
            survey_cycle: 'DAILY' | 'WEEKLY' | 'MONTHLY';
            number_in_cycle: number;
            sort: number;
            surveyList: [
                {
                    survey_no: number;
                    sort: number;
                }
            ];
        },
        {
            survey_cycle: 'DAILY' | 'WEEKLY' | 'MONTHLY';
            number_in_cycle: number;
            sort: number;
            surveyList: [
                {
                    survey_no: number;
                    sort: number;
                }
            ];
        }
    ];
    inviteList: [
        {
            user_email: string;
            std_privilege: string;
        }
    ];
}

// 월별 스터디 참여자 수 (배포 상태인 스터디)
export interface StudyGoalByMonthly {
    std_no: number;
    current_month: string;
    num_current_month: number;
    ago_1_month: string;
    num_ago_1_month: number;
    ago_2_month: string;
    num_ago_2_month: number;
    ago_3_month: string;
    num_ago_3_month: number;
    ago_4_month: string;
    num_ago_4_month: number;
    ago_5_month: string;
    num_ago_5_month: number;
}
